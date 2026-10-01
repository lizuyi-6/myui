# Screenshot each theme of the PULSAR site via CDP for visual verification.
import base64, json, time, urllib.request

CDP = 'http://127.0.0.1:9223'

def http(method, **params):
    req = urllib.request.Request(
        f'{CDP}/json/runtime-unsupported', data=b'', method='GET')  # placeholder
    return req

def ws_call():
    pass

# Use plain HTTP endpoints + websocket via minimal client
import socket, struct, base64, hashlib, os

class WS:
    def __init__(self, url):
        assert url.startswith('ws://')
        rest = url[5:]
        host_path, _, _ = rest.partition('/')
        host, _, port = host_path.partition(':')
        port = int(port or 80)
        path = '/' + rest.partition('/')[2]
        self.sock = socket.create_connection((host, port), timeout=30)
        key = base64.b64encode(os.urandom(16)).decode()
        handshake = (
            f'GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\n'
            'Upgrade: websocket\r\nConnection: Upgrade\r\n'
            f'Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n')
        self.sock.sendall(handshake.encode())
        resp = b''
        while b'\r\n\r\n' not in resp:
            resp += self.sock.recv(4096)
        self.id = 0

    def send(self, method, **params):
        self.id += 1
        payload = json.dumps({'id': self.id, 'method': method, 'params': params}).encode()
        header = bytearray([0x81])
        n = len(payload)
        if n < 126:
            header.append(0x80 | n)
        elif n < 65536:
            header.append(0x80 | 126)
            header += struct.pack('>H', n)
        else:
            header.append(0x80 | 127)
            header += struct.pack('>Q', n)
        mask = os.urandom(4)
        header += mask
        self.sock.sendall(bytes(header) + bytes(b ^ mask[i % 4] for i, b in enumerate(payload)))
        return self.id

    def recv_exact(self, n):
        buf = b''
        while len(buf) < n:
            chunk = self.sock.recv(n - len(buf))
            if not chunk:
                raise EOFError
            buf += chunk
        return buf

    def wait_result(self, want_id, timeout=30):
        deadline = time.time() + timeout
        while time.time() < deadline:
            b1, b2 = self.recv_exact(2)
            fin_op = b1
            masked = b2 & 0x80
            n = b2 & 0x7F
            if n == 126:
                n = struct.unpack('>H', self.recv_exact(2))[0]
            elif n == 127:
                n = struct.unpack('>Q', self.recv_exact(8))[0]
            mask = self.recv_exact(4) if masked else None
            data = self.recv_exact(n)
            if mask:
                data = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
            if fin_op & 0x0F != 1:  # not text
                continue
            msg = json.loads(data)
            if msg.get('id') == want_id:
                if 'error' in msg:
                    raise RuntimeError(msg['error'])
                return msg.get('result', {})
        raise TimeoutError(want_id)

    def call(self, method, timeout=30, **params):
        self.send(method, **params)
        return self.wait_result(self.id, timeout)

def main():
    tabs = json.load(urllib.request.urlopen(f'{CDP}/json'))
    page = next(t for t in tabs if t['type'] == 'page' and 'omnibox' not in t.get('url', ''))
    ws = WS(page['webSocketDebuggerUrl'])
    ws.call('Page.enable')
    ws.call('Runtime.enable')

    def js(expr, timeout=30):
        r = ws.call('Runtime.evaluate', expression=expr, returnByValue=True, awaitPromise=True, timeout=timeout)
        return r.get('result', {}).get('value')

    js('location.href = "http://localhost:5288/"')
    time.sleep(6)
    out_dir = 'X:/myui/themecheck'
    os.makedirs(out_dir, exist_ok=True)

    def shot(name):
        data = ws.call('Page.captureScreenshot', format='png')
        with open(f'{out_dir}/{name}.png', 'wb') as f:
            f.write(base64.b64decode(data['data']))
        print('saved', name)

    themes = ['暖阳', '青柠汽水', '蜜桃日落', '经典深夜']
    for i, name in enumerate(themes):
        js(f'document.querySelector(\'button[aria-label="切换配色：{name}"]\').click()')
        time.sleep(4.0)  # Aurora canvas rebuild
        js('window.scrollTo({top:0,behavior:"instant"})')
        time.sleep(1.5)
        shot(f'theme{i}-hero')
        # scrolled views only for first (default light) and third (dark warm)
        if i in (0, 2):
            for anchor, tag in (('#lab', 'lab'), ('#playground', 'play')):
                js(f'document.querySelector("{anchor}").scrollIntoView({{behavior:"instant"}})')
                time.sleep(2.5)
                shot(f'theme{i}-{tag}')
            js('window.scrollTo({top:document.body.scrollHeight*0.86,behavior:"instant"})')
            time.sleep(2.5)
            shot(f'theme{i}-radar')
    ws.sock.close()
    print('DONE')

main()
