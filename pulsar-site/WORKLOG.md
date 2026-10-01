# 工作账本

## R5 / 2026-09-30 / 完整官网尝试

- 状态：部分完成（本地网站范围；未部署、未公开发布）。
- 用户依据：“不做单页面，而是做一个完整的网站”“尽量少自己写而是利用现有组件”。产品以现有 PULSAR 组件集合为准；另一解释是替换原试验场，这会改变其现有用途，本轮未采用。
- 新产物首次出现：`X:/myui/pulsar-site`；按 R5 的 `output/playwright/fingerprints.json` 与 `SITE-EVIDENCE.md` 记录 SHA/mtime。
- 页面组合：8 个主要页面、361 个组件详情；18 个组件/33 个源码文件按 SHA 与来源比对。15 个详情是真实互动预览，其他 346 个保留源码和原库链接。首页 3 个 Aceternity 组合组件未擅自增加详情 LIVE 标记。
- 早期检查原样保留：行为第一次 25/17/8（CLI VM 无 URL 全局、Windows 换行、颜色过渡采样）；第二次 25/24/1（剪贴板 CRLF 标准化）；布局第一次 28/27/1（手机海报装饰越界 5px）；源码比对失败（undefined 字段经 JSON 序列化丢失，改为 null）；物理页面请求第一次 731/363/368（预览服务回退首页）。修正检查代码只处理环境差异，没有删除或跳过案例。
- 产品修正：手机装饰缩进；胶片暂停按钮高度；明确 JSON 空字段；预览服务器直接服务子页面物理 HTML。Vite 仍保留未知地址的 SPA 回退，404 是页面提示，不承诺 HTTP 404。
- 最终本轮命令及退出结果由 `SITE-EVIDENCE.md` 记录。生成 HTML 与源包检查是文件/数据一致性，不能替代全部组件运行行为。
- 既有截图沿用 R3，来源 `react-bits/output/local-collection/r3`；不是本轮新动效证据。本轮 UI 截图另存 `output/playwright/*-desktop.png` 与 `*-mobile.png`。
- 未覆盖范围：346 个源码条目的运行时；15 个演示的所有可选参数、极端输入、多实例；Safari/Firefox/真实手机/屏幕阅读器；实际部署路径与第三方许可授权；性能实测。未读完整接口的条目以源码为准，不声称全库运行正确。
- 本轮改动可能引入的新风险：SSR/客户端状态差异；路由与托管适配；源码快照随原库变更而过时；会话数据刷新丢失；多个连续组件的渲染成本；原库组件许可再分发约束。当前检查覆盖部分字段，不能推出跨环境、跨宿主保证。
- 留存取舍：优先复用组件导致部分模块仍保留原库英文控件；目录不是每项都有现场演示；懒加载与静态复用交叉的 6 个构建警告保留，共用模块不再拆 chunk。
- 末轮追加：行为流程出现 25/24/1，便笺填入值变成“这份想法需要保留让界面多一点想象。”，记录保留为 `behavior-hydration-failed.json`。SSR 的互动子树初始化前禁止焦点输入，初始化后开放；测试额外阻断实际 JS 请求，断言 inert=true、不能取得焦点，再恢复脚本检查输入值及跨页保留。
- R5 末次本地结果：`npm run build` 退出 0，369 个物理 HTML；`npm run check:reuse` 退出 0，18/33/361，failed=0 skipped=0；`npm run check:assets` 退出 0，731/731；`npm run check:browser` 退出 0，25/25 + 15/15 + 42/42（合计 82，failed=0 skipped=0），工作流 75 条与演示 60 条字段断言。
- `npm run evidence` 退出 0，git diff 锚定 443 个文件，逐文件语义与证据存入 SITE-EVIDENCE.md；本轮 SHA/mtime 存入 output/playwright/fingerprints.json。全部变更保留在工作副本，无 Git commit，无部署。
- 应用内打开预览的工具未返回确认，等待调用已停止；不声称应用面板已打开。直接访问本地地址 127.0.0.1:5300。

## R6 / 2026-09-30 / 官网演示录制

- 项目状态：部分完成（本地官网范围，尚无公开发布）。用户授权“用鼠标跟随动画或者别的，你自己决定录 demo”；本轮选择已有立体海报、卡组、胶片长廊、风格与形状反馈。
- 初次预览连接拒绝，重启隐藏的本地服务后重新导航。第一份 CLI 视频有截断（460 帧，File ended prematurely），保留为 output/playwright/demo-r6/cli-first-truncated.webm。没有将其当成完整录屏。
- 原生 context 的 recordVideo 关闭后再 saveAs；record-native.cjs 录制返回 11/11 字段断言，failed=0 skipped=0、pageerrors=[]、nativeContextClosed=true。既有组件源码不改，光标、点击圈和段落标签只加在隔离录制上下文。
- ffmpeg MP4 导出退出 0；ffprobe 读取 H.264、1440×900、25/1、1782 帧、71.28 秒；全片 ffmpeg 解码退出 0。10 秒 GIF 导出退出 0，150 帧，960×600。
- 证据与首次 R6 SHA/mtime：output/playwright/demo-r6/DEMO-EVIDENCE.md、media-evidence.json。与 R5 源文件指纹核对，本轮只追加此账本；录制脚本、视频和抽帧留在忽略的输出目录。
- 未覆盖手机端、其余官网页面、键盘/减少动态/下载失败分支，本轮未重跑 R5 全站套件；不声称页面性能达标。视频采样只记录对应桌面操作。

## R7 / 2026-09-30 / 标识审美记录

- 状态：部分完成（偏好记录范围，不构成网站或品牌验收）。用户原话“我特别喜欢这个设计”，附件是当前 PULSAR 标识；本轮按记录品牌偏好处理。没有采用“立即重做官网”的解释，其结果会改变页面；没有采用“所有组件统一成此风格”的解释，其结果会收窄原先要求的多风格组件库。
- DESIGN-PREFERENCES.md：追加原话、截图观察、设计推断、PULSAR 范围与临时附件边界；`node output/playwright/preference-r7/check-preference.mjs` 用具体文本字段断言这些内容。
- AGENTS.md：追加后续设计读取 R7 偏好的入口；同一命令断言文档指针、明确喜好和多风格边界。
- WORKLOG.md：记录本轮范围、放弃的解释与未覆盖路径；同一命令断言记录存在。此文件自述不证明任何页面运行行为。
- 留痕：修改前 443 个 git diff 文件和根目录偏好文档的 SHA 存入 output/playwright/preference-r7/before.json；修改后的完整 git diff --stat、逐文件 SHA/mtime 和字段结果存入同目录。根目录没有 Git，偏好文档通过前后 SHA 留痕；网站 Git diff 仍含 R5 历史文件，不能把全部 443 个文件叙述为本轮新增。
- 未覆盖范围：本轮不运行 build、check:reuse、check:assets、check:browser，也不重新检查 Brand 的渲染、动画或移动端。只断言文档字段和源文件字节是否变化，不能据此推出视觉或行为验收。
- 本轮改动可能引入的新风险：把一次喜好固化成所有项目的规则，或将设计推断当成用户指令。文字明确限定为 PULSAR 标识，组件库继续多风格，新的要求优先；页面源码不改。
- 本地文档检查命令 `node output/playwright/preference-r7/check-preference.mjs` 退出 0：total=10、passed=10、failed=0、skipped=0；changedFiles 精确等于 DESIGN-PREFERENCES.md、AGENTS.md、WORKLOG.md，productionFilesChanged=0。此证据证明文档字段存在且本轮仅这三份文档字节变化；待证命题是偏好有留痕，二者为同一件事，不证明页面交互。逐文件断言见上方三行；完整 git diff 为 443 个历史及当前文件，短统计 8762 insertions，不能据它声称本轮修改了 443 个文件。
