# 组件库工作账本

## R2 · 2026-09-30 · 扩展可复用组件库

状态：部分完成（本地构建与 Chromium 行为有证据；下列未覆盖范围没有验收结论）。首次产生轮次：本轮组件库扩展 R2。

需求锚点：用户要求“主要是给组件库里面加东西”“之后的 AI 可以直接从组件库里面取来使用”“很多风格迥异的组件”。本轮作用目录是 `X:/myui/react-bits`，没有继续修改 `../pulsar`。放弃“在试验场页面继续拼接模块”的解释：其结果是页面专属功能，不能满足独立源码复用。

产物：18 个组件、72 个实现、36 份 CSS、18 份独立文档示例、18 份原始源码/使用元数据、72 个本地安装包。源码由 `scripts/local-collection/` 的定义生成。AI 入口为 `AGENTS.md`、`AI-COMPONENTS.md`、`src/constants/LocalCollection.js` 和 `public/llms.txt`。本地新增项明确标为 local，没有官网发布。

### 命题与执行证据

环境：Windows，Node 24.13.1，React 19.1.1，Motion 12，Vite 5.4.21；浏览器为本机 Chromium。预览端口 5290；正常调用方端口 5291；独立真实安装项目端口 5292。

| 命题 X；待证命题 Y；关系 | 命令 / 结果 | 可证伪字段 |
| --- | --- | --- |
| X=四种实现的行为 token 相同、独立导入契约和 CSS 配对成立；Y=四份源码同步；同一件事，不能证明所有运行行为 | `node scripts/checkLocalCollection.mjs`，exit 0：18 components、72 implementations、72/72 parse/parity、18/18 CSS pairs | `new Set(behavior).size === 1`；CSS 文本相等；路由每项出现次数=1 |
| X=本轮 36 份 TS 文件通过严格类型检查；Y=这些文件类型无诊断；同一件事，不能证明 UI 行为 | `npx tsc -p tsconfig.local-collection.json`，exit 0，无诊断 | config.files 包含所有本轮 TS 文件；编译退出码=0 |
| X=默认值表与源码匹配；Y=标量默认值一致；同一件事，复杂描述默认值不在此命题 | `npm run check:prop-docs`，exit 0：229 components、229 tables、2807 scalar defaults、13 descriptive defaults excluded | 差异列表长度=0；基线 211/211/2687 → 229/229/2807 |
| X=原有检查器测试断言成立；Y=该检查器本环境可复跑；同一件事 | `npm run test:prop-docs`，exit 0：total=3/pass=3/fail=0/skipped=0/cancelled=0/todo=0 | 三个测试函数的公开 props、差异报告和 unsupported-signature 断言 |
| X=真实组件的选择、回调、边界、空内容、动态偏好与视口状态成立；Y=本轮列出的浏览器工况成立；同一件事 | `playwright-cli -s=library-collection run-code --filename=scripts/verifyLocalCollection.cjs --raw`，解析后门禁 exit 0：total=156/pass=156/fail=0/skipped=0，891 字段断言 | 包含 `aria-selected == true`、`callback == 'motion'`、最大范围值不增加、禁用后 calls==2、空列表控件数==0、外部受控重置==初值、停止后两次 transform/opacity 相等 |
| X=生产预览中示例、props 表和实际源码呈现；Y=18 个文档入口接入库；同一件事，仅 UI/源码呈现层 | `playwright-cli -s=library-docs run-code --filename=scripts/verifyLocalDocs.cjs --raw`，解析后门禁 exit 0：18/18，fail=0/skipped=0/page errors=0 | marker 有组件子节点；表包含 accent/className；pre 包含实际导出函数及用法 import；registry name/meta.origin/files 字段匹配 |
| X=安装包载荷等于源码；Y=本轮 72 个安装包携带正确源码；同一件事 | `node scripts/checkLocalRegistry.mjs`，exit 0：72/72 exact payloads，原有 844 包无 diff，CLI files=2/2，local canonical=18/18 | `file.content === source`；`file.target === '@components/'+file.path`；原有包改动列表==[] |
| X=真实 CLI 复制了相邻 TSX/CSS，独立项目渲染及回调成立；Y=该 TS-CSS 安装实例端到端成立；同一件事，其余 71 包没有逐一 CLI 安装 | 在独立目标项目中 `node <库>/node_modules/jsrepo/dist/bin.mjs add http://127.0.0.1:5290/r/ArcadeButton-TS-CSS --yes --overwrite`，exit 0；随后 `verifyInstalledCollection.cjs` 门禁 exit 0：5/5，fail=0/skipped=0 | CSS 背景==rgb(255,184,62)，字体==17px，指针后 count==1，键盘后 count==2，page errors==0 |
| X=metadata-only 修改触发 watcher，最终本地来源标识保留；Y=正常 dev 重建入口成立；同一件事，未证明失败/queued 分支 | `node scripts/watchRegistry.js` + 修改 `LocalCollection.js` mtime，门禁 exit 0：1/1，实际重建约 2.84 秒 | after_ticks > before_ticks 且 origin=='local'；日志第二次 `Registry rebuilt in 3000ms` |
| X=生产构建管线运行至 route meta；Y=组合构建成立；前置，不替代行为断言 | `npm run build`，exit 0：916 registry items/files、Vite built in 31.34s、460 route-meta pages；18 个新增项使用默认 OG 图片 | 构建退出码=0；输出组件总数=229；本地 canonical/RSS 字段另经检查 |
| X=本轮 JS/JSX/MJS/CJS 的 ESLint 没有诊断；Y=该文件集合 lint 无诊断；同一件事，不是全仓 lint | 对 `git diff --name-only` 的上述扩展名运行 `npx eslint --env node --max-warnings 0 <文件集合>`，exit 0，无输出 | 退出码=0、warnings=0；没有排除新增文件或变更文件 |

测试函数原名：`reads typed and wrapped props without treating internal defaults as public props`；`compares semantic scalar defaults and reports docs and variant drift`；`fails instead of silently skipping an unsupported component signature`。基线为 total=3/pass=2/fail=1/skipped=0；本轮仅将 Windows 路径拆分改为 `path.resolve(path.dirname(file), '../../../..')`，没有删测试或添加 skip/filter。

### 复现前置

先 `npm ci`、`node scripts/generateLocalCollection.mjs`、`node scripts/checkLocalCollection.mjs`、`npm run build`。端口 5290 用 `npx vite preview --host 127.0.0.1 --port 5290 --strictPort`。

`node scripts/createCollectionFixture.mjs` 创建忽略的开发调用方；启动 `npx vite --host 127.0.0.1 --port 5291 --strictPort` 后，Playwright CLI 先 open 该服务的 `/output/local-collection/index.html`，再执行脚本。调用方在 gitignore 目录中，重新生成后须重启 Vite，避免忽略目录的旧 CSS 缓存。

独立安装验证需在 `output/local-collection/installed` 创建 package.json，安装 React/React DOM/Motion，并创建 jsrepo 配置。真实安装后，根目录运行 `node scripts/createInstalledFixture.mjs`，在该独立目录启动 Vite 的 5292 端口。`checkLocalRegistry.mjs` 的前置包含该真实 CLI 安装和 dist 构建，缺少时会拒绝给出通过结论。

Playwright CLI 在本环境位于 `C:/Users/Abraham/AppData/Local/npm-cache/_npx/423231821c231c73/node_modules/@playwright/cli/playwright-cli.js`；脚本结果保存为 JSON 后，PowerShell 断言 failed==0、skipped==0、total==预期。CLI 可能在打印 Error 时返回 0，不能单看其进程退出码。

没有生产测试钩子、测试专用组件端点或 NODE_ENV 分支。调用方只传正常 props、操作原生 DOM/键盘、切换浏览器媒体偏好和视口位置。组件的真实 useInView/useSyncExternalStore 与事件处理路径被执行。

### 遇到的失败与修正

- 初始检查器测试在 Windows 失败 1/3：`file.split('/src/')` 无法分割反斜杠路径；改为平台无关路径解析后为 3/3。
- 首轮浏览器 100 项：73 pass/27 fail。26 项为样式表示差异，1 项为悬停位置影响比较。生成器展开重叠 font/border 简写；验证调用方的基础样式进入 base layer；比较前清空悬停/焦点状态。下一次因 Vite 缓存忽略目录中的旧 CSS 仍失败 26 项；重启后同组 100/100，再扩展工况至 156/156。原始失败记录保留。
- 文档首轮 17/18：ElasticTabs 内的 Code 标签与文档 Code 标签重名，严格定位器拒绝操作。定位文档 tabs 的 data-scope/data-part 后，18/18；没有改组件来绕过测试。
- 真实安装起初 URI 带 `.json` 被 jsrepo 当作不存在的 item 名；随后缺少目标项目 paths 配置。配置后安装器报成功，但 CSS 到 `@components`、源码到另一目录。对本地新增项给源码/CSS 同一显式 target，后续实际渲染回调 5/5。指南明确 jsrepo 3.2 的 literal alias 目录行为。
- 构建最初造成 844 个既有安装包的 CRLF/文件顺序 diff；加入换行与文件顺序规范化后，`original_items_unchanged=844`。watcher 原先直接调用 jsrepo 绕过规范化，本轮补接同一规范化步骤并监听 LocalCollection.js。
- RSS/route meta 原先会把新增本地项链接到官网；RSS 排除 local，canonical 使用本地 docsUrl。构建产生的既有 RSS 新日期/旧上游条目和 sitemap 日期改动已恢复为 HEAD，避免本轮更改无关生成文件；dist 的生成物仍来自最终构建。

### 未覆盖范围（本轮未触及的相关路径/测试/分支）

- 没有运行全仓 `npm run lint`，仅对本轮全部 JS/JSX/MJS/CJS 改动运行 ESLint；没有对既有全部 TS 文件运行全仓类型检查。
- 同语义的既有组件未读/未跑交互：`src/content/Micro/BellToggle/BellToggle.jsx`、`RubberSegment/RubberSegment.jsx`、`ScrubField/ScrubField.jsx`、`SwipeToast/SwipeToast.jsx`、`SquishSwitch/SquishSwitch.jsx` 及其其他版本。检索命令：`rg --files src/content/Micro | rg 'BellToggle|RubberSegment|ScrubField|SwipeToast|SquishSwitch'`。它们仍在默认值检查范围内，不能据此称其交互验收。
- 检索 `rg --files scripts src | rg '(test|spec)\.[cm]?[jt]sx?$'` 只有已跑的 checkPropDocs.test.js；没有本轮未跑的同语义现有测试函数。新增浏览器脚本列出的工况全部执行，没有跳过。
- 未验证 Firefox/Safari、真实手机触摸/读屏器、全部自定义配色对比度、任意长标签/嵌套业务内容、所有 CSS 属性的逐像素等价。样式 parity 比较的是 12 项 computed fields，390px 检查针对组件根边界。
- 11 类受控组件均跑外部重置；18 个文档的 Customize 控件没有全部逐个操作；Code 页面只检查当前展示版本，四种源码载荷通过独立 registry/parse/parity 检查。
- 只逐一真实 CLI 安装了 ArcadeButton-TS-CSS；其余 71 个包检查载荷、依赖、文件目标和索引，没有各自独立安装。没有运行 shadcn 安装器、官网部署或外部业务服务。
- watcher 的子进程失败、normalize 异常、并发 queued 分支没有故障注入；报告不声明这些失败路径验收。

### 本轮改动可能引入的新风险 / 已知取舍

- 新组件的 Tailwind utility 会受宿主未分层全局 CSS 影响；可换 CSS 版本或在宿主调整层级。自定义颜色不会自动保证对比度。
- 生成器会覆盖直接编辑的生成文件；必须改定义源并再生成。AI 指南已写明此约定。
- 本地新增 registry 项现在为源码和样式声明同一 @components 目标；jsrepo 3.2 与 shadcn 的别名解释不同，调用方需按指南定位/一起搬移文件。新版本安装器行为没有证据。
- dev watcher 新增同步规范化阶段；正常重建有字段证据，失败和排队路径没有注入覆盖。原有适配器在重建时短暂移除输出目录，开发请求可能短暂 404；本轮没有改成原子发布。
- 原生 UI 回调由调用方处理；TerminalStatus 是传入状态的展示、VinylDeck 无音频、BauhausStepper 不做流程校验。业务动作、持久化、鉴权与校验必须由消费项目提供。
- Vite 构建仍有既有大 chunk 警告；没有性能验收结论。18 个新增项没有视频/独立 OG 图片，使用默认图。

逐文件改动语义、证据和明确未单独验证项见 `LOCAL-COLLECTION-EVIDENCE.md`。内容指纹、mtime、构建日志和原始检查 JSON 在 `output/local-collection/`；输出目录忽略于 git，账本和逐文件报告保留于项目。

## R3 / 2026-09-30：参考 Aceternity，扩展主体动效

状态：部分完成；本机 Chromium 的所列工况有字段证据，跨浏览器、真实触摸、后台标签切换和多实例性能未覆盖。需求锚点是本轮用户“感觉不够动态，参考 ui.aceternity.com/components”；保留之前“给组件库加东西、之后 AI 直接取用”的范围。`../pulsar` 在本轮未编辑。

参考访问：浏览器打开官方组件目录和 Animated Tabs 文档，实际点击 Playground；原始截图 `output/local-collection/r3/reference-tabs.png`。官网搜索结果用于识别卡片分层、内容换位、SVG 路径和持续运动机制，参考链接 https://ui.aceternity.com/components、https://ui.aceternity.com/components/tabs。没有复制站点源码、图像或品牌资产。继续“只加强按钮/表单微反馈”的解释被放弃，因为其可观察后果仍然缺少主体连续运动；“修改试验场页面”的解释继续排除，因为其不能增加独立取用的库组件。

本轮新增：DepthLiftCard、PrismDeck、ApertureReveal、OrbitStage、ScrollTheater、BeamPath、KineticTiles、ConveyorGallery、LiquidAction、ShutterText。10 项共 40 份独立实现、20 份 CSS、10 份库文档、10 份源码用法元数据、40 个本地包。本地集合从 18/72 增到 28/112，整个组件目录从 229 增到 239；旧 144 份组件/demo/code 的字节 SHA 与 R2 指纹逐项相等。机器目录和 AI 指南有动态机制、风格、参数、四版本和安装入口；新增项尚未发布到官网。

### 命题与证据

环境：Windows、Node 24.13.1、实测运行 React 19.1.1/Motion 12.23.21、Vite 5.4.21、本机 Chromium；正常源码调用方 :5291，生产库预览 :5290，实际安装调用方 :5292。安装项目的 Motion 来自其既有 `^12.43.0` 依赖；不把该结果冒充锁定库版本的独立安装证明。源码调用方使用库锁定依赖。

| X；待证命题 Y；关系 | 命令、退出码、实际结果 | 具体字段/限制 |
| --- | --- | --- |
| X=四版本解析/逻辑/CSS配对；Y=生成物同步；同一件事，不替代运行 | `node scripts/generateLocalCollection.mjs`、`node scripts/checkLocalCollection.mjs` exit0：28项、112实现、parse/parity112/112、CSS pairs28/28 | `new Set(behavior).size===1`、stylesheet文本相等、catalog每项计数===1 |
| X=56本地TS文件无类型诊断；Y=这些文件类型检查；同一件事 | `npx tsc -p tsconfig.local-collection.json` exit0，无诊断 | files包含所有56份本地TS；既有其他TS不在此命题 |
| X=表格与源码标量默认值相等；Y=标量默认值一致；同一件事 | `npm run check:prop-docs` exit0：239组件/239表/2874标量，13描述默认值 excluded | 229/2807→239/2874；没有减少检查量；复杂内容不在此命题 |
| X=检查器的三个原测试；Y=检查器本环境；同一件事 | `npm run test:prop-docs` exit0：total3/pass3/fail0/skipped0/cancelled0/todo0 | 原函数名与 R2 一致，无删用例/跳过/过滤 |
| X=正常动态、事件、边界、空值、偏好/视口工况字段成立；Y=所列140工况；同一件事 | `verifyMotionCollection.cjs` 四批全量，每批35/35、fail0/skipped0/errors0，解析JSON门禁exit0；`node scripts/collectMotionEvidence.mjs` exit0：140/140、836字段 | 476行为字段 + 360根样式parity字段；变换矩阵改变、前景z>40、clip变化、dash offset改变、scene/tab/回调值、disabled不增加count、empty恢复、暂停前后实测字段相等。不是200/存在性替代运动 |
| X=10库路由实际预览/参数/源码/包；Y=十项文档接入；同一件事，仅呈现层 | `playwright-cli -s=library-docs run-code --filename=scripts/verifyMotionDocs.cjs --raw`，JSON门禁exit0：10/10、failed/skipped/errors0 | previewParts>=2、表有accent/className、实际导出/用法import、registry.name/origin/files字段；Customize未逐个操作 |
| X=112包精确载荷/目标/本地来源；Y=包内容一致；同一件事 | `node scripts/checkLocalRegistry.mjs` exit0：112/112、旧844包无diff、28本地canonical、local官方RSS guid0 | content===source、target===@components/文件名、每名称计数===1、origin===local |
| X=真实CLI安装的两个组件渲染/运动/回调/暂停；Y=这两个安装实例；同一件事 | 在实际安装项目目录运行 `node <repo>/node_modules/jsrepo/dist/bin.mjs add http://127.0.0.1:5290/r/BeamPath-TS-CSS --yes --overwrite` 和 LiquidAction 同命令，均exit0；`node scripts/createMotionInstalledFixture.mjs` exit0：4/4源码/CSS相等；`verifyMotionInstalled.cjs` JSON门禁exit0：7/7 | 实测背景rgb(13,25,23)、dash改变、pointer count1、Enter count2、暂停dash相等、pageerrors==[]；其余新38包未逐个CLI安装 |
| X=组合构建至route meta；Y=生产构建管线；前置，不替代行为 | `npm run build` exit0：956包、Vite产物、480route meta、28默认OG图 | build-verified.log；大chunk警告保留；无性能达标结论 |
| X=146个改动JS/JSX/MJS/CJS无lint诊断；Y=该集合lint；同一件事 | 对 `git diff --name-only` 的这些扩展名运行 `npx eslint --env node --max-warnings 0 <全部文件>` exit0，changed_JS_lint_files=146 | 不是全仓lint；没有按绿色集裁剪 |
| X=逐文件表与变更集相等、旧源码字节相等；Y=留痕覆盖；同一件事，不代表未来AI遵循 | `node scripts/collectMotionEvidence.mjs` exit0：file_evidence382/382、R2_source_SHA_unchanged144、guide_items28 | 文件集合来自整个git diff；每行有直接验证或历史/未验证限定；指纹含首次轮次/mtime/SHA |

没有生产测试钩子或 NODE_ENV 测试分支。公开 `data-part` 是四版本共用的样式定位接口；计时、事件、媒体偏好与 useInView 都执行实际组件代码。验证调用方只传公开props、操纵原生指针/键盘/滚动和浏览器媒体偏好。SVG clock 校验实际读取 computed strokeDashoffset，静态截图不能代替它。

### 复现与原始失败

先运行 `npm ci`、生成/结构检查、类型/默认值检查与 `npm run build`。`node scripts/createMotionFixture.mjs` 产生忽略的普通调用方。`npx vite --host 127.0.0.1 --port 5291 --strictPort`，然后 CLI open `http://127.0.0.1:5291/output/local-collection/r3/index.html`。

完整脚本包含 variants=[0,1,2,3]；为每批控制在一分钟内，依次把脚本文本的 `const variants=[0,1,2,3];` 替换为 `[0]`、`[1]`、`[2]`、`[3]`，写到忽略的 `verify-batch.cjs` 后运行 CLI run-code。四批并集就是全量140项，没有排除variant或用例。保存四份JSON并要求每批total==35、passed==35、failed==0、skipped==0、errors==[]；最后 collectMotionEvidence 合并并比较360个跨版本字段。本环境 CLI 路径沿用 R2 记录的 npm-cache 绝对路径，CLI 退出0本身不构成结果门禁。

生产 :5290 使用 `npx vite preview --host 127.0.0.1 --port 5290 --strictPort`。实际安装项目沿用 `output/local-collection/installed` 的依赖和安装器配置，只增加两个组件与 `motion-index.html/motion-main.jsx`，旧Arcade入口保留。从该安装项目目录启动库的 Vite CLI，显式 `--config <repo>/vite.config.js --host 127.0.0.1 --port 5292 --strictPort`；使用相同构建工具配置，组件源码/相邻CSS来自真正安装文件，页面没有主题/Tailwind样式依赖。open其 `motion-index.html` 后执行 verifyMotionInstalled。

- 初始长时运行的 Tailwind 检查误用命名CSS类定位，导致等待超时；运行中止，未记为通过。给新组件生成四版本一致的公开样式 `data-part` 后，用样式部位定位。后续四批全量，不保留只跑JS-CSS的解释。
- 首个可解析JS-CSS批次为34/35：BeamPath 的 `pathOffset` 放在style中没有改变SVG路径，computed offset一直0px。修正为 SVG pathLength=1 / strokeDasharray 与实际 strokeDashoffset MotionValue，原34/35保存在batch0.json，修正35/35保存在batch0-fixed.json；其余三批各35/35。
- 属性选择器的定义原先生成非法 `.class:[aria-selected]`；生成器分别写 `.class[aria-selected]` 和 Tailwind `[&[aria-selected]]:`。根样式360字段相等；不是对全部属性/选中态逐像素的证明。
- lint 初次146文件出现1个 ApertureRevealDemo children-prop 错误；改为标准嵌套children生成示例，重跑同146文件 exit0。消费组件行为源码不变。
- 最初把安装服务从库根目录启动，随后切换到实际安装项目目录；真正安装验证的URL/工作目录如上，7个字段来自后者，不引用错误服务启动作为证据。

真实录像 `motion-final.webm` 与其GIF `motion-preview.gif` 来自 captureMotionShowcase 的10项DOM/实际动作；不改变动画时间、不生成假帧。原视频39.8秒，GIF约4.23MB。10张截图与contact-sheet只证明UI呈现。

### 未覆盖范围（本轮未触及的相关路径/测试/分支）

- 全仓lint/全部既有TS、R2的156行为工况及18路由没有重跑；144份旧源码SHA相等，旧行为只沿用R2证据。默认值全目录239项与全部本地112包重新检查。
- 同语义既有组件仅阅读 TiltedCard、CardSwap、Dock、ScrollExpand 的部分实现；未读完/未跑 DepthCarousel、BorderGlow、SpotlightCard、ScrollStack、OrbitImages、RotatingText/TextLoop 及四版本交互。检索：`rg -n 'Tilt|Magnet|Carousel|Scroll|Reveal|Stack|Marquee|Beam|Parallax|Ripple|Glare' src/constants/Information.js` 与 `rg --files src/content`。
- 检索 `rg --files scripts src | rg '(test|spec)\\.[cm]?[jt]sx?$'` 只命中已运行的checkPropDocs.test.js；没有本轮未跑的同语义既有测试函数。新增140项全量无skip。
- 真实Firefox/Safari、手机触摸/读屏器、后台标签页visibilitychange分支、SSR/hydration、任意长标题或嵌套业务内容、全部自定义颜色对比度未验证；390px检查的是根边界，样式parity是12个根字段。
- 内置暂停按钮只在独立安装BeamPath中直接操作；其余连续组件验证了外部paused、实时减少动态、移出视口，但没有逐个点击内部暂停/恢复按钮或验证后台标签切换。自定义speed=0/负值在实现中冻结/归零，NaN四版本有工况；未逐个实测每个速度数值。
- 生产十个文档的Customize和四源码展示选项未逐个操作；真实CLI逐一新增安装只覆盖2个TS-CSS，剩余38包验证载荷/目标/依赖/来源，没有每包独立安装；shadcn安装器、官网发布没有运行。
- R2 watcher失败/queued/normalizer异常分支没有新增故障注入；本轮没有改这些路径。无外部业务动作、持久化或权限控制验收。

### 本轮改动可能引入的新风险 / 已知取舍

- 10项主体动效新增持续SVG/transform/filter更新；视口/偏好/外部暂停有字段证据，后台页面分支与多实例低端设备性能没有实测。SVG液态滤镜、3D、裁剪叠加可能增加绘制成本，本轮不声称性能指标。
- 生成器增加属性选择器和data-part映射、hooks/types导入候选、嵌套demo children；未来复杂模板可能暴露新样式/导入边界。现有28项parse/parity和默认值、旧144源码SHA、新40运行/360样式字段提供有限范围证据；不是任意模板的保证。
- 自动播放装饰动效与语义数据分离：Conveyor复制区域inert，PrismDeck后卡inert，Aperture有焦点/按钮路径。调用方内容若包含复杂focus/表单、跨组件叠层或长句，仍需消费项目验证。ShutterText设计为短标题，长句可能溢出。
- 增加几十份源码/安装包与本地文档，AI指南/机器目录都有明确local来源；不能使用官网同名安装URL。生成器会覆盖直接编辑的生成文件。Tailwind仍受宿主未分层CSS影响。
- BeamPath是装饰关联图，LiquidAction只回调，OrbitStage/ScrollTheater只是内容选择；没有真实工作流、音频、消息发送或后台数据探测。新增展示速度参数不约束谁能执行什么，不属于安全闩/业务安全阈值。

整个未提交改动集和每文件证据见 `MOTION-COLLECTION-EVIDENCE.md`；R2历史报告保留。R3输出目录存本轮JSON、失败、构建日志、截图/录像与指纹；不把R2产物改写成R3新增行为。

## R4 · 2026-09-30 · 全量组件盘点、偏好与页面方向

状态：部分完成。用户请求“总结目前已经有的全部组件，和我的喜好……真正时尚的页面”。范围是X:/myui中的库目录与试验场源码，不修改组件运行逻辑，不重新制作页面。首次出现的根目录产物为COMPONENT-INVENTORY.md/JSON、DESIGN-PREFERENCES.md、summarize-components.mjs、SUMMARY-EVIDENCE.md；其SHA/mtime与逐文件证据写入最后一个报告。

命令：在X:/myui运行 `node summarize-components.mjs`，退出0：libraryEntries=361，reactBits=239（上游211、本地28），reactBitsImplementations=956，aceternity=122（components112/blocks9/hooks1），aceternitySourceFiles=127，aceternityFilesMatchingSavedRegistry=127，pulsarModules=31（同名30、页面编排MotionGallery另1），failed=0/skipped=0。四版本、页面副本不重复计为组件名；跨库相似能力保留来源，361不是独立功能种类数。

具体判定：注册JS-CSS入口数组==磁盘.jsx数组；Aceternity API名==落盘metadata名==download.ok名；每个下载源码字符串==保存registry的content（仅统一CRLF/LF）；库ID唯一。此证据证明盘点对应；待证命题是目录对应，二者是同一件事。runtimeAssertionsThisRound=0，不能推出组件安装/交互/性能结论。99项下载条目检测到@/或next/导入，只是宿主适配提示，不声称全部不可用。

文档检查命令：`node summarize-components.mjs --evidence`；退出0，输出entryRows=361、localLinksExist=401、historicalGitFilesUnchanged=380、failed=0/skipped=0。它生成整个git diff 382文件的逐项表，并逐文件断言除本轮两份文档外的380文件SHA==R3指纹。缺少忽略目录中的R3指纹时该历史比较不能重现，脚本失败。R3行为产物首次出现仍为R3，不当作本轮新测。

差异空白检查：先使用core.autocrlf=false的原始diff检查，CRLF被识别为行尾空白，返回大量历史文件条目；首次组合命令随后运行stat，末命令退出0掩盖前一命令状态，因此不引用该组合退出码作为检查通过。单独重现raw检查退出2；使用Windows CRLF感知规则 `git -c core.autocrlf=false -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol diff --check`，退出0。不转换历史文件换行，不声称raw检查通过。

初次盘点退出1：既有元数据键TextAnimations/AsciiText与公开名称ASCIIText大小写不同，严格key==category/name断言拒绝；修正盘点脚本只对元数据键采用大小写归一，实际源码路径仍按公开名称生成且与磁盘路径集合严格相等，重跑退出0。没有修改组件、注册名称或过滤条目。源集合SHA256=fb758d03b918c1c4db80875738e006edc25e1ad0bd6a1a12edea201f57f40ac2。

偏好依据：本会话用户原话支持“扩展库、先复用、多种风格、明显动态”；pulsar/THEMES.md历史记录支持暖橙/薄荷优先与避免默认黑紫，明确不是本轮重新询问。排版、主体动效、统一艺术方向等标为设计推断，不假定固定字体或排斥所有深色。官方Hero Parallax页面提供旋转/平移/透明度机制参考；Awwwards相关页面获取失败，不作最新获奖网站的统计推断。

未覆盖范围：没有重新运行R2/R3的verifyMotionCollection、verifyLocalCollection、verifyInstalledCollection、checkPropDocs.test.js、build、tsc及全仓lint；Aceternity全部条目未独立安装/编译/运行。没有逐项人工读完392条目/模块，不检查所有props、空值/错误/后台/SSR/宿主路径/资源/许可证适用方式、Safari、真实触摸、无障碍和性能。工作区外Downloads等位置未扫描。少量源码阅读用于解释机制，不能代表全量语义检查。

本轮改动可能引入的新风险：目录随下载过时、跨库同名/相似能力被误认接口等价、粗略正则技术分类误导选型、个人偏好被泛化到所有产品。指南指向真实接口、快照指纹与来源分层，未来明确需求覆盖历史偏好。整个git diff含历史变更，逐项语义与未验证声明见根目录SUMMARY-EVIDENCE.md，未以两份新文档缩小改动集；本轮不改变外部动作/权限/安全路径。

被放弃的解释：不重做PULSAR（会产生新的展示页，偏离总结请求）；不把四版本和同名试验场副本计为新组件（会虚增资产数量）；不把“时尚”当作全行业统一模板（会把个人建议误写为事实）。采用“全量盘点 + 有来源的偏好说明 + 可选页面方向”，没有用户视觉验收结论。
