"""Drive the kiosk Chrome (showing PULSAR) for the demo recording.

Usage:
  py -3 drive_demo2.py taskbar on|off   temporarily auto-hide the Windows taskbar (state saved/restored)
  py -3 drive_demo2.py check <pid>      wait for CDP, measure page + window rect -> browser_rect.json, pin Chrome topmost
  py -3 drive_demo2.py run <pid>        run the mouse choreography over the live page
"""
import ctypes
import ctypes.wintypes as wt
import json
import math
import os
import sys
import time
import urllib.request

# Physical-pixel coordinates for this whole process (SetCursorPos / GetWindowRect).
try:
    ctypes.windll.shcore.SetProcessDpiAwareness(2)
except Exception:
    ctypes.windll.user32.SetProcessDPIAware()
ctypes.windll.winmm.timeBeginPeriod(1)

from pynput.mouse import Button, Controller

CDP = 'http://127.0.0.1:9223'
RECT_FILE = r'X:\myui\browser_rect.json'
TASKBAR_FILE = r'X:\myui\taskbar_state.json'

user32 = ctypes.windll.user32
shell32 = ctypes.windll.shell32
user32.SetWindowPos.argtypes = [wt.HWND, wt.HWND, ctypes.c_int, ctypes.c_int,
                                ctypes.c_int, ctypes.c_int, ctypes.c_uint]
user32.SetWindowPos.restype = wt.BOOL
mouse = Controller()
T0 = time.time()

SWP_NOSIZE_NOMOVE_NOACTIVATE = 0x0001 | 0x0002 | 0x0010
HWND_TOPMOST = -1
ABM_GETSTATE, ABM_SETSTATE = 0x0004, 0x000A
ABS_AUTOHIDE = 0x1


class APPBARDATA(ctypes.Structure):
    _fields_ = [('cbSize', ctypes.c_uint), ('hWnd', wt.HWND), ('uCallbackMessage', ctypes.c_uint),
                ('iEdge', ctypes.c_uint), ('rc', wt.RECT), ('lParam', ctypes.c_long)]


def log(msg):
    print('[%6.1f] %s' % (time.time() - T0, msg), flush=True)


def wait_cdp(timeout=40):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(CDP + '/json/version', timeout=3) as r:
                return json.load(r)
        except Exception as e:
            last = e
            time.sleep(0.5)
    raise SystemExit('CDP not reachable: %r' % last)


_ws = None
_eval_id = 0


def evaluate(expr, await_promise=False):
    global _ws, _eval_id
    if _ws is None:
        import websocket
        with urllib.request.urlopen(CDP + '/json', timeout=5) as r:
            tabs = json.load(r)
        page = next((t for t in tabs if t.get('type') == 'page' and 'localhost:5199' in t.get('url', '')), None)
        if page is None:
            raise SystemExit('localhost:5199 target not found: %r' % [t.get('url') for t in tabs])
        url = page['webSocketDebuggerUrl'].replace('localhost', '127.0.0.1')
        _ws = websocket.create_connection(url, timeout=25, suppress_origin=True)
    _eval_id += 1
    _ws.send(json.dumps({'id': _eval_id, 'method': 'Runtime.evaluate',
                         'params': {'expression': expr, 'returnByValue': True,
                                    'awaitPromise': await_promise}}))
    while True:
        msg = json.loads(_ws.recv())
        if msg.get('id') == _eval_id:
            if msg.get('error') or msg.get('result', {}).get('exceptionDetails'):
                raise RuntimeError('evaluate failed: %r' % msg)
            return msg['result']['result'].get('value')


def browser_window(pid):
    best = None

    def cb(h, l):
        nonlocal best
        p = wt.DWORD()
        user32.GetWindowThreadProcessId(h, ctypes.byref(p))
        if p.value == pid and user32.IsWindowVisible(h):
            r = wt.RECT()
            user32.GetWindowRect(h, ctypes.byref(r))
            area = max(0, r.right - r.left) * max(0, r.bottom - r.top)
            if best is None or area > best[0]:
                best = (area, h, (r.left, r.top, r.right - r.left, r.bottom - r.top))
        return True

    CMPFUNC = ctypes.WINFUNCTYPE(ctypes.c_bool, wt.HWND, wt.LPARAM)
    user32.EnumWindows(CMPFUNC(cb), 0)
    return (best[1], best[2]) if best else (None, None)


def clamp_even_rect(rect):
    sw, sh = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
    x, y, w, h = rect
    x = max(0, min(x, sw - 64))
    y = max(0, min(y, sh - 64))
    w = min(w, sw - x)
    h = min(h, sh - y)
    w -= w % 2
    h -= h % 2
    return (x, y, w, h)


def pin_topmost(hwnd):
    user32.SetWindowPos(hwnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE_NOMOVE_NOACTIVATE)
    return user32.GetWindowLongW(hwnd, -20) & 0x8 != 0  # WS_EX_TOPMOST


def taskbar_state():
    abd = APPBARDATA()
    abd.cbSize = ctypes.sizeof(APPBARDATA)
    abd.hWnd = user32.FindWindowW('Shell_TrayWnd', None)
    return shell32.SHAppBarMessage(ABM_GETSTATE, ctypes.byref(abd))


def set_taskbar_autohide(flag):
    abd = APPBARDATA()
    abd.cbSize = ctypes.sizeof(APPBARDATA)
    abd.hWnd = user32.FindWindowW('Shell_TrayWnd', None)
    abd.lParam = ABS_AUTOHIDE if flag else 0
    shell32.SHAppBarMessage(ABM_SETSTATE, ctypes.byref(abd))


def do_taskbar(mode):
    if mode == 'on':
        with open(TASKBAR_FILE, 'w') as f:
            json.dump({'state': taskbar_state()}, f)
        set_taskbar_autohide(True)
        print('taskbar auto-hide ON (saved state %d)' % taskbar_state())
    else:
        saved = 0
        if os.path.exists(TASKBAR_FILE):
            with open(TASKBAR_FILE) as f:
                saved = json.load(f).get('state', 0)
        set_taskbar_autohide(bool(saved & ABS_AUTOHIDE))
        os.remove(TASKBAR_FILE)
        print('taskbar restored (state %d)' % taskbar_state())


MEASURE_JS = r"""
JSON.stringify((() => {
  const R = e => { const r = e.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height }; };
  const q = s => [...document.querySelectorAll(s)].map(R).filter(o => o.w > 8 && o.h > 8);
  return {
    vw: innerWidth, vh: innerHeight, dpr: devicePixelRatio, scrollY: scrollY,
    docH: document.documentElement.scrollHeight,
    navLinks: q('nav a[href^="#"]'),
    heroCtas: q('header a[href="#works"], header a[href="#lab"]'),
    themeDots: q('button[aria-label^="切换配色"]'),
    spot: q('#capabilities .grid > div'),
    works: q('#works .grid > *'),
    labCols: q('#lab .grid > div'),
    switchBtn: q('#lab button, #lab [role="switch"], #lab [aria-label]'),
    prompt: q('#playground input, #playground textarea, #playground [contenteditable="true"]'),
    ghBtn: q('a[href*="github.com"]'),
    footer: q('footer'),
    dockBtns: q('[role="toolbar"] [role="button"]')
  };
})())
"""

SCROLL_JS = """new Promise(res => {
  const from = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  const to = Math.max(0, Math.min(max, %s));
  const t0 = performance.now(), D = 900;
  const step = now => {
    const k = Math.min(1, (now - t0) / D);
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    window.scrollTo(0, from + (to - from) * e);
    if (k < 1) requestAnimationFrame(step); else res(to);
  };
  requestAnimationFrame(step);
})"""


def do_check(pid):
    wait_cdp()
    for _ in range(30):
        if evaluate('document.readyState') == 'complete':
            break
        time.sleep(0.5)
    m = json.loads(evaluate(MEASURE_JS))
    hwnd, rect = browser_window(pid)
    if not hwnd:
        raise SystemExit('no visible window for pid %s' % pid)
    rect = clamp_even_rect(rect)
    with open(RECT_FILE, 'w') as f:
        json.dump({'x': rect[0], 'y': rect[1], 'w': rect[2], 'h': rect[3]}, f)
    topmost = pin_topmost(hwnd)
    h = user32.GetForegroundWindow()
    buf = ctypes.create_unicode_buffer(256)
    user32.GetWindowTextW(h, buf, 256)
    print('metrics:', json.dumps(m))
    print('rect   :', rect, 'topmost:', topmost)
    print('fg     :', buf.value)


def smooth_move(tx, ty, dur=0.7):
    sx, sy = mouse.position
    if math.hypot(tx - sx, ty - sy) < 2:
        time.sleep(dur)
        return
    steps = max(10, int(dur * 110))
    for i in range(1, steps + 1):
        t = i / steps
        e = t * t * (3 - 2 * t)
        mouse.position = (sx + (tx - sx) * e, sy + (ty - sy) * e)
        time.sleep(dur / steps)


def visit(points, dwell=0.9, dur=0.7):
    for (x, y) in points:
        smooth_move(x, y, dur)
        time.sleep(dwell)


def scroll_to(top_expr, settle=0.6):
    evaluate(SCROLL_JS % top_expr, await_promise=True)
    time.sleep(settle)


def do_run(pid):
    wait_cdp()
    for _ in range(20):
        if evaluate('document.readyState') == 'complete':
            break
        time.sleep(0.5)
    hwnd, rect = browser_window(pid)
    pin_topmost(hwnd)
    x0, y0, _, _ = clamp_even_rect(rect)
    m = json.loads(evaluate(MEASURE_JS))
    dpr = m['dpr']
    vw, vh = m['vw'], m['vh']

    evaluate("(function(){const s=document.createElement('style');"
             "s.textContent='::-webkit-scrollbar{width:0;height:0}';"
             "document.head.appendChild(s);return 1})()")

    def P(x, y):
        return (x0 + x * dpr, y0 + y * dpr)

    def center(o):
        return P(o['x'], o['y'])

    mouse.position = P(vw * 0.5, vh * 0.5)
    time.sleep(0.8)

    log('hero: particle sweep')
    evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    time.sleep(0.8)
    visit([P(vw * 0.32, vh * 0.50), P(vw * 0.68, vh * 0.62),
           P(vw * 0.45, vh * 0.72), P(vw * 0.62, vh * 0.35)], dwell=0.7, dur=0.9)

    log('nav: magnet links')
    nav = m['navLinks']
    if len(nav) >= 5:
        visit([center(n) for n in nav[1:5]] + [center(nav[-1])], dwell=0.55, dur=0.5)
    elif nav:
        visit([center(n) for n in nav], dwell=0.55, dur=0.5)

    log('hero: CTA magnets')
    ctas = m['heroCtas']
    if ctas:
        visit([center(c) for c in ctas[:2]], dwell=0.8, dur=0.6)

    log('hero: theme switch (aurora recolors live)')
    m = json.loads(evaluate(MEASURE_JS))
    dots = m.get('themeDots') or []
    if len(dots) >= 4:
        smooth_move(*center(dots[2]), 0.6)
        time.sleep(0.5)
        mouse.click(Button.left)
        time.sleep(3.2)
        smooth_move(*center(dots[3]), 0.6)
        time.sleep(0.5)
        mouse.click(Button.left)
        time.sleep(2.8)
        smooth_move(P(vw * 0.5, vh * 0.6)[0], P(vw * 0.5, vh * 0.6)[1], 0.6)

    log('capabilities: spotlight cards')
    scroll_to("document.getElementById('capabilities').getBoundingClientRect().top + scrollY - 120")
    m = json.loads(evaluate(MEASURE_JS))
    if m['spot']:
        visit([center(c) for c in m['spot']], dwell=1.0, dur=0.8)

    log('works: tilted cards')
    scroll_to("document.getElementById('works').getBoundingClientRect().top + scrollY - 120")
    m = json.loads(evaluate(MEASURE_JS))
    if m['works']:
        visit([center(c) for c in m['works']], dwell=0.9, dur=0.8)

    log('lab: turbo switch + counter')
    scroll_to("document.getElementById('lab').getBoundingClientRect().top + scrollY - 120", settle=2.2)
    time.sleep(0.6)
    m = json.loads(evaluate(MEASURE_JS))
    sw = m['switchBtn'][0] if m['switchBtn'] else None
    if sw:
        px, py = center(sw)
        smooth_move(px, py, 0.8)
        time.sleep(0.3)
        m = json.loads(evaluate(MEASURE_JS))
        if m['switchBtn']:
            px, py = center(m['switchBtn'][0])
            smooth_move(px, py, 0.3)
        time.sleep(0.4)
        mouse.click(Button.left)
        log('turbo switch clicked ON')
    time.sleep(2.6)
    if m['labCols']:
        c0 = m['labCols'][0]
        visit([P(c0['x'], c0['y'] - 110), P(c0['x'], c0['y'] + 30), P(c0['x'], c0['y'] + 150)],
              dwell=0.6, dur=0.5)

    log('playground: type question -> decrypted reply')
    scroll_to("document.getElementById('playground').getBoundingClientRect().top + scrollY - 120")
    m = json.loads(evaluate(MEASURE_JS))
    pr = m['prompt'][0] if m['prompt'] else {'x': vw / 2, 'y': vh / 2}
    px, py = P(pr['x'] - 150, pr['y'])
    smooth_move(px, py, 0.8)
    time.sleep(0.4)
    mouse.click(Button.left)
    time.sleep(0.6)
    evaluate("""(() => {
      const el = document.querySelector('#playground textarea');
      if (!el) return 0;
      const proto = window.HTMLTextAreaElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, '极光背景是怎么做的？');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      return 1;
    })()""")
    time.sleep(0.5)
    smooth_move(P(pr['x'], pr['y'] + 150)[0], P(pr['x'], pr['y'] + 150)[1], 0.9)
    time.sleep(2.4)

    log('radar: beam follows mouse')
    scroll_to("document.getElementById('signal').getBoundingClientRect().top + scrollY - 120")
    m = json.loads(evaluate(MEASURE_JS))
    visit([P(vw * 0.35, vh * 0.45), P(vw * 0.65, vh * 0.50), P(vw * 0.45, vh * 0.60),
           P(vw * 0.70, vh * 0.42)], dwell=0.8, dur=0.8)
    gh = (m.get('ghBtn') or [None])[0]
    if gh:
        smooth_move(*center(gh), 0.8)
        time.sleep(1.6)

    log('tech strip: hover pauses marquee')
    scroll_to('document.documentElement.scrollHeight', settle=0.8)
    visit([P(vw * 0.25, vh * 0.54), P(vw * 0.50, vh * 0.54), P(vw * 0.75, vh * 0.54)],
          dwell=0.8, dur=0.7)

    log('footer: giant PULSAR')
    visit([P(vw * 0.35, vh * 0.78), P(vw * 0.65, vh * 0.78)], dwell=0.7, dur=0.7)
    mouse.position = P(vw * 0.5, vh * 0.85)
    mouse.click(Button.left)
    time.sleep(0.9)

    log('dock: magnify sweep')
    m = json.loads(evaluate(MEASURE_JS))
    pts = [center(d) for d in m['dockBtns']]
    if pts:
        visit(pts, dwell=0.4, dur=0.35)
        time.sleep(0.6)

    log('back to top: restore theme + finale')
    evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    time.sleep(0.8)
    m = json.loads(evaluate(MEASURE_JS))
    dots = m.get('themeDots') or []
    if dots:
        smooth_move(*center(dots[0]), 0.6)
        time.sleep(0.4)
        mouse.click(Button.left)
        time.sleep(2.4)
    visit([P(vw * 0.40, vh * 0.50), P(vw * 0.60, vh * 0.45), P(vw * 0.50, vh * 0.55)],
          dwell=0.5, dur=0.6)
    log('done')


if __name__ == '__main__':
    if sys.argv[1] == 'taskbar':
        do_taskbar(sys.argv[2])
    else:
        pid = int(sys.argv[2])
        (do_check if sys.argv[1] == 'check' else do_run)(pid)
