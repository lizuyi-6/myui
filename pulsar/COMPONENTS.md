# PULSAR 微交互组件

2026-09-30 新增六个原创组件，展示入口为 `/#components`。保留暖阳默认主题和原有四套配色，继续采用弹簧运动、按压反馈和轻量入场。独立使用时需要 React 19、`motion/react`、Tailwind CSS 4 以及 `THEMES.md` 中的主题变量。

| 文件 | 行为与接口 |
| --- | --- |
| `src/components/ElasticTabs/ElasticTabs.jsx` | `items: [{id, label, content}]`，支持 `value/defaultValue/onChange/ariaLabel`；左右方向键循环，Home/End 跳到首尾。标签内容保留在 DOM 内，由 `hidden` 控制展示。 |
| `src/components/OrbitSlider/OrbitSlider.jsx` | `value/defaultValue/onChange/min/max/step/label/unit`；原生 range 输入配合弹簧环形进度；默认 0–100，初始 60。调用方须提供有效范围内的数值和正步长。 |
| `src/components/RippleButton/RippleButton.jsx` | `children/onClick/disabled` 和按钮属性；点击起点扩散，键盘点击从中心扩散；动画结束清理节点，最多保留六个涟漪。 |
| `src/components/SpringAccordion/SpringAccordion.jsx` | `items: [{id, title, content}]`，支持 `value/defaultValue/onChange`；一次打开一项，`null` 表示全部收起；退出中的内容使用 `inert`。 |
| `src/components/ToastStack/ToastStack.jsx` | `items: [{id, title, message}]/onDismiss`；悬停或聚焦展开；退出节点立即不可交互；关闭时保留键盘焦点。条数上限由调用方决定，试玩区为三条，新增时移除最旧提示。 |
| `src/components/FlipCard/FlipCard.jsx` | `front/back/flipped/defaultFlipped/onChange`；外置稳定按钮控制 3D 翻面；不可见一面使用 `aria-hidden` 和 `inert`。 |

所有组件接受 `className`。受控模式需要调用方响应 `onChange` 更新传入值。状态仅驻留当前页面，没有持久化或远端副作用。

`MotionGallery` 编排六个试玩卡片；主题变化保留试玩状态，只有“重置试玩”显式恢复默认值。`src/hooks/usePrefersReducedMotion.js` 通过 `useSyncExternalStore` 订阅系统偏好变化，新增组件即时更新运动设置。该约定仅覆盖新增组件，原有 WebGL、GSAP 和滚动动画未在本轮改造。

## 复现浏览器检查

先运行 `npm run build`，再运行 `npm run preview -- --host 127.0.0.1 --port 5288 --strictPort`。

在另一个 PowerShell 终端执行：

```powershell
New-Item -ItemType Directory -Force -Path output/playwright | Out-Null
npx --yes --package @playwright/cli playwright-cli -s=pulsar-components open http://127.0.0.1:5288/#components --headed
npx --yes --package @playwright/cli playwright-cli -s=pulsar-components run-code --filename=scripts/verify-components.js --raw | Tee-Object -FilePath output/playwright/verification.json
$verification = Get-Content -Raw output/playwright/verification.json | ConvertFrom-Json
if ($verification.failed -ne 0 -or $verification.skipped -ne 0 -or $verification.total -lt 52) { throw '浏览器检查未达到门槛' }
```

本环境首次使用 npx 打印 CLI 帮助后发生 Windows libuv 退出错误；本轮实际检查使用 npm 缓存内同一 CLI 的 `playwright-cli.js` 直接调用 Node。检查脚本没有 React 注入钩子，也不修改生产逻辑。CLI 可能在返回 `### Error` 时仍退出 0，因此 JSON 解析及字段门槛是必须执行的判定。

字段断言结果、四套主题截图和 390px 布局截图位于 `output/playwright/`，Git 忽略这些生成物；检查源码和逐文件证据留在项目中。截图仅证明 UI 呈现，行为结论以 JSON 的实际字段等于预期字段为依据。

## 未覆盖范围（本轮未触及的相关路径/测试/分支）

- 本项目既有脚本只有 dev/build/preview，未配置单元或 e2e 套件。本轮新增浏览器检查，但未运行参考库 react-bits 的 `test:prop-docs`、`check:prop-docs`，它们不检查 PULSAR 的原创组件。
- 未验证组件受控模式的宿主集成、运行中更改 items/min/max、非法调用参数、`RippleButton.disabled` 分支或动态内容的所有布局情况。
- 本轮未读取或逐项回归所有原有组件：如 Dock、PromptBar、Aurora、Particles、Radar 的完整交互和失败分支；原有动画的减少动态效果行为也未验证。
- 390px 检查使用桌面 Chrome 视口，未覆盖真实触摸设备、Safari、Firefox、屏幕阅读器语音输出、刷新后的持久化、生产部署或实测帧率。

## 本轮改动可能引入的新风险

- 主包随组件接入增大；最终生产 JS 为 657.69 kB（gzip 219.75 kB），构建仍报告大于 500 kB 的分块警告。未采集加载时间、GPU 开销或帧率，不据此声称性能达标。
- 提示堆叠和 3D 翻面的运动在浏览器间可能不同；目前只检查 Windows Chrome。
- “重置试玩”会主动清除六个演示的当前状态；关闭或刷新页面也不保存状态。主题切换保留状态由浏览器字段断言检查。

被放弃的解释：本轮没有在 react-bits 参考库新增四种语言/样式版本及其注册、安装文档；若按“扩展参考库”解释，产物将是可通过其组件目录安装的库组件，而非当前 PULSAR 页面中的原创组件。本轮依据现有展示项目继续制作和试玩。
