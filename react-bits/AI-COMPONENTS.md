# 从组件库取用，而不是重写

本仓库是可复制的组件库；`../pulsar` 是试验场。新增组件不依赖试验场的主题、全局变量或内部 hooks。实现界面前，先检索现有组件，再选择风格和源码版本。

工作区还有 `../aceternity` 下载库。跨库全量盘点见 [../COMPONENT-INVENTORY.md](../COMPONENT-INVENTORY.md)，机器索引见 [../COMPONENT-INVENTORY.json](../COMPONENT-INVENTORY.json)，用户偏好与页面方向见 [../DESIGN-PREFERENCES.md](../DESIGN-PREFERENCES.md)。盘点按条目计数，四版本和 PULSAR 副本不重复计数；文件存在和下载快照对应不代表独立安装或行为验证。新增下载后在 `X:/myui` 执行 `node summarize-components.mjs` 刷新目录。

## AI 的取用顺序

1. 读 `src/constants/LocalCollection.js`：本地新增组件的名称、风格、中英文标签、源码路径、props、依赖和使用示例。也检索 `src/constants/Information.js` 和四个源码目录中的既有组件。
2. 按功能和风格选择组件，读该组件的 TypeScript 接口和 `src/constants/code/<分类>/<camelName>Code.js` 的完整用法。
3. 复制一个版本到目标项目，再安装 `motion`。目标项目需要 React；Tailwind 版本需要 Tailwind CSS 4 扫描复制后的文件。
4. 用 props、children、颜色和回调接入业务。已有组件可以表达需求时，不再另写同功能动画组件。确有缺口时，说明缺口并在组件库扩展。

快速检索：

```powershell
rg -n "像素|pixel|纸|paper|navigation|slider|button" src/constants/LocalCollection.js
rg --files src/content src/ts-default src/tailwind src/ts-tailwind
```

## 本地风格目录

| 组件 | 风格 | 用途与交互 |
| --- | --- | --- |
| ElasticTabs | 柔和极简 | 弹簧共享指示器、键盘标签页、保留面板内容 |
| OrbitSlider | 薄荷仪表 | 圆环轨道、原生范围输入、键盘调节 |
| RippleButton | 暖色触感 | 指针起点涟漪、键盘中心反馈 |
| SpringAccordion | 黑白编辑排版 | 编号、细分隔线、单项展开 |
| ToastStack | 磨砂玻璃 | 通知叠层、悬停展开、调用方控制列表与移除 |
| PostcardFlip | 旅行明信片 | 日光封面、邮戳背面、显式翻面 |
| ArcadeButton | 街机像素 | 方角、错位阴影、机械按压 |
| PaperNote | 手作便签 | 胶带、折角、可编辑文字、固定便签 |
| BauhausStepper | 包豪斯几何 | 三原色几何图形、自由切换步骤 |
| NeonToggle | 霓虹硬件 | 信号轨道、发光指示、开关 |
| VinylDeck | 复古黑胶 | 唱片纹理、唱针、旋转启停；仅视觉，无音频 |
| BubbleChoice | 糖果气泡 | 原生单选组、柔和形变与浮起 |
| MonoCommand | 黑白命令面板 | 搜索、上下键聚焦、选择回调、空结果恢复 |
| PixelMeter | 像素合成器 | 32 格像素矩阵、范围调节 |
| OrigamiNav | 淡紫折纸 | 折叠菜单、编号链接、折叠时内容 inert |
| TerminalStatus | 磷光终端 | 调用方状态展示，idle/running/success/error；无后台探测 |
| RibbonBadge | 复古丝带 | 折叠带尾、装饰徽标、展开说明 |
| BlueprintPanel | 工程蓝图 | 网格、装饰尺寸标注、展开规格 |
| DepthLiftCard | 全息标本 | 鼠标透视、背景/轨道/前景分层抬起、点击保持深度 |
| PrismDeck | 虹彩编辑卡组 | 标签切换推动整张卡片换位，后卡透视展开 |
| ApertureReveal | 瑞士画廊 | 跟随指针的圆形遮罩揭幕、点击保持、键盘聚焦揭幕 |
| OrbitStage | 太阳观测站 | 持续轨道运动、选择卫星切换中心内容 |
| ScrollTheater | 构成主义剧场 | 原生滚动联动平面扭转、前景视差、场景内容切换 |
| BeamPath | 电路光束 | SVG 曲线路径中的流动光包、中心呼吸光环 |
| KineticTiles | 新粗野主义操场 | 邻近指针的网格连片浮起、旋转、弹簧恢复 |
| ConveyorGallery | 模拟胶片 | 连续斜向胶片带、悬停与聚焦暂停、独立可访问卡片列表 |
| LiquidAction | 液态糖果 | 液滴持续绕行、悬停合并、磁性指针跟随、原生按钮 |
| ShutterText | 百叶窗字排 | 四切片交错 3D 翻转换字、时钟轮换、直接选词 |

## 四种源码版本

| 版本 | 根目录 | 需要复制 |
| --- | --- | --- |
| JS-CSS | `src/content` | `<Name>.jsx` 与同目录 `<Name>.css` |
| JS-TW | `src/tailwind` | `<Name>.jsx` |
| TS-CSS | `src/ts-default` | `<Name>.tsx` 与同目录 `<Name>.css` |
| TS-TW | `src/ts-tailwind` | `<Name>.tsx` |

每个路径继续接 `<分类>/<Name>/`，例如 `src/ts-default/Micro/ArcadeButton/ArcadeButton.tsx`。CSS 版本通过相邻相对路径导入样式；不要只复制 TSX/JSX。四种版本的行为代码由同一份定义生成，样式分别为命名 CSS 和 Tailwind 静态类。

示例：

```tsx
import ArcadeButton from './components/ArcadeButton/ArcadeButton';

export default function StartAction() {
  return <ArcadeButton label="START" onClick={() => console.log('Caller handles the action')} />;
}
```

受控输入保持 props 与回调同步。`NeonToggle` 使用 `checked`，`PostcardFlip` 使用 `flipped`，`OrigamiNav` 使用 `open`，`VinylDeck` 使用 `spinning`；其他选择/输入组件见其接口。`ToastStack.items` 和 `onDismiss` 由调用方维护，不负责消息投递或持久化。`BauhausStepper` 允许任意步骤切换，不负责表单校验。

新增组件都支持 `accent`、`surface`、`ink`、`className`，使用系统字体，不下载图片或字体。动态系统偏好 `prefers-reduced-motion` 的变化会触发重新渲染。`VinylDeck` 和 `TerminalStatus` 的长时动画由显式启动或 running 状态触发。

`OrbitStage`、`BeamPath`、`ConveyorGallery`、`LiquidAction` 和 `ShutterText` 默认播放装饰动效：有 `paused`、`speed` 和内置暂停按钮，在移出视口、后台标签页、减少动态偏好下冻结时钟。暂停不清空用户选择。`ConveyorGallery` 悬停/聚焦时暂停，`OrbitStage` 聚焦时暂停。恢复后从保留的时间继续。`speed=0` 冻结，非有限数值使用 1；这些值约束的是展示速度，不属于业务安全阈值。

## 按动态机制选择

这批主体动效参考 [Aceternity 的组件目录](https://ui.aceternity.com/components) 中的层次、路径和内容过渡机制，采用独立实现与不同的视觉构图。需要明显动态时，先选上表后 10 项；不要仅换配色。

| 需求 | 优先取用 | 接入入口 |
| --- | --- | --- |
| 立体分层卡片 | DepthLiftCard | `title`、`children`、`depth`；已有图片单层倾斜用 TiltedCard |
| 标签驱动整组内容运动 | PrismDeck | `items`、`value`、`onChange`；普通标签指示器用 ElasticTabs |
| 揭幕背后内容 | ApertureReveal | `children`、`open`、`onChange`；内部内容没有永久藏在鼠标手势后 |
| 动态关联主题 | OrbitStage | `items`、`value`、`onChange`、`speed` |
| 滚动空间叙事 | ScrollTheater | `items`、`height`、`onChange`；自带滚动容器与可直接到达的场景按钮 |
| 流动连接线 | BeamPath | `labels`、`title`、`children`、`speed`；不代表真实系统状态 |
| 指针影响邻近网格 | KineticTiles | `items`、`strength`、`onSelect` |
| 连续作品展示 | ConveyorGallery | `items` 中的 `content`、`onSelect`、`speed`；装饰复制区域 inert |
| 有生命感的操作按钮 | LiquidAction | `label`、`onClick`、`disabled`、`speed`；调用方处理真实操作 |
| 大幅换字 | ShutterText | `words`、`interval`、`onChange`；适合短标题，长句另选 TextLoop/RotatingText |

以上接口可传入调用方内容。PrismDeck/OrbitStage/ApertureReveal 支持受控状态；`ScrollTheater` 的 `onChange` 仅报告当前场景。没有音频、网络流程、自动发消息或数据持久化。使用持续动效时保留暂停入口；需要静态陈列时传 `paused`，无需删除动画代码。

## 本地预览与 registry

```powershell
npm ci
npm run build
npx vite preview --host 127.0.0.1 --port 5290 --strictPort
```

组件文档在 `http://localhost:5290/micro/arcade-button` 等目录地址。这些新增项没有发布到 reactbits.dev；不能使用官网同名路径安装它们。

本地安装包在 `public/r/<Name>-<版本>.json`。在目标项目先运行 `npx jsrepo init` 配置组件路径；已有配置可复用。例如运行本地预览后：

```powershell
npx jsrepo add http://localhost:5290/r/ArcadeButton-TS-CSS
```

jsrepo 3.2 将 `@components` 目标作为项目下的实际目录；源码与 CSS 都放在该目录，保持相邻。若要使用自己的组件目录，把这一对文件一起移动。shadcn 格式的安装器按项目的 components 别名解析目标。上述命令在目标项目目录中执行，不要用相对 `--cwd` 指向别处。

或者直接复制源码；机器离线时不依赖安装器。`public/llms.txt` 含完整现有目录，并明确区分本地新增项。

## 修改与检查

批量定义在 `scripts/local-collection/`；更改定义后运行 `node scripts/generateLocalCollection.mjs`，再跑 `node scripts/checkLocalCollection.mjs`、`npx tsc -p tsconfig.local-collection.json`、`npm run check:prop-docs` 和 `npm run build`。直接改生成文件会在下一次生成时被覆盖。

早期 18 项的行为检查采用 `scripts/createCollectionFixture.mjs` 与 `scripts/verifyLocalCollection.cjs`。后 10 项采用 `scripts/createMotionFixture.mjs` 与 `scripts/verifyMotionCollection.cjs`，先测试正常动效，再测试暂停/减少动态/移出视口。开发调用方不接入产品路由。重现命令、证据指纹、逐文件验证与未覆盖范围见 `WORKLOG.md`、`LOCAL-COLLECTION-EVIDENCE.md` 和 `MOTION-COLLECTION-EVIDENCE.md`。
