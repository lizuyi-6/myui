# 组件复用约定

此项目是组件库，`../pulsar` 是试验场。用户要求给组件库加东西时，扩展本仓库的独立组件、四种版本、参数和取用资料，不以修改试验场页面替代。

开始构建 UI 前，先阅读 `AI-COMPONENTS.md`，检索 `src/constants/LocalCollection.js` 与 `src/constants/Information.js`。已有组件满足需求时，复制或安装合适版本，通过 props/children/回调接入，不自行重写同功能组件。

本地新增组件标记 `meta.origin = 'local'`，其 docs 和 registry 只在本地预览服务中提供。不得假设它们已发布至 reactbits.dev。

批量组件的定义源在 `scripts/local-collection/`，生成器为 `scripts/generateLocalCollection.mjs`。修改时同步四种版本、示例、props、目录与 registry。使用项目既有检查和具体字段断言；编译或 HTTP 200 不能替代交互验证。

每轮追加 `WORKLOG.md`，状态用“进行中/部分完成/阻断级缺口”。报告具体证据与未覆盖范围；不得用套件通过代替逐文件证据。
