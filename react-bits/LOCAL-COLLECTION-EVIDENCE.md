# R2 逐文件证据

首次产生：2026-09-30 本轮组件库扩展；变更集合锚定 git diff --stat / git diff --name-only，251 文件。环境与命题映射、命令退出码、测试前置/未覆盖范围/本轮新风险详见 WORKLOG.md。此报告不给出未覆盖环境的可用态结论。

表中 CLI 数字指解析 JSON 后的字段门禁；仅进程启动/HTTP成功不计行为证据。

| 改动文件 | 改动语义 | 针对该语义的证据或明确缺口 |
| --- | --- | --- |
| .gitignore | 忽略开发调用方与证据输出，保留可复用 AGENTS | git check-ignore output/local-collection/browser.json 返回匹配；报告/AGENTS 出现在 git diff；非运行逻辑 |
| AGENTS.md | 后续 AI 的组件复用入口 | 人工核对源码/指南路径；不单独验证未来 AI 是否遵循文字约定 |
| AI-COMPONENTS.md | 18种风格、四版本、参数/取用/本地安装说明 | 目录项与 LocalCollection 比对；ArcadeButton 安装实例 5/5；未单独验证所有文档示例/安装器版本 |
| LOCAL-COLLECTION-EVIDENCE.md | 本轮逐文件证据 | generateLocalEvidence.mjs：表行数==git diff --name-only 文件数；自引用文档指纹另存 fingerprint JSON |
| README.md | 入口链接与本地未发布说明 | 相对 AI-COMPONENTS.md 目标存在；纯文档未单独做浏览器链接点击 |
| WORKLOG.md | 做了/没做/失败/风险与复现账本 | generateLocalEvidence.mjs 从实际 JSON 断言统计；记录未覆盖范围；文字不替代行为证据 |
| jsrepo.config.ts | 本地新增项的 CSS/源码相邻 target | registry:build exit 0；72包 target字段；真实安装 ArcadeButton-TS-CSS 两文件与5/5独立行为 |
| package.json | registry build 串联规范化 | npm run build exit 0；registry 916 items；checkLocalRegistry.mjs 72/72 载荷及原844无diff |
| public/llms.txt | 新增18项 AI 目录、独立源码路径与未发布标记 | checkLocalRegistry.mjs：18条本地目录与安装URL存在；git diff仅18新增目录行 |
| public/r/ArcadeButton-JS-CSS.json | ArcadeButton JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ArcadeButton-JS-TW.json | ArcadeButton JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ArcadeButton-TS-CSS.json | ArcadeButton TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ArcadeButton-TS-TW.json | ArcadeButton TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BauhausStepper-JS-CSS.json | BauhausStepper JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BauhausStepper-JS-TW.json | BauhausStepper JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BauhausStepper-TS-CSS.json | BauhausStepper TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BauhausStepper-TS-TW.json | BauhausStepper TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BlueprintPanel-JS-CSS.json | BlueprintPanel JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BlueprintPanel-JS-TW.json | BlueprintPanel JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BlueprintPanel-TS-CSS.json | BlueprintPanel TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BlueprintPanel-TS-TW.json | BlueprintPanel TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BubbleChoice-JS-CSS.json | BubbleChoice JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BubbleChoice-JS-TW.json | BubbleChoice JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BubbleChoice-TS-CSS.json | BubbleChoice TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/BubbleChoice-TS-TW.json | BubbleChoice TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ElasticTabs-JS-CSS.json | ElasticTabs JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ElasticTabs-JS-TW.json | ElasticTabs JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ElasticTabs-TS-CSS.json | ElasticTabs TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ElasticTabs-TS-TW.json | ElasticTabs TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/MonoCommand-JS-CSS.json | MonoCommand JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/MonoCommand-JS-TW.json | MonoCommand JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/MonoCommand-TS-CSS.json | MonoCommand TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/MonoCommand-TS-TW.json | MonoCommand TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/NeonToggle-JS-CSS.json | NeonToggle JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/NeonToggle-JS-TW.json | NeonToggle JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/NeonToggle-TS-CSS.json | NeonToggle TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/NeonToggle-TS-TW.json | NeonToggle TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrbitSlider-JS-CSS.json | OrbitSlider JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrbitSlider-JS-TW.json | OrbitSlider JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrbitSlider-TS-CSS.json | OrbitSlider TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrbitSlider-TS-TW.json | OrbitSlider TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrigamiNav-JS-CSS.json | OrigamiNav JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrigamiNav-JS-TW.json | OrigamiNav JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrigamiNav-TS-CSS.json | OrigamiNav TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/OrigamiNav-TS-TW.json | OrigamiNav TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PaperNote-JS-CSS.json | PaperNote JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PaperNote-JS-TW.json | PaperNote JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PaperNote-TS-CSS.json | PaperNote TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PaperNote-TS-TW.json | PaperNote TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PixelMeter-JS-CSS.json | PixelMeter JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PixelMeter-JS-TW.json | PixelMeter JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PixelMeter-TS-CSS.json | PixelMeter TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PixelMeter-TS-TW.json | PixelMeter TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PostcardFlip-JS-CSS.json | PostcardFlip JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PostcardFlip-JS-TW.json | PostcardFlip JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PostcardFlip-TS-CSS.json | PostcardFlip TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/PostcardFlip-TS-TW.json | PostcardFlip TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RibbonBadge-JS-CSS.json | RibbonBadge JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RibbonBadge-JS-TW.json | RibbonBadge JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RibbonBadge-TS-CSS.json | RibbonBadge TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RibbonBadge-TS-TW.json | RibbonBadge TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RippleButton-JS-CSS.json | RippleButton JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RippleButton-JS-TW.json | RippleButton JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RippleButton-TS-CSS.json | RippleButton TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/RippleButton-TS-TW.json | RippleButton TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/SpringAccordion-JS-CSS.json | SpringAccordion JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/SpringAccordion-JS-TW.json | SpringAccordion JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/SpringAccordion-TS-CSS.json | SpringAccordion TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/SpringAccordion-TS-TW.json | SpringAccordion TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/TerminalStatus-JS-CSS.json | TerminalStatus JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/TerminalStatus-JS-TW.json | TerminalStatus JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/TerminalStatus-TS-CSS.json | TerminalStatus TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/TerminalStatus-TS-TW.json | TerminalStatus TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ToastStack-JS-CSS.json | ToastStack JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ToastStack-JS-TW.json | ToastStack JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ToastStack-TS-CSS.json | ToastStack TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/ToastStack-TS-TW.json | ToastStack TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/VinylDeck-JS-CSS.json | VinylDeck JS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/VinylDeck-JS-TW.json | VinylDeck JS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/VinylDeck-TS-CSS.json | VinylDeck TS-CSS 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/VinylDeck-TS-TW.json | VinylDeck TS-TW 安装包 | checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1 |
| public/r/registry.json | 新增72项索引及本地来源 | checkLocalRegistry.mjs：每个新名称出现次数==1；所有新包 origin/target/source 字段；旧844载荷无diff |
| scripts/checkLocalCollection.mjs | 独立性/源码解析/四版本逻辑与CSS同步断言 | node scripts/checkLocalCollection.mjs exit0，72/72/18pairs；断言字段见脚本，非运行行为结论 |
| scripts/checkLocalRegistry.mjs | 载荷/目标/来源/原包/安装/canonical断言 | node scripts/checkLocalRegistry.mjs exit0，72/72，旧844无diff，CLI2/2，本地canonical18/18 |
| scripts/checkPropDocs.test.js | Windows fixture根目录解析 | npm run test:prop-docs exit 0，三个原名函数3/3，failed/skipped/cancelled/todo均0；基线3项1失败 |
| scripts/createCollectionFixture.mjs | 隔离的正常受控/非受控测试调用方 | 其真实生成物承载 verifyLocalCollection.cjs 156/156；非生产组件钩子 |
| scripts/createInstalledFixture.mjs | 真实安装项目无主题调用方 | 其生成物通过 verifyInstalledCollection.cjs 5/5；无需库文档页面或Tailwind |
| scripts/generateLlmsText.js | 生成本地 AI 文档路径/来源提示 | npm run build exit 0；生成 public/llms.txt 的18项路径由 checkLocalRegistry.mjs 断言 |
| scripts/generateLocalCollection.mjs | 生成72源码、18demo/code及注册目录 | 本轮生成后 parse/parity 72/72、CSS pairs18/18、严格TS36、默认值229表与browser156/156；未测试任意未来定义输入 |
| scripts/generateLocalEvidence.mjs | 本报告与证据指纹/变更集生成 | 本次执行所有JSON门禁、逐文件匹配和表行数断言；未编写独立单测，自身不产生新的行为证据 |
| scripts/generateRouteMeta.js | 本地组件 canonical 使用实际 docsUrl | npm run build exit 0；checkLocalRegistry.mjs：18项 dist canonical==本地URL |
| scripts/generateRss.js | 官方RSS排除尚未发布的本地新增项 | npm run build exit 0；checkLocalRegistry.mjs：dist/rss.xml 中本地新增 guid 数==0；未扩大到全RSS语义审计 |
| scripts/local-collection/core.mjs | 四种实现共用的组件/样式/API定义源 | 生成物对应 parse/parity 72/72、TS36无诊断、prop-default一致及browser156/156；未对私有模板函数单独单测 |
| scripts/local-collection/essential.mjs | 四种实现共用的组件/样式/API定义源 | 生成物对应 parse/parity 72/72、TS36无诊断、prop-default一致及browser156/156；未对私有模板函数单独单测 |
| scripts/local-collection/expressive.mjs | 四种实现共用的组件/样式/API定义源 | 生成物对应 parse/parity 72/72、TS36无诊断、prop-default一致及browser156/156；未对私有模板函数单独单测 |
| scripts/local-collection/playful.mjs | 四种实现共用的组件/样式/API定义源 | 生成物对应 parse/parity 72/72、TS36无诊断、prop-default一致及browser156/156；未对私有模板函数单独单测 |
| scripts/normalizeRegistry.mjs | LF/稳定文件顺序与本地来源恢复 | checkLocalRegistry.mjs：旧844包无diff、新72包源码完全相等/来源匹配；正常watch 1/1；异常分支未注入 |
| scripts/verifyInstalledCollection.cjs | 独立CLI安装实例的样式/回调检查 | CLI JSON门禁 exit0，5/5，含背景/字体/counter1/counter2/pageerrors0字段 |
| scripts/verifyLocalCollection.cjs | 组件真实行为检查与字段记录 | CLI JSON门禁 exit0，156/156，891字段断言，failed/skipped/pageerrors均0 |
| scripts/verifyLocalDocs.cjs | 生产文档预览/源码/参数呈现检查 | CLI JSON门禁 exit0，18/18，failed/skipped/pageerrors均0；UI层而非后端/持久化 |
| scripts/watchRegistry.js | 监听本地元数据、成功后规范化 | watch.json：metadata-only修改后 after_ticks>before_ticks 且 origin==local，1/1；失败及queued分支未验证 |
| src/constants/Categories.js | 分类中追加本地18项 | checkLocalCollection.mjs：catalog每项出现次数==1，check:prop-docs 229项；production routes 18/18 |
| src/constants/Components.js | 合并本地惰性路由 | checkLocalCollection.mjs：18个路由键存在；production demo 18/18 |
| src/constants/Information.js | 合并本地 metadata | checkLocalCollection.mjs：18项 origin==local；本地文档/registry字段检查 |
| src/constants/LocalCollection.js | 机器可读风格/标签/API/路径/来源目录 | checkLocalCollection.mjs 18唯一catalog；229表默认值；checkLocalRegistry.mjs 72包/18文档/LLM路径；非标量使用示例未逐项单独执行 |
| src/constants/LocalComponents.js | 18份惰性 demo imports | verifyLocalDocs.cjs：所有18个生产路由实际渲染；缺失lazy import会使marker断言失败 |
| src/constants/code/Components/bauhausStepperCode.js | BauhausStepper 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Components/blueprintPanelCode.js | BlueprintPanel 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Components/monoCommandCode.js | MonoCommand 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Components/origamiNavCode.js | OrigamiNav 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Components/vinylDeckCode.js | VinylDeck 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/arcadeButtonCode.js | ArcadeButton 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/bubbleChoiceCode.js | BubbleChoice 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/elasticTabsCode.js | ElasticTabs 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/neonToggleCode.js | NeonToggle 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/orbitSliderCode.js | OrbitSlider 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/paperNoteCode.js | PaperNote 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/pixelMeterCode.js | PixelMeter 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/postcardFlipCode.js | PostcardFlip 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/ribbonBadgeCode.js | RibbonBadge 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/rippleButtonCode.js | RippleButton 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/springAccordionCode.js | SpringAccordion 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/terminalStatusCode.js | TerminalStatus 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/constants/code/Micro/toastStackCode.js | ToastStack 五份 raw 源码、使用示例与依赖 | checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现 |
| src/content/Components/BauhausStepper/BauhausStepper.css | BauhausStepper content 命名样式 | verifyLocalCollection.cjs：component=BauhausStepper, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Components/BauhausStepper/BauhausStepper.jsx | BauhausStepper content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BauhausStepper, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Components/BlueprintPanel/BlueprintPanel.css | BlueprintPanel content 命名样式 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=0，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Components/BlueprintPanel/BlueprintPanel.jsx | BlueprintPanel content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=0，1/1 工况；具体 UI/回调字段断言 |
| src/content/Components/MonoCommand/MonoCommand.css | MonoCommand content 命名样式 | verifyLocalCollection.cjs：component=MonoCommand, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Components/MonoCommand/MonoCommand.jsx | MonoCommand content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=MonoCommand, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Components/OrigamiNav/OrigamiNav.css | OrigamiNav content 命名样式 | verifyLocalCollection.cjs：component=OrigamiNav, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Components/OrigamiNav/OrigamiNav.jsx | OrigamiNav content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrigamiNav, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Components/VinylDeck/VinylDeck.css | VinylDeck content 命名样式 | verifyLocalCollection.cjs：component=VinylDeck, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Components/VinylDeck/VinylDeck.jsx | VinylDeck content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=VinylDeck, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Micro/ArcadeButton/ArcadeButton.css | ArcadeButton content 命名样式 | verifyLocalCollection.cjs：component=ArcadeButton, variant=0，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/ArcadeButton/ArcadeButton.jsx | ArcadeButton content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ArcadeButton, variant=0，1/1 工况；具体 UI/回调字段断言 |
| src/content/Micro/BubbleChoice/BubbleChoice.css | BubbleChoice content 命名样式 | verifyLocalCollection.cjs：component=BubbleChoice, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/BubbleChoice/BubbleChoice.jsx | BubbleChoice content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BubbleChoice, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Micro/ElasticTabs/ElasticTabs.css | ElasticTabs content 命名样式 | verifyLocalCollection.cjs：component=ElasticTabs, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/ElasticTabs/ElasticTabs.jsx | ElasticTabs content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ElasticTabs, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Micro/NeonToggle/NeonToggle.css | NeonToggle content 命名样式 | verifyLocalCollection.cjs：component=NeonToggle, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/NeonToggle/NeonToggle.jsx | NeonToggle content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=NeonToggle, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/OrbitSlider/OrbitSlider.css | OrbitSlider content 命名样式 | verifyLocalCollection.cjs：component=OrbitSlider, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/OrbitSlider/OrbitSlider.jsx | OrbitSlider content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrbitSlider, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/PaperNote/PaperNote.css | PaperNote content 命名样式 | verifyLocalCollection.cjs：component=PaperNote, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/PaperNote/PaperNote.jsx | PaperNote content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PaperNote, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/PixelMeter/PixelMeter.css | PixelMeter content 命名样式 | verifyLocalCollection.cjs：component=PixelMeter, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/PixelMeter/PixelMeter.jsx | PixelMeter content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PixelMeter, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/PostcardFlip/PostcardFlip.css | PostcardFlip content 命名样式 | verifyLocalCollection.cjs：component=PostcardFlip, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/PostcardFlip/PostcardFlip.jsx | PostcardFlip content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PostcardFlip, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/RibbonBadge/RibbonBadge.css | RibbonBadge content 命名样式 | verifyLocalCollection.cjs：component=RibbonBadge, variant=0，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/RibbonBadge/RibbonBadge.jsx | RibbonBadge content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RibbonBadge, variant=0，1/1 工况；具体 UI/回调字段断言 |
| src/content/Micro/RippleButton/RippleButton.css | RippleButton content 命名样式 | verifyLocalCollection.cjs：component=RippleButton, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/RippleButton/RippleButton.jsx | RippleButton content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RippleButton, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/SpringAccordion/SpringAccordion.css | SpringAccordion content 命名样式 | verifyLocalCollection.cjs：component=SpringAccordion, variant=0，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/SpringAccordion/SpringAccordion.jsx | SpringAccordion content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=SpringAccordion, variant=0，3/3 工况；具体 UI/回调字段断言 |
| src/content/Micro/TerminalStatus/TerminalStatus.css | TerminalStatus content 命名样式 | verifyLocalCollection.cjs：component=TerminalStatus, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/TerminalStatus/TerminalStatus.jsx | TerminalStatus content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=TerminalStatus, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/content/Micro/ToastStack/ToastStack.css | ToastStack content 命名样式 | verifyLocalCollection.cjs：component=ToastStack, variant=0，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/content/Micro/ToastStack/ToastStack.jsx | ToastStack content 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ToastStack, variant=0，2/2 工况；具体 UI/回调字段断言 |
| src/demo/Components/BauhausStepperDemo.jsx | BauhausStepper 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：BauhausStepper production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Components/BlueprintPanelDemo.jsx | BlueprintPanel 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：BlueprintPanel production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Components/MonoCommandDemo.jsx | MonoCommand 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：MonoCommand production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Components/OrigamiNavDemo.jsx | OrigamiNav 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：OrigamiNav production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Components/VinylDeckDemo.jsx | VinylDeck 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：VinylDeck production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/ArcadeButtonDemo.jsx | ArcadeButton 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：ArcadeButton production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/BubbleChoiceDemo.jsx | BubbleChoice 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：BubbleChoice production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/ElasticTabsDemo.jsx | ElasticTabs 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：ElasticTabs production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/NeonToggleDemo.jsx | NeonToggle 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：NeonToggle production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/OrbitSliderDemo.jsx | OrbitSlider 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：OrbitSlider production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/PaperNoteDemo.jsx | PaperNote 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：PaperNote production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/PixelMeterDemo.jsx | PixelMeter 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：PixelMeter production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/PostcardFlipDemo.jsx | PostcardFlip 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：PostcardFlip production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/RibbonBadgeDemo.jsx | RibbonBadge 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：RibbonBadge production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/RippleButtonDemo.jsx | RippleButton 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：RippleButton production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/SpringAccordionDemo.jsx | SpringAccordion 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：SpringAccordion production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/TerminalStatusDemo.jsx | TerminalStatus 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：TerminalStatus production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/demo/Micro/ToastStackDemo.jsx | ToastStack 独立库文档示例/参数表/代码页 | verifyLocalDocs.cjs：ToastStack production preview、props、source、usage 字段；未逐项操作 Customize 控件 |
| src/tailwind/Components/BauhausStepper/BauhausStepper.jsx | BauhausStepper tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BauhausStepper, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Components/BlueprintPanel/BlueprintPanel.jsx | BlueprintPanel tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=1，1/1 工况；具体 UI/回调字段断言 |
| src/tailwind/Components/MonoCommand/MonoCommand.jsx | MonoCommand tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=MonoCommand, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Components/OrigamiNav/OrigamiNav.jsx | OrigamiNav tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrigamiNav, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Components/VinylDeck/VinylDeck.jsx | VinylDeck tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=VinylDeck, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/ArcadeButton/ArcadeButton.jsx | ArcadeButton tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ArcadeButton, variant=1，1/1 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/BubbleChoice/BubbleChoice.jsx | BubbleChoice tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BubbleChoice, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/ElasticTabs/ElasticTabs.jsx | ElasticTabs tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ElasticTabs, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/NeonToggle/NeonToggle.jsx | NeonToggle tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=NeonToggle, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/OrbitSlider/OrbitSlider.jsx | OrbitSlider tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrbitSlider, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/PaperNote/PaperNote.jsx | PaperNote tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PaperNote, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/PixelMeter/PixelMeter.jsx | PixelMeter tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PixelMeter, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/PostcardFlip/PostcardFlip.jsx | PostcardFlip tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PostcardFlip, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/RibbonBadge/RibbonBadge.jsx | RibbonBadge tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RibbonBadge, variant=1，1/1 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/RippleButton/RippleButton.jsx | RippleButton tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RippleButton, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/SpringAccordion/SpringAccordion.jsx | SpringAccordion tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=SpringAccordion, variant=1，3/3 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/TerminalStatus/TerminalStatus.jsx | TerminalStatus tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=TerminalStatus, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/tailwind/Micro/ToastStack/ToastStack.jsx | ToastStack tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ToastStack, variant=1，2/2 工况；具体 UI/回调字段断言 |
| src/ts-default/Components/BauhausStepper/BauhausStepper.css | BauhausStepper ts-default 命名样式 | verifyLocalCollection.cjs：component=BauhausStepper, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Components/BauhausStepper/BauhausStepper.tsx | BauhausStepper ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BauhausStepper, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Components/BlueprintPanel/BlueprintPanel.css | BlueprintPanel ts-default 命名样式 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=2，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Components/BlueprintPanel/BlueprintPanel.tsx | BlueprintPanel ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=2，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Components/MonoCommand/MonoCommand.css | MonoCommand ts-default 命名样式 | verifyLocalCollection.cjs：component=MonoCommand, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Components/MonoCommand/MonoCommand.tsx | MonoCommand ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=MonoCommand, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Components/OrigamiNav/OrigamiNav.css | OrigamiNav ts-default 命名样式 | verifyLocalCollection.cjs：component=OrigamiNav, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Components/OrigamiNav/OrigamiNav.tsx | OrigamiNav ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrigamiNav, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Components/VinylDeck/VinylDeck.css | VinylDeck ts-default 命名样式 | verifyLocalCollection.cjs：component=VinylDeck, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Components/VinylDeck/VinylDeck.tsx | VinylDeck ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=VinylDeck, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/ArcadeButton/ArcadeButton.css | ArcadeButton ts-default 命名样式 | verifyLocalCollection.cjs：component=ArcadeButton, variant=2，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/ArcadeButton/ArcadeButton.tsx | ArcadeButton ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ArcadeButton, variant=2，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/BubbleChoice/BubbleChoice.css | BubbleChoice ts-default 命名样式 | verifyLocalCollection.cjs：component=BubbleChoice, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/BubbleChoice/BubbleChoice.tsx | BubbleChoice ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BubbleChoice, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/ElasticTabs/ElasticTabs.css | ElasticTabs ts-default 命名样式 | verifyLocalCollection.cjs：component=ElasticTabs, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/ElasticTabs/ElasticTabs.tsx | ElasticTabs ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ElasticTabs, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/NeonToggle/NeonToggle.css | NeonToggle ts-default 命名样式 | verifyLocalCollection.cjs：component=NeonToggle, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/NeonToggle/NeonToggle.tsx | NeonToggle ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=NeonToggle, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/OrbitSlider/OrbitSlider.css | OrbitSlider ts-default 命名样式 | verifyLocalCollection.cjs：component=OrbitSlider, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/OrbitSlider/OrbitSlider.tsx | OrbitSlider ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrbitSlider, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/PaperNote/PaperNote.css | PaperNote ts-default 命名样式 | verifyLocalCollection.cjs：component=PaperNote, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/PaperNote/PaperNote.tsx | PaperNote ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PaperNote, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/PixelMeter/PixelMeter.css | PixelMeter ts-default 命名样式 | verifyLocalCollection.cjs：component=PixelMeter, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/PixelMeter/PixelMeter.tsx | PixelMeter ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PixelMeter, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/PostcardFlip/PostcardFlip.css | PostcardFlip ts-default 命名样式 | verifyLocalCollection.cjs：component=PostcardFlip, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/PostcardFlip/PostcardFlip.tsx | PostcardFlip ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PostcardFlip, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/RibbonBadge/RibbonBadge.css | RibbonBadge ts-default 命名样式 | verifyLocalCollection.cjs：component=RibbonBadge, variant=2，1/1 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/RibbonBadge/RibbonBadge.tsx | RibbonBadge ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RibbonBadge, variant=2，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/RippleButton/RippleButton.css | RippleButton ts-default 命名样式 | verifyLocalCollection.cjs：component=RippleButton, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/RippleButton/RippleButton.tsx | RippleButton ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RippleButton, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/SpringAccordion/SpringAccordion.css | SpringAccordion ts-default 命名样式 | verifyLocalCollection.cjs：component=SpringAccordion, variant=2，3/3 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/SpringAccordion/SpringAccordion.tsx | SpringAccordion ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=SpringAccordion, variant=2，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/TerminalStatus/TerminalStatus.css | TerminalStatus ts-default 命名样式 | verifyLocalCollection.cjs：component=TerminalStatus, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/TerminalStatus/TerminalStatus.tsx | TerminalStatus ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=TerminalStatus, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-default/Micro/ToastStack/ToastStack.css | ToastStack ts-default 命名样式 | verifyLocalCollection.cjs：component=ToastStack, variant=2，2/2 工况；12项 computed style/390px 根边界与 CSS 配对 |
| src/ts-default/Micro/ToastStack/ToastStack.tsx | ToastStack ts-default 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ToastStack, variant=2，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Components/BauhausStepper/BauhausStepper.tsx | BauhausStepper ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BauhausStepper, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Components/BlueprintPanel/BlueprintPanel.tsx | BlueprintPanel ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BlueprintPanel, variant=3，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Components/MonoCommand/MonoCommand.tsx | MonoCommand ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=MonoCommand, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Components/OrigamiNav/OrigamiNav.tsx | OrigamiNav ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrigamiNav, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Components/VinylDeck/VinylDeck.tsx | VinylDeck ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=VinylDeck, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/ArcadeButton/ArcadeButton.tsx | ArcadeButton ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ArcadeButton, variant=3，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/BubbleChoice/BubbleChoice.tsx | BubbleChoice ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=BubbleChoice, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/ElasticTabs/ElasticTabs.tsx | ElasticTabs ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ElasticTabs, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/NeonToggle/NeonToggle.tsx | NeonToggle ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=NeonToggle, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/OrbitSlider/OrbitSlider.tsx | OrbitSlider ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=OrbitSlider, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/PaperNote/PaperNote.tsx | PaperNote ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PaperNote, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/PixelMeter/PixelMeter.tsx | PixelMeter ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PixelMeter, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/PostcardFlip/PostcardFlip.tsx | PostcardFlip ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=PostcardFlip, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/RibbonBadge/RibbonBadge.tsx | RibbonBadge ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RibbonBadge, variant=3，1/1 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/RippleButton/RippleButton.tsx | RippleButton ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=RippleButton, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/SpringAccordion/SpringAccordion.tsx | SpringAccordion ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=SpringAccordion, variant=3，3/3 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/TerminalStatus/TerminalStatus.tsx | TerminalStatus ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=TerminalStatus, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| src/ts-tailwind/Micro/ToastStack/ToastStack.tsx | ToastStack ts-tailwind 独立实现/props/事件与动态 | verifyLocalCollection.cjs：component=ToastStack, variant=3，2/2 工况；具体 UI/回调字段断言；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files |
| tsconfig.local-collection.json | 严格类型检查覆盖36个本轮TS文件 | npx tsc -p tsconfig.local-collection.json exit0，无诊断；既有其他TS文件未纳入 |

每份产物 SHA-256 与 mtime 另存 output/local-collection/fingerprints.json（含本报告本身，避免自引用哈希循环）。该文件与原始检查 JSON 仅为本轮本机记录；源码/本报告/账本进入 git diff。UI 风格截图不是行为、后端或权限证据。
