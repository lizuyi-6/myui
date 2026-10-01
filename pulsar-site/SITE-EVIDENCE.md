# R5 / PULSAR 官网证据

环境：Windows 本地，Node v24.13.1，Chromium，Vite production preview http://127.0.0.1:5300。前置：同工作区原库与库存快照存在，预览服务运行。仅本地范围，未部署、未公开发布。

命题映射：源码 SHA 相同证明“直接复用”；DOM/状态断言证明对应流程；369 个 HTTP body == 物理文件证明每个已列地址返回自己的 HTML。它们不证明全部组件、所有宿主、跨浏览器或公开分发授权。

## 本轮实际结果

| 命令 | 退出码 | 结果 |
| --- | --- | --- |
| npm run build | 0 | 8 主页面 + 361 详情 = 369 个物理 HTML；SSR h1/data-route 断言 |
| npm run check:reuse | 0 | 18 组件、33 源码逐字节相同；10 R3 图相同；361 源包相同；许可原文相同；failed=0 skipped=0 |
| npm run check:assets | 0 | total=731 passed=731 failed=0 skipped=0，HTTP 真实 body/JSON 一致性 |
| npm run check:browser | 0 | 工作流 25/25 + 演示 15/15 + 布局 42/42；total=82 failed=0 skipped=0；pageerrors=[] |
| npm run evidence | 0 | 上述字段闸门；逐文件 443 行映射和 SHA/mtime |

工作流字段断言 75 条；演示字段断言 60 条。每条实际值与预期值保存在 output/playwright。源包、许可与复用身份不等于所有交互已经测过。

## 早期失败保留

行为首次 25/17/8，第二次 25/24/1；布局首次 28/27/1；源包 JSON 比对失败；物理 HTML HTTP 首次 731/363/368；抓图会话与选择器失败。见 WORKLOG.md 与 output/playwright/*first*、behavior-final.json、captures-second-failed.log。用例未减少、failed 没有改名为 skipped。Windows 剪贴板仅做 CRLF/LF 标准化比较；下载文件仍检查真实内容。

末轮初始化竞态 25/24/1 原样保留为 `behavior-hydration-failed.json`。SSR 互动子树在客户端初始化前保持 inert，实际阻断 JS 后断言 `inert == true`、`activeElement != textarea`，恢复 JS 后断言输入值与跨页状态。该钩子同样仅在测试工具中拦截请求，没有加入生产源码。

## 未覆盖范围（本轮未触及的相关路径/测试/分支）

- 346 个仅收录源码的详情没有运行时演示测试；未完整阅读其中全部实现。现有 15 个演示没有覆盖所有参数、长文本、空内容、多实例和全部失败分支。
- 本轮执行 verify-site.cjs / verify-demos.cjs / check-layout.cjs；没有执行兄弟组件库的全库端到端或单元套件，既有 R3 测量不作为 R5 新测量。
- 源包 503 → alert/disabled/retry 分支实测；剪贴板拒绝、网络断开、无效 JSON、Abort 路由竞态没有专项用例；全部 369 地址没有逐个浏览器 hydration 检查，HTTP HTML 一致性不证明浏览器行为。
- 未覆盖 Safari、Firefox、真机触摸、屏幕阅读器、GPU/FPS/Core Web Vitals、公开托管/子路径部署。
- 未提供账户、支付、远程保存；便笺与点击只保存在当前 SPA 会话。来源许可文件只是原文，不是授权结论。

- 相关未运行检查：`../react-bits/scripts/checkPropDocs.test.js`、`checkLocalCollection.mjs`、`checkLocalRegistry.mjs`。检索命令：`rg --files ../react-bits -g "*test*" -g "*check*" -g "!node_modules/**" -g "!dist/**" -g "!output/**"`。
- 相关实现未做完整语义复查：`../react-bits/src/ts-default/Components/PrismDeck/PrismDeck.tsx`、`../react-bits/src/content/Backgrounds/Aurora/Aurora.jsx`。源码收录读取不等于语义审阅。
- 503 注入使用 Playwright `page.route` 拦截同一个源码请求，钩子不进入生产构建。此证据证明浏览器消费层拒绝失败响应与恢复，不证明服务器真实故障或服务端可用性。

## 本轮改动可能引入的新风险

范围锚：git diff --stat 全量 443 个文件，详见 output/playwright/git-diff-stat.txt。源码快照可能随原库更新过时；SSR 与客户端状态可能出现未采样差异；具体托管服务需要按物理目录配置；复制多个动效实例可能增加渲染成本；会话内容刷新丢失；全量源包公开分发要独立核对许可。6 个共享/动态导入构建警告保留，没有 FPS 或性能达标结论。

## 每个改动文件与对应证据

| 文件 | 改动语义与证据 / 限制 |
| --- | --- |
| .gitattributes | 字节保留策略：git check-attr text 对 vendor 与源包返回 unset；不做工作副本换行转换。未单独验证其他 Git 客户端。 |
| .gitignore | 隔离依赖、构建和证据输出；git check-ignore 指定输出与 node_modules；不改变源文件跟踪。 |
| AGENTS.md | 未来 AI 取用约定：内容留存，人工读稿；不能证明未来模型遵循规则。 |
| README.md | 使用说明与范围：内容字段、依赖与脚本锚点存在，人工读稿；文档无独立行为测试。 |
| REUSE-MANIFEST.json | 33 个目标逐文件 SHA == 原库 SHA；18 个选择存在。此处是字节一致性，不是全库运行结论。 |
| SITE-EVIDENCE.md | 本轮报告：由本脚本生成，逐文件行数 == git diff 文件数；报告本身不新增行为覆盖。 |
| WORKLOG.md | R5 做了什么/未覆盖范围及失败账本：内容留存，人工读稿；不能替代具体断言。 |
| index.html | 中文语言、入口与元数据：build 与 369 个物理 HTML 断言；未做搜索引擎收录验证。 |
| package-lock.json | 安装锁文件：dependencies/devDependencies == package.json；npm install 退出 0。未做其他 OS 的 npm ci。 |
| package.json | 项目脚本与锁定依赖：npm install 退出 0；build/check:reuse/check:assets/check:browser/evidence 实际命令；依赖字段 == lock 根包字段。 |
| public/catalog.json | AI 目录下载：HTTP JSON == 磁盘 JSON；下载文件 entries.length == 361。 |
| public/favicon.svg | 静态品牌图标进入 dist；浏览器截图显示页面主体。未单独验证，理由=未做图标视觉断言。 |
| public/licenses/react-bits-LICENSE.md | 许可原文：SHA(本站文件) == SHA(原庫 LICENSE.md)。不构成再分发授权证明。 |
| public/previews/ApertureReveal.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/ApertureReveal.png) == 7bacf90f7358d7b604f13a90cf83f4b3269876ea6c6eade3bcd230039badb0d7。不作为 R5 动效行为证据。 |
| public/previews/BeamPath.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/BeamPath.png) == e96ad4ad8de82acb80834bc568d7f97f58d6ad29601b59806adc8ea0491221ad。不作为 R5 动效行为证据。 |
| public/previews/ConveyorGallery.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/ConveyorGallery.png) == af40ec64d33507671d7935f7a8d832d4d827a99d9725450a1a29cd67df99cb74。不作为 R5 动效行为证据。 |
| public/previews/DepthLiftCard.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/DepthLiftCard.png) == 45857a7a0702040ccc3cbbefe3f0da4ecf16835ae91d732c5422fb39050fe04c。不作为 R5 动效行为证据。 |
| public/previews/KineticTiles.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/KineticTiles.png) == 20991ae8db46b61ad4003f47f4f284d11f31070d1972d8e52923428e224aaf34。不作为 R5 动效行为证据。 |
| public/previews/LiquidAction.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/LiquidAction.png) == 67e1e970a4e1ca732dacc6299b247b21a0b8decfbacff8418f9e088a2551523f。不作为 R5 动效行为证据。 |
| public/previews/OrbitStage.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/OrbitStage.png) == 4c7ef2bc50b2541387e1a5d790bf0d57289aa1afb3de9fd6c1abc385859d15eb。不作为 R5 动效行为证据。 |
| public/previews/PrismDeck.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/PrismDeck.png) == 1c474aba82eefdc591135511d3c1a92b8506ff62209c9eea56a62bf3330871b9。不作为 R5 动效行为证据。 |
| public/previews/ScrollTheater.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/ScrollTheater.png) == 4464a6c7758dc36f969d2e1fe52d0b11bf8455a2a92c9f4f7116e0bdfbf96d33。不作为 R5 动效行为证据。 |
| public/previews/ShutterText.png | 沿用 R3 实拍图：SHA(本站文件) == SHA(../react-bits/output/local-collection/r3/ShutterText.png) == 2dc7e9d386492f18d53cab0aae3cbddfe67661b79d754f53a409858fb0c907c7。不作为 R5 动效行为证据。 |
| public/source/aceternity-3d-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4319 bytes）。不证明组件运行行为。 |
| public/source/aceternity-3d-globe.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（17306 bytes）。不证明组件运行行为。 |
| public/source/aceternity-3d-marquee.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5419 bytes）。不证明组件运行行为。 |
| public/source/aceternity-3d-pin.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5951 bytes）。不证明组件运行行为。 |
| public/source/aceternity-animated-modal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6209 bytes）。不证明组件运行行为。 |
| public/source/aceternity-animated-testimonials.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5858 bytes）。不证明组件运行行为。 |
| public/source/aceternity-animated-tooltip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3510 bytes）。不证明组件运行行为。 |
| public/source/aceternity-apple-cards-carousel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10312 bytes）。不证明组件运行行为。 |
| public/source/aceternity-ascii-art.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（15021 bytes）。不证明组件运行行为。 |
| public/source/aceternity-aurora-background.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3302 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-beams-with-collision.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7768 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-beams.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10416 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-boxes.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2578 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-gradient-animation.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7031 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-gradient.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2834 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-lines.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（19007 bytes）。不证明组件运行行为。 |
| public/source/aceternity-background-ripple-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4373 bytes）。不证明组件运行行为。 |
| public/source/aceternity-bento-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1640 bytes）。不证明组件运行行为。 |
| public/source/aceternity-canvas-reveal-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（8984 bytes）。不证明组件运行行为。 |
| public/source/aceternity-canvas-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6274 bytes）。不证明组件运行行为。 |
| public/source/aceternity-card-hover-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2992 bytes）。不证明组件运行行为。 |
| public/source/aceternity-card-spotlight.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11187 bytes）。不证明组件运行行为。 |
| public/source/aceternity-card-stack.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2478 bytes）。不证明组件运行行为。 |
| public/source/aceternity-cards-demo-1.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1920 bytes）。不证明组件运行行为。 |
| public/source/aceternity-cards-demo-2.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1874 bytes）。不证明组件运行行为。 |
| public/source/aceternity-cards-demo-3.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（12632 bytes）。不证明组件运行行为。 |
| public/source/aceternity-carousel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6791 bytes）。不证明组件运行行为。 |
| public/source/aceternity-chromatic-image.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11100 bytes）。不证明组件运行行为。 |
| public/source/aceternity-cloud-shader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11297 bytes）。不证明组件运行行为。 |
| public/source/aceternity-code-block.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3692 bytes）。不证明组件运行行为。 |
| public/source/aceternity-colourful-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1710 bytes）。不证明组件运行行为。 |
| public/source/aceternity-comet-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3315 bytes）。不证明组件运行行为。 |
| public/source/aceternity-compare.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7953 bytes）。不证明组件运行行为。 |
| public/source/aceternity-container-scroll-animation.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2965 bytes）。不证明组件运行行为。 |
| public/source/aceternity-container-text-flip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3615 bytes）。不证明组件运行行为。 |
| public/source/aceternity-cover.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18851 bytes）。不证明组件运行行为。 |
| public/source/aceternity-direction-aware-hover.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4054 bytes）。不证明组件运行行为。 |
| public/source/aceternity-dither-shader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（15659 bytes）。不证明组件运行行为。 |
| public/source/aceternity-dotted-glow-background.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10016 bytes）。不证明组件运行行为。 |
| public/source/aceternity-draggable-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5038 bytes）。不证明组件运行行为。 |
| public/source/aceternity-encrypted-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4960 bytes）。不证明组件运行行为。 |
| public/source/aceternity-evervault-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3843 bytes）。不证明组件运行行为。 |
| public/source/aceternity-expandable-card-demo-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（12236 bytes）。不证明组件运行行为。 |
| public/source/aceternity-expandable-card-demo-standard.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（13310 bytes）。不证明组件运行行为。 |
| public/source/aceternity-features-section-demo-1.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5009 bytes）。不证明组件运行行为。 |
| public/source/aceternity-features-section-demo-2.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3973 bytes）。不证明组件运行行为。 |
| public/source/aceternity-features-section-demo-3.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10425 bytes）。不证明组件运行行为。 |
| public/source/aceternity-file-upload.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7366 bytes）。不证明组件运行行为。 |
| public/source/aceternity-flip-words.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3145 bytes）。不证明组件运行行为。 |
| public/source/aceternity-floating-dock.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5945 bytes）。不证明组件运行行为。 |
| public/source/aceternity-floating-navbar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3124 bytes）。不证明组件运行行为。 |
| public/source/aceternity-focus-cards.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2062 bytes）。不证明组件运行行为。 |
| public/source/aceternity-following-pointer.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3623 bytes）。不证明组件运行行为。 |
| public/source/aceternity-glare-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6969 bytes）。不证明组件运行行为。 |
| public/source/aceternity-globe.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（9128 bytes）。不证明组件运行行为。 |
| public/source/aceternity-glowing-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7104 bytes）。不证明组件运行行为。 |
| public/source/aceternity-glowing-stars.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4268 bytes）。不证明组件运行行为。 |
| public/source/aceternity-gooey-input.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7882 bytes）。不证明组件运行行为。 |
| public/source/aceternity-google-gemini-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11768 bytes）。不证明组件运行行为。 |
| public/source/aceternity-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（913 bytes）。不证明组件运行行为。 |
| public/source/aceternity-hero-highlight.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4960 bytes）。不证明组件运行行为。 |
| public/source/aceternity-hero-parallax.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4595 bytes）。不证明组件运行行为。 |
| public/source/aceternity-hero-section-demo-1.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5123 bytes）。不证明组件运行行为。 |
| public/source/aceternity-hover-border-gradient.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3682 bytes）。不证明组件运行行为。 |
| public/source/aceternity-image-generation-loader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20022 bytes）。不证明组件运行行为。 |
| public/source/aceternity-images-badge.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6287 bytes）。不证明组件运行行为。 |
| public/source/aceternity-images-slider.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3930 bytes）。不证明组件运行行为。 |
| public/source/aceternity-infinite-moving-cards.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4130 bytes）。不证明组件运行行为。 |
| public/source/aceternity-input.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2313 bytes）。不证明组件运行行为。 |
| public/source/aceternity-keyboard.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（28848 bytes）。不证明组件运行行为。 |
| public/source/aceternity-label.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（895 bytes）。不证明组件运行行为。 |
| public/source/aceternity-lamp.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4564 bytes）。不证明组件运行行为。 |
| public/source/aceternity-layout-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3549 bytes）。不证明组件运行行为。 |
| public/source/aceternity-layout-text-flip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2139 bytes）。不证明组件运行行为。 |
| public/source/aceternity-lens.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4348 bytes）。不证明组件运行行为。 |
| public/source/aceternity-link-preview.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4380 bytes）。不证明组件运行行为。 |
| public/source/aceternity-loader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6400 bytes）。不证明组件运行行为。 |
| public/source/aceternity-macbook-scroll.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20537 bytes）。不证明组件运行行为。 |
| public/source/aceternity-magnetic-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2057 bytes）。不证明组件运行行为。 |
| public/source/aceternity-meteors.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1826 bytes）。不证明组件运行行为。 |
| public/source/aceternity-moving-border.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3522 bytes）。不证明组件运行行为。 |
| public/source/aceternity-moving-line.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3063 bytes）。不证明组件运行行为。 |
| public/source/aceternity-multi-step-loader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4594 bytes）。不证明组件运行行为。 |
| public/source/aceternity-navbar-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3308 bytes）。不证明组件运行行为。 |
| public/source/aceternity-noise-background.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7317 bytes）。不证明组件运行行为。 |
| public/source/aceternity-notch.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10785 bytes）。不证明组件运行行为。 |
| public/source/aceternity-parallax-hero-images.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5128 bytes）。不证明组件运行行为。 |
| public/source/aceternity-parallax-scroll-2.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3600 bytes）。不证明组件运行行为。 |
| public/source/aceternity-parallax-scroll.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3128 bytes）。不证明组件运行行为。 |
| public/source/aceternity-pixelated-canvas.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（19084 bytes）。不证明组件运行行为。 |
| public/source/aceternity-placeholders-and-vanish-input.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（9052 bytes）。不证明组件运行行为。 |
| public/source/aceternity-pointer-highlight.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3714 bytes）。不证明组件运行行为。 |
| public/source/aceternity-resizable-navbar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（8797 bytes）。不证明组件运行行为。 |
| public/source/aceternity-scales.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2234 bytes）。不证明组件运行行为。 |
| public/source/aceternity-shooting-stars.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4122 bytes）。不证明组件运行行为。 |
| public/source/aceternity-sidebar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5218 bytes）。不证明组件运行行为。 |
| public/source/aceternity-sparkles.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（12282 bytes）。不证明组件运行行为。 |
| public/source/aceternity-spotlight-new.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3987 bytes）。不证明组件运行行为。 |
| public/source/aceternity-spotlight.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1796 bytes）。不证明组件运行行为。 |
| public/source/aceternity-squiggly-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3501 bytes）。不证明组件运行行为。 |
| public/source/aceternity-stars-background.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3810 bytes）。不证明组件运行行为。 |
| public/source/aceternity-stateful-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4047 bytes）。不证明组件运行行为。 |
| public/source/aceternity-sticky-banner.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2234 bytes）。不证明组件运行行为。 |
| public/source/aceternity-sticky-scroll-reveal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3892 bytes）。不证明组件运行行为。 |
| public/source/aceternity-svg-mask-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2852 bytes）。不证明组件运行行为。 |
| public/source/aceternity-tabs.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3541 bytes）。不证明组件运行行为。 |
| public/source/aceternity-tailwindcss-buttons.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1205 bytes）。不证明组件运行行为。 |
| public/source/aceternity-terminal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（15008 bytes）。不证明组件运行行为。 |
| public/source/aceternity-text-flipping-board.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（15679 bytes）。不证明组件运行行为。 |
| public/source/aceternity-text-generate-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（1750 bytes）。不证明组件运行行为。 |
| public/source/aceternity-text-hover-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4328 bytes）。不证明组件运行行为。 |
| public/source/aceternity-text-reveal-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5779 bytes）。不证明组件运行行为。 |
| public/source/aceternity-timeline.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3730 bytes）。不证明组件运行行为。 |
| public/source/aceternity-tooltip-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（6325 bytes）。不证明组件运行行为。 |
| public/source/aceternity-tracing-beam.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3966 bytes）。不证明组件运行行为。 |
| public/source/aceternity-typewriter-effect.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（4679 bytes）。不证明组件运行行为。 |
| public/source/aceternity-use-outside-click.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（930 bytes）。不证明组件运行行为。 |
| public/source/aceternity-vortex.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7688 bytes）。不证明组件运行行为。 |
| public/source/aceternity-wavy-background.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（3516 bytes）。不证明组件运行行为。 |
| public/source/aceternity-webcam-pixel-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18062 bytes）。不证明组件运行行为。 |
| public/source/aceternity-wobble-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（2926 bytes）。不证明组件运行行为。 |
| public/source/aceternity-world-map.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（5800 bytes）。不证明组件运行行为。 |
| public/source/react-bits-accordion-gallery.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（44709 bytes）。不证明组件运行行为。 |
| public/source/react-bits-acid-squares.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66279 bytes）。不证明组件运行行为。 |
| public/source/react-bits-aero-shards.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（359099 bytes）。不证明组件运行行为。 |
| public/source/react-bits-animated-content.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（13196 bytes）。不证明组件运行行为。 |
| public/source/react-bits-animated-list.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27840 bytes）。不证明组件运行行为。 |
| public/source/react-bits-antigravity.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（25935 bytes）。不证明组件运行行为。 |
| public/source/react-bits-aperture-reveal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27194 bytes）。不证明组件运行行为。 |
| public/source/react-bits-arcade-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（17669 bytes）。不证明组件运行行为。 |
| public/source/react-bits-asciitext.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（72751 bytes）。不证明组件运行行为。 |
| public/source/react-bits-aurora.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（28718 bytes）。不证明组件运行行为。 |
| public/source/react-bits-balatro.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（29004 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ballpit.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（111387 bytes）。不证明组件运行行为。 |
| public/source/react-bits-bauhaus-stepper.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21644 bytes）。不证明组件运行行为。 |
| public/source/react-bits-beam-path.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（33743 bytes）。不证明组件运行行为。 |
| public/source/react-bits-beams.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52338 bytes）。不证明组件运行行为。 |
| public/source/react-bits-bell-toggle.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（60099 bytes）。不证明组件运行行为。 |
| public/source/react-bits-blob-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18326 bytes）。不证明组件运行行为。 |
| public/source/react-bits-blueprint-panel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（25823 bytes）。不证明组件运行行为。 |
| public/source/react-bits-blur-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（14702 bytes）。不证明组件运行行为。 |
| public/source/react-bits-border-glow.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（50676 bytes）。不证明组件运行行为。 |
| public/source/react-bits-bounce-cards.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（19658 bytes）。不证明组件运行行为。 |
| public/source/react-bits-branched-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49407 bytes）。不证明组件运行行为。 |
| public/source/react-bits-bubble-choice.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18141 bytes）。不证明组件运行行为。 |
| public/source/react-bits-bubble-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（53747 bytes）。不证明组件运行行为。 |
| public/source/react-bits-call-chip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（51807 bytes）。不证明组件运行行为。 |
| public/source/react-bits-card-nav.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（39208 bytes）。不证明组件运行行为。 |
| public/source/react-bits-card-swap.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（26118 bytes）。不证明组件运行行为。 |
| public/source/react-bits-carousel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（44846 bytes）。不证明组件运行行为。 |
| public/source/react-bits-chroma-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（36925 bytes）。不证明组件运行行为。 |
| public/source/react-bits-circular-gallery.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（102282 bytes）。不证明组件运行行为。 |
| public/source/react-bits-circular-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（15326 bytes）。不证明组件运行行为。 |
| public/source/react-bits-click-spark.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18142 bytes）。不证明组件运行行为。 |
| public/source/react-bits-code-slots.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（80369 bytes）。不证明组件运行行为。 |
| public/source/react-bits-color-bends.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48218 bytes）。不证明组件运行行为。 |
| public/source/react-bits-comet-dial.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（60575 bytes）。不证明组件运行行为。 |
| public/source/react-bits-conveyor-gallery.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35137 bytes）。不证明组件运行行为。 |
| public/source/react-bits-count-up.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（12677 bytes）。不证明组件运行行为。 |
| public/source/react-bits-counter.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21241 bytes）。不证明组件运行行为。 |
| public/source/react-bits-crosshair.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27130 bytes）。不证明组件运行行为。 |
| public/source/react-bits-crtwarp.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（50335 bytes）。不证明组件运行行为。 |
| public/source/react-bits-cubes.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（51239 bytes）。不证明组件运行行为。 |
| public/source/react-bits-cursor-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（42204 bytes）。不证明组件运行行为。 |
| public/source/react-bits-curved-input.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（83468 bytes）。不证明组件运行行为。 |
| public/source/react-bits-curved-loop.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20963 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dark-veil.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52344 bytes）。不证明组件运行行为。 |
| public/source/react-bits-decay-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（24020 bytes）。不证明组件运行行为。 |
| public/source/react-bits-decrypted-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52279 bytes）。不证明组件运行行为。 |
| public/source/react-bits-depth-carousel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（71883 bytes）。不证明组件运行行为。 |
| public/source/react-bits-depth-lift-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（30813 bytes）。不证明组件运行行为。 |
| public/source/react-bits-depth-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（31205 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dither-veil.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（115268 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dither.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（46298 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dock.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（23876 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dodge-field.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（45810 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dome-gallery.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（137470 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dot-field.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（37627 bytes）。不证明组件运行行为。 |
| public/source/react-bits-dot-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（36895 bytes）。不证明组件运行行为。 |
| public/source/react-bits-drift-wall.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（56810 bytes）。不证明组件运行行为。 |
| public/source/react-bits-echo-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（42103 bytes）。不证明组件运行行为。 |
| public/source/react-bits-elastic-mesh.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（78254 bytes）。不证明组件运行行为。 |
| public/source/react-bits-elastic-slider.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（29274 bytes）。不证明组件运行行为。 |
| public/source/react-bits-elastic-tabs.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（22987 bytes）。不证明组件运行行为。 |
| public/source/react-bits-electric-border.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（45331 bytes）。不证明组件运行行为。 |
| public/source/react-bits-electric-logo.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（153038 bytes）。不证明组件运行行为。 |
| public/source/react-bits-evil-eye.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（39553 bytes）。不证明组件运行行为。 |
| public/source/react-bits-fade-content.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11482 bytes）。不证明组件运行行为。 |
| public/source/react-bits-falling-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27548 bytes）。不证明组件运行行为。 |
| public/source/react-bits-faulty-terminal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52993 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ferrofluid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48910 bytes）。不证明组件运行行为。 |
| public/source/react-bits-flex-carousel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（197928 bytes）。不证明组件运行行为。 |
| public/source/react-bits-flip-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52837 bytes）。不证明组件运行行为。 |
| public/source/react-bits-floating-lines.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66350 bytes）。不证明组件运行行为。 |
| public/source/react-bits-flowing-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（29045 bytes）。不证明组件运行行为。 |
| public/source/react-bits-fluid-glass.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（45224 bytes）。不证明组件运行行为。 |
| public/source/react-bits-flying-posters.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（65728 bytes）。不证明组件运行行为。 |
| public/source/react-bits-fold-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（37839 bytes）。不证明组件运行行为。 |
| public/source/react-bits-folder-float.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（84861 bytes）。不证明组件运行行为。 |
| public/source/react-bits-folder.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27676 bytes）。不证明组件运行行为。 |
| public/source/react-bits-fuse-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（59147 bytes）。不证明组件运行行为。 |
| public/source/react-bits-fuzzy-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（46633 bytes）。不证明组件运行行为。 |
| public/source/react-bits-galaxy.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47090 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ghost-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（74899 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ghost-fibers.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（56555 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glare-hover.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（12277 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glass-icons.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（14672 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glass-surface.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49409 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glide-select.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（68565 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glitch-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（16169 bytes）。不证明组件运行行为。 |
| public/source/react-bits-glow-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（56438 bytes）。不证明组件运行行为。 |
| public/source/react-bits-gooey-nav.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（45801 bytes）。不证明组件运行行为。 |
| public/source/react-bits-gradient-blinds.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（54561 bytes）。不证明组件运行行为。 |
| public/source/react-bits-gradient-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18672 bytes）。不证明组件运行行为。 |
| public/source/react-bits-gradient-waves.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49363 bytes）。不证明组件运行行为。 |
| public/source/react-bits-gradual-blur.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（41252 bytes）。不证明组件运行行为。 |
| public/source/react-bits-grainient.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（44890 bytes）。不证明组件运行行为。 |
| public/source/react-bits-grid-distortion.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34561 bytes）。不证明组件运行行为。 |
| public/source/react-bits-grid-motion.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18548 bytes）。不证明组件运行行为。 |
| public/source/react-bits-grid-scan.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（133963 bytes）。不证明组件运行行为。 |
| public/source/react-bits-halftone-reveal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（51552 bytes）。不证明组件运行行为。 |
| public/source/react-bits-hold-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66857 bytes）。不证明组件运行行为。 |
| public/source/react-bits-hyperspeed.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（176696 bytes）。不证明组件运行行为。 |
| public/source/react-bits-image-trail.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（184000 bytes）。不证明组件运行行为。 |
| public/source/react-bits-infinite-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（143778 bytes）。不证明组件运行行为。 |
| public/source/react-bits-infinite-spiral.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48239 bytes）。不证明组件运行行为。 |
| public/source/react-bits-iridescence.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（16698 bytes）。不证明组件运行行为。 |
| public/source/react-bits-jelly-radio.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（41535 bytes）。不证明组件运行行为。 |
| public/source/react-bits-kinetic-tiles.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（26497 bytes）。不证明组件运行行为。 |
| public/source/react-bits-lanyard.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49523 bytes）。不证明组件运行行为。 |
| public/source/react-bits-laser-flow.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（94681 bytes）。不证明组件运行行为。 |
| public/source/react-bits-lattice-loader.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48413 bytes）。不证明组件运行行为。 |
| public/source/react-bits-letter-glitch.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34796 bytes）。不证明组件运行行为。 |
| public/source/react-bits-light-pillar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（61522 bytes）。不证明组件运行行为。 |
| public/source/react-bits-light-rays.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（57971 bytes）。不证明组件运行行为。 |
| public/source/react-bits-light-tunnel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（58087 bytes）。不证明组件运行行为。 |
| public/source/react-bits-lightfall.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（50230 bytes）。不证明组件运行行为。 |
| public/source/react-bits-lightning.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27928 bytes）。不证明组件运行行为。 |
| public/source/react-bits-line-sidebar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34358 bytes）。不证明组件运行行为。 |
| public/source/react-bits-line-waves.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（39037 bytes）。不证明组件运行行为。 |
| public/source/react-bits-liquid-action.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（33715 bytes）。不证明组件运行行为。 |
| public/source/react-bits-liquid-chrome.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（24127 bytes）。不证明组件运行行为。 |
| public/source/react-bits-liquid-ether.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（173965 bytes）。不证明组件运行行为。 |
| public/source/react-bits-logo-loop.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（67063 bytes）。不证明组件运行行为。 |
| public/source/react-bits-magic-bento.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（111950 bytes）。不证明组件运行行为。 |
| public/source/react-bits-magic-rings.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（43924 bytes）。不证明组件运行行为。 |
| public/source/react-bits-magnet-lines.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（11683 bytes）。不证明组件运行行为。 |
| public/source/react-bits-magnet.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10239 bytes）。不证明组件运行行为。 |
| public/source/react-bits-masked-heading.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47119 bytes）。不证明组件运行行为。 |
| public/source/react-bits-masonry.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（32290 bytes）。不证明组件运行行为。 |
| public/source/react-bits-meta-balls.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（39736 bytes）。不证明组件运行行为。 |
| public/source/react-bits-metallic-paint.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（69682 bytes）。不证明组件运行行为。 |
| public/source/react-bits-micro-slats.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（133853 bytes）。不证明组件运行行为。 |
| public/source/react-bits-model-viewer.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（68369 bytes）。不证明组件运行行为。 |
| public/source/react-bits-molten-metal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47123 bytes）。不证明组件运行行为。 |
| public/source/react-bits-mono-command.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（30256 bytes）。不证明组件运行行为。 |
| public/source/react-bits-morph-slider.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（105070 bytes）。不证明组件运行行为。 |
| public/source/react-bits-neon-toggle.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21962 bytes）。不证明组件运行行为。 |
| public/source/react-bits-noise.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（9024 bytes）。不证明组件运行行为。 |
| public/source/react-bits-option-wheel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48870 bytes）。不证明组件运行行为。 |
| public/source/react-bits-orb.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47237 bytes）。不证明组件运行行为。 |
| public/source/react-bits-orbit-images.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（42302 bytes）。不证明组件运行行为。 |
| public/source/react-bits-orbit-slider.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（24492 bytes）。不证明组件运行行为。 |
| public/source/react-bits-orbit-stage.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（41796 bytes）。不证明组件运行行为。 |
| public/source/react-bits-origami-nav.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20857 bytes）。不证明组件运行行为。 |
| public/source/react-bits-paper-crumple.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（194927 bytes）。不证明组件运行行为。 |
| public/source/react-bits-paper-note.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21471 bytes）。不证明组件运行行为。 |
| public/source/react-bits-particle-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（64835 bytes）。不证明组件运行行为。 |
| public/source/react-bits-particles.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（31907 bytes）。不证明组件运行行为。 |
| public/source/react-bits-peek-rating.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（56257 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pill-nav.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66763 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-blast.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（94245 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35862 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-meter.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18746 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-snow.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（50019 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-swap.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（60514 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-trail.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20585 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pixel-transition.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20035 bytes）。不证明组件运行行为。 |
| public/source/react-bits-plasma-wave.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34647 bytes）。不证明组件运行行为。 |
| public/source/react-bits-plasma.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49188 bytes）。不证明组件运行行为。 |
| public/source/react-bits-postcard-flip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（25697 bytes）。不证明组件运行行为。 |
| public/source/react-bits-prism-deck.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（32499 bytes）。不证明组件运行行为。 |
| public/source/react-bits-prism.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（58374 bytes）。不证明组件运行行为。 |
| public/source/react-bits-prismatic-burst.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（65923 bytes）。不证明组件运行行为。 |
| public/source/react-bits-profile-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（101796 bytes）。不证明组件运行行为。 |
| public/source/react-bits-prompt-bar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（151539 bytes）。不证明组件运行行为。 |
| public/source/react-bits-pulse-heart.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（52805 bytes）。不证明组件运行行为。 |
| public/source/react-bits-radar.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（31314 bytes）。不证明组件运行行为。 |
| public/source/react-bits-refine-frame.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（64575 bytes）。不证明组件运行行为。 |
| public/source/react-bits-reflective-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35678 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ribbon-badge.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（18410 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ribbons.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34289 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ripple-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（17699 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ripple-distortion.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（62988 bytes）。不证明组件运行行为。 |
| public/source/react-bits-ripple-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（43759 bytes）。不证明组件运行行为。 |
| public/source/react-bits-rotating-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（31156 bytes）。不证明组件运行行为。 |
| public/source/react-bits-rubber-segment.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（63403 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scanner.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（54658 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scrambled-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10154 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-expand.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（39600 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-float.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10337 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-reveal.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（13449 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-stack.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47199 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-theater.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（34415 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scroll-velocity.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20644 bytes）。不证明组件运行行为。 |
| public/source/react-bits-scrub-field.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（65869 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shape-blur.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35216 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shape-grid.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66924 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shape-waves.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（140603 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shiny-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（17834 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shredder.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（147612 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shuffle.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（71737 bytes）。不证明组件运行行为。 |
| public/source/react-bits-shutter-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（31743 bytes）。不证明组件运行行为。 |
| public/source/react-bits-side-rays.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（38427 bytes）。不证明组件运行行为。 |
| public/source/react-bits-silk.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（20932 bytes）。不证明组件运行行为。 |
| public/source/react-bits-sliced-waves.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（48915 bytes）。不证明组件运行行为。 |
| public/source/react-bits-slide-commit.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（73325 bytes）。不证明组件运行行为。 |
| public/source/react-bits-sling-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（73449 bytes）。不证明组件运行行为。 |
| public/source/react-bits-slosh-gauge.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49775 bytes）。不证明组件运行行为。 |
| public/source/react-bits-soft-aurora.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（41671 bytes）。不证明组件运行行为。 |
| public/source/react-bits-specular-button.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（43750 bytes）。不证明组件运行行为。 |
| public/source/react-bits-splash-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（167697 bytes）。不证明组件运行行为。 |
| public/source/react-bits-split-flap-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（60514 bytes）。不证明组件运行行为。 |
| public/source/react-bits-split-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21843 bytes）。不证明组件运行行为。 |
| public/source/react-bits-spotlight-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（7767 bytes）。不证明组件运行行为。 |
| public/source/react-bits-spring-accordion.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21787 bytes）。不证明组件运行行为。 |
| public/source/react-bits-spring-check.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35635 bytes）。不证明组件运行行为。 |
| public/source/react-bits-squish-switch.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35577 bytes）。不证明组件运行行为。 |
| public/source/react-bits-stack.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（26581 bytes）。不证明组件运行行为。 |
| public/source/react-bits-staggered-menu.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（99742 bytes）。不证明组件运行行为。 |
| public/source/react-bits-star-border.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（10948 bytes）。不证明组件运行行为。 |
| public/source/react-bits-status-mark.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（41173 bytes）。不证明组件运行行为。 |
| public/source/react-bits-stepper.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（44756 bytes）。不证明组件运行行为。 |
| public/source/react-bits-sticker-peel.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（54609 bytes）。不证明组件运行行为。 |
| public/source/react-bits-strands.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（47771 bytes）。不证明组件运行行为。 |
| public/source/react-bits-stroke-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（35214 bytes）。不证明组件运行行为。 |
| public/source/react-bits-swarm-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（82430 bytes）。不证明组件运行行为。 |
| public/source/react-bits-swipe-row.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（79113 bytes）。不证明组件运行行为。 |
| public/source/react-bits-swipe-toast.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（70045 bytes）。不证明组件运行行为。 |
| public/source/react-bits-target-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（66050 bytes）。不证明组件运行行为。 |
| public/source/react-bits-tear-ticket.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（114731 bytes）。不证明组件运行行为。 |
| public/source/react-bits-tech-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（105495 bytes）。不证明组件运行行为。 |
| public/source/react-bits-terminal-status.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（17235 bytes）。不证明组件运行行为。 |
| public/source/react-bits-text-cursor.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（21087 bytes）。不证明组件运行行为。 |
| public/source/react-bits-text-loop.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（32485 bytes）。不证明组件运行行为。 |
| public/source/react-bits-text-pressure.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（30954 bytes）。不证明组件运行行为。 |
| public/source/react-bits-text-type.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（23881 bytes）。不证明组件运行行为。 |
| public/source/react-bits-thought-line.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（61795 bytes）。不证明组件运行行为。 |
| public/source/react-bits-threads.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（38342 bytes）。不证明组件运行行为。 |
| public/source/react-bits-tilted-card.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（19526 bytes）。不证明组件运行行为。 |
| public/source/react-bits-toast-stack.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27897 bytes）。不证明组件运行行为。 |
| public/source/react-bits-topography.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（54528 bytes）。不证明组件运行行为。 |
| public/source/react-bits-true-focus.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（22403 bytes）。不证明组件运行行为。 |
| public/source/react-bits-variable-proximity.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（27440 bytes）。不证明组件运行行为。 |
| public/source/react-bits-vinyl-deck.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（24153 bytes）。不证明组件运行行为。 |
| public/source/react-bits-voice-pill.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（80919 bytes）。不证明组件运行行为。 |
| public/source/react-bits-wake-slider.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（40949 bytes）。不证明组件运行行为。 |
| public/source/react-bits-warm-tooltip.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（98836 bytes）。不证明组件运行行为。 |
| public/source/react-bits-warp-text.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（75013 bytes）。不证明组件运行行为。 |
| public/source/react-bits-waves.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（49155 bytes）。不证明组件运行行为。 |
| public/source/react-bits-web-threads.json | 真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（54745 bytes）。不证明组件运行行为。 |
| scripts/capture-site.cjs | captured images.length == 8，图片文件存在；初次会话未打开、二次选择器错误记录保留。只证明 UI 截图取得。 |
| scripts/check-layout.cjs | 14 路由 × 3 宽度 = 42；scroll <= client + 1 且 controls == 0。 |
| scripts/check-site-assets.mjs | HTTP 数据一致性检查：731/731，真实端点 body/JSON == 磁盘产物。首次错误检查保留。 |
| scripts/collect-site-evidence.mjs | npm run evidence 读取上述具体字段，逐文件计算 SHA；证据行数 == git diff 文件数。不是新增组件行为测试。 |
| scripts/prerender.mjs | 逐地址 HTML 生成：rows.length == 8 + catalog.entries.length == 369，h1 与 data-route 字段断言。 |
| scripts/run-browser-checks.mjs | npm run check:browser 退出 0，读取 total/failed/skipped/errors；三个 suite 合计 82/82。 |
| scripts/sync-library.mjs | 同步和逐文件校验：check:reuse 输出 copied == 18、byteIdentical == 33、payloadEqual == 361、failed == skipped == 0。 |
| scripts/verify-demos.cjs | 15/15 演示挂载及六类附加交互状态；具体 assertions.actual == expected。 |
| scripts/verify-site.cjs | 浏览器工作流：25/25，具体 assertions.actual == expected；包含真实同端点 503 故障注入。 |
| src/App.jsx | 共享导航、路由与动效开关：global motion pause keeps card and content still; guide pages have separate paths and content; 404 unknown page and unknown component recover; mobile menu routes and Escape focus。 |
| src/Demo.jsx | 15 个真实演示挂载：demos total == passed == 15；真实子节点宽度 > 0、data-ready == true 且 inert == false；缺失客户端脚本时便笺 inert == true 且不能取得焦点；恢复后输入只含新文本。全部参数未覆盖。 |
| src/context.jsx | 会话主题、便笺、点击与 reduced-motion：live reduced-motion preference; styles preserve draft through theme and route changes。刷新持久化未提供。 |
| src/data/catalog.json | 生成给网站用的 361 项目录：deepEqual(网站目录,原库读取结果); public/catalog.json == src/data/catalog.json；来源过滤计数断言。 |
| src/entry-server.jsx | 服务端渲染：prerender total == 369、h1 存在、data-route == 地址；HTTP body SHA == 对应文件 SHA。 |
| src/lib/utils.ts | Aceternity 所需 cn 工具；进入构建，首页 Bento 组合渲染。未单独验证，理由=无 cn 输入矩阵测试，构建不证明 class 冲突合并语义。 |
| src/main.jsx | 客户端启动与物理页面匹配：369 个 HTTP body == 对应文件；42 个 Chromium 路由/宽度采样未捕获 pageerror。未逐个浏览器加载全部 369 地址。 |
| src/pages/About.jsx | 产品介绍与 BeamPath 组合：about 物理 HTML == HTTP body；3 个宽度布局采样；BeamPath 演示字段断言；介绍文案未做行为测试。 |
| src/pages/Catalog.jsx | 目录搜索、分类、来源、分页与 URL：catalog source filters; catalog search, zero results and recovery; catalog pagination and category; search survives component navigation and browser back。 |
| src/pages/Detail.jsx | 真实源码、参数、下载与异常恢复：catalog source filters; real source tabs variants and CSS pairing; clipboard contains actual selected source; downloaded CSS equals served source; AI brief contains selected files and real endpoint; local props are actual metadata; source load failure retains page and retries; source-only upstream entry has honest preview and real code; catalog JSON download contains all entries；503 注入触发 alert、AI 按钮 disabled，并恢复真实源包。 |
| src/pages/Docs.jsx | 四个指南地址及目录下载：；许可原文 SHA 比对。许可链接未做点击下载专项测试。 |
| src/pages/Home.jsx | 产品首屏与模块组合：homepage 3D pointer interaction; homepage rotating content; global motion pause keeps card and content still; ConveyorGallery real continuous movement and pause; FAQ opens and routes to guide；R5 首页截图仅证明 UI。 |
| src/pages/NotFound.jsx | 未知地址恢复：404 unknown page and unknown component recover；没有 HTTP 404 状态承诺。 |
| src/pages/Styles.jsx | 四主题、便笺和按钮体验：styles preserve draft through theme and route changes。 |
| src/styles.css | 整体排版和主题样式：42 个宽度/路由字段断言 scrollWidth <= clientWidth + 1、未命名可见按钮 == 0；主题背景颜色字段断言。未逐条覆盖 CSS 规则。 |
| src/ui.jsx | 组件化导航按钮及文字链接：FAQ opens and routes to guide; 404 unknown page and unknown component recover；Brand/Closing 像素仅见本轮截图，未逐个单独断言。 |
| src/vendor/3d-card.tsx | 原库副本：SHA(src/vendor/3d-card.tsx) == SHA(aceternity/by-paradigm/01-static-visual/3d-card/components/ui/3d-card.tsx) == ec2f994a294aa81bb10d8a4a8512e1d9d90acdccf2fb1c8eadf83874c5be34e8; 首页 UI 组合渲染与布局采样。所有可选参数和失败分支未单独验证。 |
| src/vendor/ApertureReveal.css | 原库副本：SHA(src/vendor/ApertureReveal.css) == SHA(react-bits/src/content/Components/ApertureReveal/ApertureReveal.css) == e3f9ef39bfb1dd794128b5de49139f4747a0ac5925eb26a67b00d287b9aa1ca7; demo ApertureReveal: 5 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/ApertureReveal.jsx | 原库副本：SHA(src/vendor/ApertureReveal.jsx) == SHA(react-bits/src/content/Components/ApertureReveal/ApertureReveal.jsx) == 4fb25100c42196a04f9a8860080cc847b700b3d378155a7e9b26acc44f66c79c; demo ApertureReveal: 5 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/ArcadeButton.css | 原库副本：SHA(src/vendor/ArcadeButton.css) == SHA(react-bits/src/content/Micro/ArcadeButton/ArcadeButton.css) == 01d47af286db42dd46ef5a7a7c2f7ff6db4ed68c340a6d151b1d048e43b14aaf; demo ArcadeButton: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/ArcadeButton.jsx | 原库副本：SHA(src/vendor/ArcadeButton.jsx) == SHA(react-bits/src/content/Micro/ArcadeButton/ArcadeButton.jsx) == 50c8b2c5f675f1f6a6507569eb9c02d38cfa464799cc153bab6d08a43d618f0f; demo ArcadeButton: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/BeamPath.css | 原库副本：SHA(src/vendor/BeamPath.css) == SHA(react-bits/src/content/Components/BeamPath/BeamPath.css) == 32942e87e3a4240983fd140530d4bce9870c60da9db060bdae4e0ad6a7e5ad58; demo BeamPath: 5 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/BeamPath.jsx | 原库副本：SHA(src/vendor/BeamPath.jsx) == SHA(react-bits/src/content/Components/BeamPath/BeamPath.jsx) == 651927a91efb4b1921d2ffe574384a0a4fd6b46a538a7e1133421461fcfc52ab; demo BeamPath: 5 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/ConveyorGallery.css | 原库副本：SHA(src/vendor/ConveyorGallery.css) == SHA(react-bits/src/content/Components/ConveyorGallery/ConveyorGallery.css) == a24daeb5cf396cc5ac513156c4f051be59dfdd940bd386bce3b12d77c51f885a; demo ConveyorGallery: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/ConveyorGallery.jsx | 原库副本：SHA(src/vendor/ConveyorGallery.jsx) == SHA(react-bits/src/content/Components/ConveyorGallery/ConveyorGallery.jsx) == 67ab8dd8db8ace3ab199efb1638d3d9043edf7b5729e3b733bd0a542e3b02364; demo ConveyorGallery: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/DepthLiftCard.css | 原库副本：SHA(src/vendor/DepthLiftCard.css) == SHA(react-bits/src/content/Components/DepthLiftCard/DepthLiftCard.css) == df9dbce6a356b4f4b59e58c516afb13ccf8990a1c8c20e219eb69534318dcbbb; demo DepthLiftCard: 5 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/DepthLiftCard.jsx | 原库副本：SHA(src/vendor/DepthLiftCard.jsx) == SHA(react-bits/src/content/Components/DepthLiftCard/DepthLiftCard.jsx) == dd29d2e3560b877e1e5ae552e9ff69e8ea95ca5780285ca7b3f549b0fbc89adf; demo DepthLiftCard: 5 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/ElasticTabs.css | 原库副本：SHA(src/vendor/ElasticTabs.css) == SHA(react-bits/src/content/Micro/ElasticTabs/ElasticTabs.css) == f1950f2aa0c2fd4f6fd9a1837a338ef82161ad797a90263aa4ad13e81761017a; demo ElasticTabs: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/ElasticTabs.jsx | 原库副本：SHA(src/vendor/ElasticTabs.jsx) == SHA(react-bits/src/content/Micro/ElasticTabs/ElasticTabs.jsx) == 1a75ae482899124c19397b2c1cd8095c0c9610766b98b2926ec1c5501fec5931; demo ElasticTabs: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/KineticTiles.css | 原库副本：SHA(src/vendor/KineticTiles.css) == SHA(react-bits/src/content/Components/KineticTiles/KineticTiles.css) == 4289d446dc9388a9a6e5d3fc6399c14d999f54118557299fa678e01e263cbe23; demo KineticTiles: 5 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/KineticTiles.jsx | 原库副本：SHA(src/vendor/KineticTiles.jsx) == SHA(react-bits/src/content/Components/KineticTiles/KineticTiles.jsx) == 2296bf43ee91777b92f718dadec56c8e80cb5f6764f3d7577d880013f63ab7f6; demo KineticTiles: 5 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/LiquidAction.css | 原库副本：SHA(src/vendor/LiquidAction.css) == SHA(react-bits/src/content/Components/LiquidAction/LiquidAction.css) == b81435f40e0d71067372978f775dc23011e793e1facc29f1905e2ced8d6ddfae; demo LiquidAction: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/LiquidAction.jsx | 原库副本：SHA(src/vendor/LiquidAction.jsx) == SHA(react-bits/src/content/Components/LiquidAction/LiquidAction.jsx) == 8f84f78c5cafb14a81dfc0e04584facd279d235a0004e35105053944309023a0; demo LiquidAction: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/OrbitStage.css | 原库副本：SHA(src/vendor/OrbitStage.css) == SHA(react-bits/src/content/Components/OrbitStage/OrbitStage.css) == 7006d4e52b973a6b3b7f64b8b2fa6ded7611088c4ec12f6863e846e4cab428ae; demo OrbitStage: 6 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/OrbitStage.jsx | 原库副本：SHA(src/vendor/OrbitStage.jsx) == SHA(react-bits/src/content/Components/OrbitStage/OrbitStage.jsx) == b9c441aa28bc0bb279ba401c357aeb9ff9f0ec64993e3dd82cddc9fe817dec2e; demo OrbitStage: 6 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/PaperNote.css | 原库副本：SHA(src/vendor/PaperNote.css) == SHA(react-bits/src/content/Micro/PaperNote/PaperNote.css) == b3357eb13f854f1b4f19002a2deea2f07159be37a068f85be2194db6a3cedf48; demo PaperNote: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/PaperNote.jsx | 原库副本：SHA(src/vendor/PaperNote.jsx) == SHA(react-bits/src/content/Micro/PaperNote/PaperNote.jsx) == ed5ef185237578a11c01ec1b12dd9084a5d6b7859a74cfee4a314eba3be684ee; demo PaperNote: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/PrismDeck.css | 原库副本：SHA(src/vendor/PrismDeck.css) == SHA(react-bits/src/content/Components/PrismDeck/PrismDeck.css) == 7c08be7400bc07766aa39d1ad95483128f0081b215fa79ec547d030a2c14048b; demo PrismDeck: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/PrismDeck.jsx | 原库副本：SHA(src/vendor/PrismDeck.jsx) == SHA(react-bits/src/content/Components/PrismDeck/PrismDeck.jsx) == f51e0bad03e93dff47343fe89168f4537ca073ee4ebdbdf45a3e854d7cccd839; demo PrismDeck: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/RippleButton.css | 原库副本：SHA(src/vendor/RippleButton.css) == SHA(react-bits/src/content/Micro/RippleButton/RippleButton.css) == 7154a278fca3ab450ec6cc497f974cbcd543770d97adc5c015857f7fcd552509; demo RippleButton: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/RippleButton.jsx | 原库副本：SHA(src/vendor/RippleButton.jsx) == SHA(react-bits/src/content/Micro/RippleButton/RippleButton.jsx) == 646fbcace30ed8d4c348d928a98cf2693287f0eed7001e062c81a3ab5019fd9c; demo RippleButton: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/RotatingText.css | 原库副本：SHA(src/vendor/RotatingText.css) == SHA(react-bits/src/content/TextAnimations/RotatingText/RotatingText.css) == d7eaee32661138bc9ec9de146b45407edcb9aff53f7b1065ece971ea16462ea5; demo RotatingText: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/RotatingText.jsx | 原库副本：SHA(src/vendor/RotatingText.jsx) == SHA(react-bits/src/content/TextAnimations/RotatingText/RotatingText.jsx) == 0dd9e9aa839c606171667ca5d3db2f6ef6b23c6ce8dc499eead6d71188633ecf; demo RotatingText: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/ScrollTheater.css | 原库副本：SHA(src/vendor/ScrollTheater.css) == SHA(react-bits/src/content/Components/ScrollTheater/ScrollTheater.css) == 80a0d61d22960cf3244bd6751e9d76f7c9ca45133911f6cf82145505a202f1df; demo ScrollTheater: 6 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/ScrollTheater.jsx | 原库副本：SHA(src/vendor/ScrollTheater.jsx) == SHA(react-bits/src/content/Components/ScrollTheater/ScrollTheater.jsx) == e884b7a94bc37c1489b3e245edd8a61794079ac310b05d7c2d9c4ce587646769; demo ScrollTheater: 6 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/SpringAccordion.css | 原库副本：SHA(src/vendor/SpringAccordion.css) == SHA(react-bits/src/content/Micro/SpringAccordion/SpringAccordion.css) == 877e910298e4f00591c510c017e0ab54de5de8068ac95ca12956e33de9599e32; demo SpringAccordion: 3 个字段断言。CSS 各条规则未逐项单独断言。 |
| src/vendor/SpringAccordion.jsx | 原库副本：SHA(src/vendor/SpringAccordion.jsx) == SHA(react-bits/src/content/Micro/SpringAccordion/SpringAccordion.jsx) == 5d00b7fe0a7842f2bf5e6aba4130fe0240b44d61480ca39139ad8ddf9738d2cb; demo SpringAccordion: 3 个字段断言。所有可选参数和失败分支未单独验证。 |
| src/vendor/bento-grid.tsx | 原库副本：SHA(src/vendor/bento-grid.tsx) == SHA(aceternity/by-paradigm/01-static-visual/bento-grid/components/ui/bento-grid.tsx) == a3cdb12c2f3183385859da768cd5a66a4024dd017230fb278b8f2d2acf85c730; 首页 UI 组合渲染与布局采样。所有可选参数和失败分支未单独验证。 |
| src/vendor/pointer-highlight.tsx | 原库副本：SHA(src/vendor/pointer-highlight.tsx) == SHA(aceternity/by-paradigm/03-enter-exit/pointer-highlight/components/ui/pointer-highlight.tsx) == e32a56b7eeb6dc4bfe8c05bc7c025310f26ab3d43aba6bbb22813b1a47960dc0; 首页 UI 组合渲染与布局采样。所有可选参数和失败分支未单独验证。 |
| vite.config.js | 独立 HTML 预览路由：首次 368 个子地址回退首页，修正后 369/369 body SHA == 物理文件 SHA；不证明远程托管行为。 |
