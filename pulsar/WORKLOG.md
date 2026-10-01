# 工作账本

## 2026-09-30 / 本轮用户请求：按照现有动态继续制作更多组件

状态：进行中。

范围：PULSAR 新增六个原创微交互组件及试玩入口，沿用四套主题。目录检索得到 24 个既有组件文件，页面总数采用 `24 + MICRO_COMPONENTS.length`。没有改参考库或外部系统。

初次证据：Windows / Vite production 构建，命令 `npm run build`，退出 0，6564 modules transformed；证明生产打包，行为结论尚无支持。

首轮浏览器字段断言：`scripts/verify-components.js` 经 Playwright CLI 对本地生产预览 `:5288` 执行，输出 total=52、passed=49、failed=3、skipped=0，归档 `output/playwright/verification-first-run.txt`。此证据证明三条反例被检测；待证命题为全部所列行为符合预期，两者关系为未达到门槛。

反例：连续添加提示后可交互按钮数为 4，预期 3；删除全部后仍命中 1 个退场按钮，预期 0；动态启用减少运动后涟漪节点数为 1，预期 0。没有过滤或跳过失败断言。

修正方向：ToastItem 的退场阶段使用 `useIsPresent` 配合 `aria-hidden/inert`，保持关闭后的焦点；新增响应偏好变化的 `usePrefersReducedMotion`，替换新增组件的初始快照读取。等待修正后的同组字段断言和补充焦点/动态偏好断言结果。

未覆盖范围、新风险、接口与复现步骤见 `COMPONENTS.md`。最终逐文件证据待追加。

### 本轮最终记录 / 2026-09-30 09:31（Asia/Shanghai）

状态：部分完成；下列本地浏览器行为有证据，未覆盖范围保持显式，不据此认定跨浏览器、性能或生产部署达标。

第二次运行停在等待卡片入场处，输出 `TimeoutError: page.waitForFunction: Timeout 30000ms exceeded`；JSON 判定命令退出 1，记录在 `output/playwright/verification-second-run.txt`。浏览器读数为 scrollY=5268.67、六个卡片 opacity=0 且全部位于视口上方。检查入口改为无 hash 首页，再按当前布局瞬间滚动到组件区，避免 hash/刷新滚动恢复与布局变化干扰；没有删断言。

最终构建命令：`npm run build`，退出 0，关键输出 `6565 modules transformed`、`dist/assets/index-DrEAWWOA.js 657.69 kB / gzip 219.75 kB`。此证据证明生产打包成功；待证命题为打包成功，两者是同一件事。该证据不证明行为或性能。

最终浏览器命令：`node C:/Users/Abraham/AppData/Local/npm-cache/_npx/423231821c231c73/node_modules/@playwright/cli/playwright-cli.js -s=pulsar-components run-code --filename=scripts/verify-components.js --raw`，然后解析 JSON 并断言 `failed == 0 && skipped == 0 && total >= 52`；整体命令退出 0，输出 total=56、passed=56、failed=0、skipped=0。环境 Windows Chrome / Vite production preview `http://127.0.0.1:5288/`，前置条件为最终构建、预览服务和已打开的命名浏览器会话。没有生产注入钩子或测试专用端点。

计数从首轮 52 增加到 56：追加空提示焦点、动态偏好下保留标签、动态偏好下保留点击计数、恢复装饰涟漪四条断言。没有 skip/filter/禁用机制。首轮三条反例的最终实际字段分别为提示按钮数=3、全部关闭后按钮数=0、减少运动后的涟漪节点数=0，各自与期望相等。此证据证明列出的现场浏览器状态；待证命题为这三条交互行为正确，两者是同一件事，字段相等可被实际不同值证伪。

本轮首次生成的证据指纹（SHA256）：

- `output/playwright/verification.json`，mtime `2026-09-30T09:31:47.4591765+08:00`，SHA `18F6FCB4F140E0B39E9E459AB7A8D5D90229F460C25AA6463361C27D4E50420A`。
- `scripts/verify-components.js`，mtime `2026-09-30T09:31:22.6275516+08:00`，SHA `FE5BF8F16D6050CD8F70F507C0696CD6D082B4991E7912958D3B4EFBF1B5D5BB`。
- 首轮失败记录 `output/playwright/verification-first-run.txt`，SHA `822663224689AA36C5C5A8D1BDBB16C106C53DD92D726E5B4EE9E62E52C762BF`；滚动超时记录 `output/playwright/verification-second-run.txt`，SHA `C81BE53789FBBC01C8ED4B5799982E6761DD2E6495CC2612BD9E3BB0890DEAFE`。

### 逐文件证据（改动集合锚定 git diff --stat）

新文件使用 `git add -N` 让 diff 计入，未提交任何文件。`git diff --stat` 列出下列 13 个文件；`git diff --check` 退出 0。

| 改动文件 | 改动语义 | 对应证据或未单独验证声明 |
| --- | --- | --- |
| `.gitignore` | 忽略浏览器缓存和生成证据 | `git check-ignore .playwright-cli/page-2026-09-30T01-22-13-748Z.yml output/playwright/components-warm.png` 退出 0，输出两个路径。 |
| `src/App.jsx` | 接入组件区、导航及真实目录数量 | `six demos mounted` actual=6；`component navigation targets gallery` actual=`#components`；`catalog total is 24 existing + 6 new` actual=true，全部与 expected 相等。其余事件流/聊天文案仅由 build 编译，未逐条触发。 |
| `src/components/ElasticTabs/ElasticTabs.jsx` | 弹性指示器、选择和键盘切换 | `tab click selects color`、`tab arrow selects rhythm`、`tab arrow transfers focus`、`tab Home selects first`、`tab arrow wraps to last`，全部 actual==expected；受控模式未单独验证。 |
| `src/components/OrbitSlider/OrbitSlider.jsx` | 原生输入和弹簧轨道 | `slider cannot go below lower bound` actual=`0`；`slider cannot go above upper bound` actual=`100`；`slider keyboard steps by one` actual=`1`；四套主题 stroke 逐个相等。非法 props 未验证。 |
| `src/components/RippleButton/RippleButton.jsx` | 点击来源反馈和节点清理 | `ripple mouse and keyboard count` actual=`回应了 3 次点击`；`ripple nodes cleaned after animation` actual=0；`reduced motion omits decorative ripple` actual=0。disabled 分支未单独验证。 |
| `src/components/SpringAccordion/SpringAccordion.jsx` | 单项展开、重复收起、关闭内容不可聚焦 | `accordion closes previous item` actual=`false`；`collapsed accordion content is inert` actual=true；`accordion permits all collapsed` actual=0；`accordion keyboard reopens item` actual=`true`。 |
| `src/components/ToastStack/ToastStack.jsx` | 卡片层叠、退场隔离、关闭后的焦点 | `toast bounded after repeated additions` actual=3；`toast dismissal removes all items` actual=0；`toast empty stack retains keyboard focus` actual=true；`toast can recover from empty state` actual=1。 |
| `src/components/FlipCard/FlipCard.jsx` | 3D 翻面、不可见面退出可访问路径 | `flip state reflects reverse` actual=`true`；`flip front hidden from assistive technology` actual=1；`flip keyboard returns to front` actual=`false`；减少运动时仍能翻面。未检查真实屏幕阅读器输出。 |
| `src/components/MotionGallery/MotionGallery.jsx` | 六组件编排、提示上限、重置 | `reset restores all six defaults` 对六项 state 逐字段相等；四个 `theme … retains all demo states` 逐字段相等；390px 下 `mobile all demos fit viewport` actual=true。 |
| `src/hooks/usePrefersReducedMotion.js` | 订阅运行中的系统偏好变化 | 不重挂载、不重置组件，切换 reduce 后涟漪节点 actual=0、标签选择仍为 true；切回 no-preference 后 `motion preference restores decorative ripple` actual=true。 |
| `scripts/verify-components.js` | 可重放的公共控件字段检查 | 最终命令退出 0，total=56/passed=56/failed=0/skipped=0；首轮反例和第二次超时均归档，没有隐藏失败。 |
| `COMPONENTS.md` | 接口、复现步骤、取舍、未覆盖和新风险 | 文档完整性检查核对六个组件路径存在及未覆盖/新风险段存在；命令见本轮对话。未逐一运行每个 API 用法，文档不构成接口全覆盖证据。 |
| `WORKLOG.md` | 追加动作、失败、最终结果和指纹 | 账本机械检查核对 diff 中每个路径均有本表条目，JSON 指纹相等；命令见本轮对话。账本叙述不替代浏览器字段证据。 |

已知取舍/已知不证明事项：提示是本地演示，达到三条后替换最旧项；主题切换保留当前会话状态，刷新没有持久化；减少运动仅针对新增组件；截图只证明像素。未覆盖范围及本轮新风险完整列在 `COMPONENTS.md`，主包警告、跨浏览器和真实触摸设备仍无测量结论。
