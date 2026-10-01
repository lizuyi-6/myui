"""Generate INDEX.md from downloaded component metadata."""
import json
import glob

rows = {"components": [], "blocks": [], "hooks": []}
for cj in glob.glob("components/*/component.json") + glob.glob("blocks/*/component.json") + glob.glob("hooks/*/component.json"):
    m = json.load(open(cj, encoding="utf-8"))
    rows[m["kind"]].append(m)

lines = [
    "# Aceternity UI — 免费组件本地镜像",
    "",
    "> 来源：ui.aceternity.com 官方 shadcn registry（`/registry/<name>.json`），仅含免费公开项（112 组件 + 9 block + 1 hook）。",
    "> 下载日期：2026-09-30。每个目录内有 `component.json`（元数据：分类/依赖/文档链接）+ 完整源码；",
    "> 原始 registry JSON 备份在 `_meta/registry/`。",
    "",
]
for kind, label in (("components", "组件"), ("blocks", "Blocks"), ("hooks", "Hooks")):
    items = sorted(rows[kind], key=lambda x: x["name"])
    lines.append(f"## {label}（{len(items)}）")
    lines.append("")
    lines.append("| 名称 | 分类 | 依赖 | 源码 |")
    lines.append("|---|---|---|---|")
    for m in items:
        cats = ", ".join(m["categories"][:3]) if m["categories"] else "—"
        deps = m["dependencies"]
        dep_s = ", ".join(deps[:4]) + (f" (+{len(deps) - 4})" if len(deps) > 4 else "") if deps else "—"
        file_s = "<br>".join("`" + f.replace("components/ui/", "") + "`" for f in m["files"][:3])
        doc = m.get("documentationUrl") or ""
        lines.append(f"| **{m['title']}** [`{m['name']}`]({doc}) | {cats} | {dep_s} | {file_s} |")
    lines.append("")

open("INDEX.md", "w", encoding="utf-8", newline="\n").write("\n".join(lines))
total = sum(len(v) for v in rows.values())
print("INDEX.md written,", total, "items")
