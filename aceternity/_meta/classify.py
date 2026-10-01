"""Classify all downloaded items by animation paradigm and move them into
by-paradigm/<NN-class>/<name>/. Signals are stored in each
component.json (field "paradigm" + "signals"). Regenerates INDEX.md grouped
by class. No prose documents are produced."""
import json
import os
import re
import shutil

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))

CLASSES = [  # (folder, label) — ordered as a study progression, easy -> hard
    ("01-static-visual", "静态视觉"),
    ("02-css-keyframes", "纯CSS/Tailwind关键帧"),
    ("03-enter-exit", "motion声明式/进出场编排"),
    ("04-svg-vector", "SVG路径与滤镜动画"),
    ("05-motion-pipeline", "MotionValue管线(鼠标/物理弹簧)"),
    ("06-scroll-driven", "滚动驱动(useScroll)"),
    ("07-canvas-2d", "Canvas 2D指令式绘图"),
    ("08-particles-engine", "粒子引擎(tsparticles)"),
    ("09-webgl-shader", "WebGL/three.js/shader"),
]
ORDER = [c[0] for c in CLASSES]

MOTION_APIS = ["AnimatePresence", "useScroll", "useTransform", "useSpring",
               "useMotionValue", "useAnimate", "stagger", "useInView",
               "useAnimationFrame", "useVelocity", "useMotionTemplate",
               "useMotionValueEvent", "MotionValue", "LayoutGroup", "layoutId"]
REACT_HOOKS = ["useState", "useEffect", "useRef", "useMemo", "useCallback",
               "useId", "useLayoutEffect", "createContext", "useReducer"]
PKG_SPECIAL = ["three", "@react-three/fiber", "@react-three/drei",
               "@tsparticles/react", "simplex-noise", "@tabler/icons-react",
               "clsx", "tailwind-merge", "gsap"]


def scan_item(item_dir):
    sig = {"loc": 0, "files": 0, "motion_apis": [], "react_hooks": [],
           "pkgs": [], "svg_tags": 0, "svg_paths": 0, "svg_filters": 0,
           "motion_elements": 0, "animate_classes": [], "canvas2d": False,
           "webgl_shader": False, "tsparticles": False, "gradients": 0,
           "blur": 0, "dark_classes": 0, "arbitrary_values": 0,
           "event_listeners": [], "raf": False, "cn_calls": 0,
           "use_client": False, "interfaces": [], "forwardRef": False,
           "animate_props": 0}

    for base, _, files in os.walk(item_dir):
        for fn in files:
            if not fn.endswith((".tsx", ".ts", ".css")):
                continue
            p = os.path.join(base, fn)
            t = open(p, encoding="utf-8", errors="replace").read()
            sig["files"] += 1
            sig["loc"] += t.count("\n") + 1
            if '"use client"' in t:
                sig["use_client"] = True
            for a in MOTION_APIS:
                if a in sig["motion_apis"]:
                    continue
                if re.search(r"\b" + a + r"\b", t):
                    sig["motion_apis"].append(a)
            for h in REACT_HOOKS:
                if h not in sig["react_hooks"] and re.search(r"\b" + h + r"\b", t):
                    sig["react_hooks"].append(h)
            for pkg in PKG_SPECIAL:
                if pkg in sig["pkgs"]:
                    continue
                if re.search(r"from\s+[\"']" + re.escape(pkg) + "[\"']", t):
                    sig["pkgs"].append(pkg)
            if re.search(r"forwardRef", t):
                sig["forwardRef"] = True
            sig["svg_tags"] += len(re.findall(r"<svg", t))
            sig["svg_paths"] += len(re.findall(r"<path", t))
            sig["svg_filters"] += len(re.findall(r"<(filter|defs|linearGradient|radialGradient|pattern)\b", t))
            sig["motion_elements"] += len(re.findall(r"<motion\.", t))
            sig["animate_classes"] += re.findall(r"\banimate-[a-z-]+", t)
            if 'getContext("2d"' in t or "simplex-noise" in t:
                sig["canvas2d"] = True
            if re.search(r"(three|@react-three|shaderMaterial|void main\s*\()", t):
                sig["webgl_shader"] = True
            if "tsparticles" in t:
                sig["tsparticles"] = True
            sig["gradients"] += len(re.findall(r"bg-gradient|from-|via-|to-", t))
            sig["blur"] += len(re.findall(r"\bblur|backdrop-blur", t))
            sig["dark_classes"] += len(re.findall(r"dark:", t))
            sig["arbitrary_values"] += len(re.findall(r"\w-\[[^\]]+\]", t))
            for ev in ["scroll", "mousemove", "mouseenter", "mouseleave",
                       "resize", "wheel", "keydown", "touchmove"]:
                if ev not in sig["event_listeners"] and (
                        "on" + ev.capitalize() in t or f'addEventListener("{ev}"' in t):
                    sig["event_listeners"].append(ev)
            if "requestAnimationFrame" in t:
                sig["raf"] = True
            sig["cn_calls"] += len(re.findall(r"\bcn\(", t))
            sig["animate_props"] += len(re.findall(r"\b(animate|initial|exit)=\{", t))
            sig["interfaces"] += re.findall(r"(?:interface|type)\s+(\w+Props)", t)

    sig["animate_classes"] = sorted(set(sig["animate_classes"]))
    return sig


def classify(sig):
    if sig["webgl_shader"]:
        return "09-webgl-shader"
    if sig["canvas2d"]:
        return "07-canvas-2d"
    if sig["tsparticles"]:
        return "08-particles-engine"
    if "useScroll" in sig["motion_apis"]:
        return "06-scroll-driven"
    if any(a in sig["motion_apis"] for a in
           ["useMotionValue", "useTransform", "useSpring", "useVelocity",
            "useMotionTemplate", "useAnimationFrame"]):
        return "05-motion-pipeline"
    svg_heavy = (sig["svg_filters"] >= 1 or sig["svg_paths"] >= 3) and \
                (sig["motion_elements"] > 0 or sig["animate_classes"] or sig["svg_tags"] >= 1)
    if svg_heavy:
        return "04-svg-vector"
    if sig["motion_elements"] >= 2 or sig["animate_props"] >= 1 \
            or "AnimatePresence" in sig["motion_apis"] \
            or "useAnimate" in sig["motion_apis"] or "stagger" in sig["motion_apis"]:
        return "03-enter-exit"
    if sig["animate_classes"]:
        return "02-css-keyframes"
    return "01-static-visual"


# ---- collect items (idempotent: read current by-paradigm tree) ---------
items = []  # (name, current_dir, current_class or None)
src_roots = [os.path.join(ROOT, k) for k in ("components", "blocks", "hooks")]
bp = os.path.join(ROOT, "by-paradigm")
for cls, _ in CLASSES:
    os.makedirs(os.path.join(bp, cls), exist_ok=True)

for cls, _ in CLASSES:
    d = os.path.join(bp, cls)
    if os.path.isdir(d):
        for name in sorted(os.listdir(d)):
            p = os.path.join(d, name)
            if os.path.isdir(p):
                items.append((name, p, cls))
# legacy roots from a first-run layout
for r in src_roots:
    if os.path.isdir(r):
        for name in sorted(os.listdir(r)):
            p = os.path.join(r, name)
            if os.path.isdir(p):
                items.append((name, p, None))

seen = {}
results = []
collisions = []
for name, src, cur_cls in items:
    cj = os.path.join(src, "component.json")
    meta = json.load(open(cj, encoding="utf-8")) if os.path.exists(cj) else {}
    kind = meta.get("kind") or "component"
    if name in seen:
        collisions.append(name)
        new_name = f"{kind}-{name}"
    else:
        new_name = name
    seen[new_name] = kind
    sig = scan_item(src)
    cls = classify(sig)
    if cls == cur_cls:
        dest = src
    else:
        dest = os.path.join(bp, cls, new_name)
        if os.path.isdir(dest):
            shutil.rmtree(dest)
        shutil.move(src, dest)
    # stamp metadata
    meta["kind"] = kind
    meta["paradigm"] = cls
    meta["signals"] = sig
    json.dump(meta, open(os.path.join(dest, "component.json"), "w",
              encoding="utf-8", newline="\n"), ensure_ascii=False, indent=2)
    results.append((cls, kind, new_name, meta, sig))

# remove legacy roots if now empty
for r in src_roots:
    if os.path.isdir(r) and not os.listdir(r):
        os.rmdir(r)

# ---- INDEX.md (classification table only) ------------------------------
lines = ["# Aceternity UI 免费组件 — 按技术范式分类", "",
         f"> 共 {len(results)} 项（组件/块/hook 合并），位于 `by-paradigm/<类>/<名>/`；",
         "> 类别按学习难度递进排序（简单→复杂）。每个目录内 `component.json` 含完整检测信号。",
         ""]
for cls, label in CLASSES:
    rows = [r for r in results if r[0] == cls]
    rows.sort(key=lambda r: r[3].get("signals", {}).get("loc", 0))
    if not rows:
        continue
    lines.append(f"## {cls} — {label}（{len(rows)}）")
    lines.append("")
    lines.append("| 名称 | 类型 | LOC | 核心信号 |")
    lines.append("|---|---|---|---|")
    for cls_, kind, name, meta, sig in rows:
        core = []
        if sig["motion_apis"]:
            core += sig["motion_apis"][:4]
        if sig["animate_classes"]:
            core += sig["animate_classes"][:2]
        if sig["canvas2d"]:
            core.append("canvas2d")
        if sig["webgl_shader"]:
            core.append("webgl/three")
        if sig["tsparticles"]:
            core.append("tsparticles")
        if sig["svg_filters"]:
            core.append(f"svg-filter x{sig['svg_filters']}")
        lines.append(f"| **{meta.get('title', name)}** `{name}` | {kind} | "
                     f"{sig['loc']} | {', '.join(core) or '—'} |")
    lines.append("")
open(os.path.join(ROOT, "INDEX.md"), "w", encoding="utf-8", newline="\n").write("\n".join(lines))

# ---- summary -----------------------------------------------------------
print(f"classified {len(results)} items -> by-paradigm/")
for cls, label in CLASSES:
    n = sum(1 for r in results if r[0] == cls)
    print(f"  {cls}  {n:3d}  {label}")
print("collisions renamed:", collisions or "none")
