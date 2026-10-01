"""Download all free Aceternity UI items (components, blocks, hook) via the
official shadcn registry endpoints and extract source files to disk."""
import json
import os
import time
import urllib.request
import concurrent.futures

BASE = "https://ui.aceternity.com/registry"
ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
META = os.path.join(ROOT, "_meta", "registry")
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

api = json.load(open(os.path.join(os.path.dirname(__file__), "components-api.json"), encoding="utf-8"))
os.makedirs(META, exist_ok=True)


def fetch(url, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.5 * (i + 1))
    raise last


items = []
for kind, arr in (("components", api["components"]), ("blocks", api["blocks"]), ("hooks", api["hooks"])):
    for it in arr:
        items.append((kind, it))

print(f"{len(items)} items total: "
      f"components={len(api['components'])} blocks={len(api['blocks'])} hooks={len(api['hooks'])}")

ok, fail = [], []


def grab(job):
    kind, it = job
    name = it["name"]
    url = f"{BASE}/{name}.json"
    reg_path = os.path.join(META, f"{name}.json")
    try:
        reg = fetch(url)
        with open(reg_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(reg, f, ensure_ascii=False, indent=2)
        base_dir = os.path.join(ROOT, kind, name)
        n_files = 0
        for fe in reg.get("files", []):
            rel = fe.get("path") or fe.get("target") or ""
            if not rel or not fe.get("content"):
                continue
            rel = rel.replace("\\", "/").lstrip("/")
            dest = os.path.normpath(os.path.join(base_dir, rel))
            if not dest.startswith(os.path.normpath(base_dir)):
                continue
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "w", encoding="utf-8", newline="\n") as f:
                f.write(fe["content"])
            n_files += 1
        # per-item metadata
        meta = {
            "name": name,
            "title": it.get("title") or reg.get("title"),
            "kind": kind,
            "description": it.get("description"),
            "categories": it.get("categories", []),
            "dependencies": reg.get("dependencies") or it.get("dependencies") or [],
            "registryDependencies": it.get("registryDependencies") or [],
            "documentationUrl": it.get("documentationUrl"),
            "files": [fe.get("path") or fe.get("target") for fe in reg.get("files", [])],
            "author": reg.get("author"),
        }
        with open(os.path.join(base_dir, "component.json"), "w", encoding="utf-8", newline="\n") as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        return (name, kind, n_files, None)
    except Exception as e:  # noqa: BLE001
        return (name, kind, 0, repr(e)[:200])


t0 = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
    for res in ex.map(grab, items):
        if res[3]:
            fail.append(res)
            print(f"FAIL {res[0]}: {res[3]}")
        else:
            ok.append(res)

print(f"\ndone in {time.time()-t0:.1f}s — ok={len(ok)} fail={len(fail)}")

# index for report generation
with open(os.path.join(os.path.dirname(__file__), "download_results.json"), "w", encoding="utf-8") as f:
    json.dump({"ok": [list(r) for r in ok], "fail": [list(r) for r in fail]}, f, indent=2)
