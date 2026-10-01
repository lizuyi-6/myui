# myui

组件库与两个 PULSAR demo 站的工作区。

## 目录

| 目录 | 内容 |
| --- | --- |
| `react-bits/` | [react-bits](https://github.com/DavidHDev/react-bits) 上游克隆 + 本地产物目录（`output/local-collection` 截图、WORKLOG 等本地工作文件） |
| `aceternity/` | Aceternity 免费组件镜像（122 项，来自官方 `/api/components` + `/registry/<name>.json` 接口） |
| `pulsar/` | PULSAR demo 一：react-bits 组件 showcase 站（18 个组件，四套主题） |
| `pulsar-site/` | PULSAR demo 二：独立官网（8 个页面、361 个组件详情，奶油白/珊瑚橙/深绿配色） |
| `themecheck/` | 主题验证截图 |
| 根目录 | 组件清单（`COMPONENT-INVENTORY.*`）、抓取/截图脚本（`summarize-components.mjs`、`theme_shots.py`、`drive_demo2.py`） |

## 说明

- `pulsar-site` 构建依赖同工作区的 `react-bits/`、`aceternity/` 与 `COMPONENT-INVENTORY.json`，需整仓检出后使用。
- 三个子项目各自的旧 git 历史保留在本地 `<项目>/.git.bak/`（已 gitignore，不入库）。
- 启动任一 demo：进入目录后 `npm ci && npm run dev`。
