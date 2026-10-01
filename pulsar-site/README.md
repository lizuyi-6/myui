# PULSAR 官网（本地演示）

独立网站位于 `X:/myui/pulsar-site`。产品按当前组件集合定义为 PULSAR：动态组件、不同风格、真实源码和 AI 取用入口。首页使用奶油白、珊瑚橙和深绿；完整站点包含 8 个主要页面与 361 个组件详情。

## 启动

在本目录执行：

```powershell
npm ci
npm run build
npm run preview
```

访问 <http://127.0.0.1:5300/>。`npm run dev` 用于开发。构建依赖同工作区的 `../react-bits`、`../aceternity`、`../COMPONENT-INVENTORY.json` 以及 `react-bits/output/local-collection/r3` 的既有截图；这是当前工作区的组合项目。

## 页面

| 地址 | 内容 |
| --- | --- |
| `/` | 产品介绍、3D 海报、卡组、胶片长廊、FAQ |
| `/components` | 361 条目、分类、来源、搜索、分页 |
| `/components/:id` | 真实版本、文件下载、复制、参数、AI 取用说明 |
| `/styles` | 四种色调、可写便笺、点击反馈、空间卡组 |
| `/docs` | 接入指南 |
| `/docs/ai` | AI 取用约定及目录下载 |
| `/docs/motion` | 动效主次及减少动态 |
| `/docs/sources` | 原库来源和许可文件 |
| `/about` | 产品理念与动态连接示意 |

构建生成每个地址自己的 `index.html`，预览中间件直接服务对应文件。导航由 React Router 接管。搜索筛选保存在 URL；便笺、点击次数与风格仅在当前 SPA 会话中保留，刷新后重置。

互动演示在服务端 HTML 中先保持 inert，客户端组件初始化后才开放操作，避免脚本尚未接管时输入被初始状态覆盖。

## 复用约定

`src/vendor` 的 18 个组件、33 个 JSX/TSX/CSS 文件与原库按 SHA-256 核对；清单见 `REUSE-MANIFEST.json`。本站新增代码负责页面组合、导航、内容、主题参数、搜索及源码读取，不改原组件动画。15 个 React Bits 组件提供详情互动预览；3 个 Aceternity 组件用于官网组合，其详情仍标明尚未接入本站预览。其他 346 条目提供真实源码与来源链接。

AI 先读取 `public/catalog.json`，从 `public/source/<id>.json` 取真实文件与版本。CSS 版本必须配套复制 CSS。缺少统一参数表时读原接口，不要推测 API。全量快照只表示本地收录，不能证明所有组件都能在任意宿主直接运行。

## 复现检查

保持预览服务器运行，在另一终端执行：

```powershell
npm run check:reuse
npm run check:assets
npm run check:browser
npm run evidence
```

浏览器检查使用锁定的 Playwright CLI，首次运行需要本机 Chromium；可通过 `npx playwright-cli install-browser` 安装。结果写入 `output/playwright`，脚本读取 total/failed/skipped 和具体状态断言，不将 CLI 的退出 0 单独当成功。`SITE-EVIDENCE.md` 包含全量改动文件、验证映射、未覆盖范围与失败记录。截图仅证明 UI。

## 本地范围与来源

本轮没有部署、发布或提交 Git。React Bits 的本地许可原文保存在 `public/licenses/react-bits-LICENSE.md`，其中包含 Commons Clause 限制；本站保留来源，不声称具备组件公开再分发授权。Aceternity 下载目录没有统一许可文件。本地预览与未来公开发布须分别判断，公开源码分发前应核对原项目条款。

本轮未覆盖 Safari、Firefox、真实手机、屏幕阅读器、全部条目的运行时接口、GPU/FPS/Core Web Vitals；没有账户、支付或远程存储功能。
