# R4 组件盘点与偏好文档逐文件证据

首次出现：R4 / 2026-09-30。状态：部分完成；目录事实有字段断言，组件运行能力本轮不重新认证。

环境：Windows / Node 24.13.1 / X:/myui 当前源码；前置条件为React Bits注册元数据、Aceternity落盘快照及R3指纹文件。重现：`node summarize-components.mjs --evidence`。R3输出为本机忽略目录，缺失时不能重现历史SHA比较，脚本会报错；不以缺失时的猜测放行。

库条目=361，目录表行=361；Aceternity文件内容与保存registry相等=127；本地文档链接目标存在=401。这些断言直接证明目录对应和链接存在，与待证命题是同一件事；runtimeAssertionsThisRound=0，不证明安装、交互或性能。

整个当前git diff文件=382（包括R2/R3，未自行收窄）；本轮只修改其中AI-COMPONENTS.md、WORKLOG.md，其余逐文件与R3指纹比较。额外新增文件位于工作区根目录，单独列出。

## Git中的整个改动集

| 文件 | 改动语义 | R4证据或明确未验证声明 |
| --- | --- | --- |
| .gitignore | 忽略开发调用方与证据输出，保留可复用 AGENTS（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| AGENTS.md | 后续 AI 的组件复用入口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| AI-COMPONENTS.md | 保留库取用约定，增加跨库盘点与偏好入口 | 3个相对链接文字和目标存在断言；未来AI是否遵循未验证 |
| LOCAL-COLLECTION-EVIDENCE.md | 本轮逐文件证据（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| MOTION-COLLECTION-EVIDENCE.md | R3逐文件证据与边界（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| README.md | 28项本地扩展入口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| WORKLOG.md | 追加R4事实、命令、失败、边界与文档风险 | R4段存在断言；统计见当前脚本输出；叙述不代替行为证据 |
| jsrepo.config.ts | 本地新增项的 CSS/源码相邻 target（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| package.json | registry build 串联规范化（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/llms.txt | 28项本地来源/源码/安装目录（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ApertureReveal-JS-CSS.json | ApertureReveal JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ApertureReveal-JS-TW.json | ApertureReveal JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ApertureReveal-TS-CSS.json | ApertureReveal TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ApertureReveal-TS-TW.json | ApertureReveal TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ArcadeButton-JS-CSS.json | ArcadeButton JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ArcadeButton-JS-TW.json | ArcadeButton JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ArcadeButton-TS-CSS.json | ArcadeButton TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ArcadeButton-TS-TW.json | ArcadeButton TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BauhausStepper-JS-CSS.json | BauhausStepper JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BauhausStepper-JS-TW.json | BauhausStepper JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BauhausStepper-TS-CSS.json | BauhausStepper TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BauhausStepper-TS-TW.json | BauhausStepper TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BeamPath-JS-CSS.json | BeamPath JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BeamPath-JS-TW.json | BeamPath JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BeamPath-TS-CSS.json | BeamPath TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BeamPath-TS-TW.json | BeamPath TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BlueprintPanel-JS-CSS.json | BlueprintPanel JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BlueprintPanel-JS-TW.json | BlueprintPanel JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BlueprintPanel-TS-CSS.json | BlueprintPanel TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BlueprintPanel-TS-TW.json | BlueprintPanel TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BubbleChoice-JS-CSS.json | BubbleChoice JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BubbleChoice-JS-TW.json | BubbleChoice JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BubbleChoice-TS-CSS.json | BubbleChoice TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/BubbleChoice-TS-TW.json | BubbleChoice TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ConveyorGallery-JS-CSS.json | ConveyorGallery JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ConveyorGallery-JS-TW.json | ConveyorGallery JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ConveyorGallery-TS-CSS.json | ConveyorGallery TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ConveyorGallery-TS-TW.json | ConveyorGallery TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/DepthLiftCard-JS-CSS.json | DepthLiftCard JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/DepthLiftCard-JS-TW.json | DepthLiftCard JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/DepthLiftCard-TS-CSS.json | DepthLiftCard TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/DepthLiftCard-TS-TW.json | DepthLiftCard TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ElasticTabs-JS-CSS.json | ElasticTabs JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ElasticTabs-JS-TW.json | ElasticTabs JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ElasticTabs-TS-CSS.json | ElasticTabs TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ElasticTabs-TS-TW.json | ElasticTabs TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/KineticTiles-JS-CSS.json | KineticTiles JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/KineticTiles-JS-TW.json | KineticTiles JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/KineticTiles-TS-CSS.json | KineticTiles TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/KineticTiles-TS-TW.json | KineticTiles TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/LiquidAction-JS-CSS.json | LiquidAction JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/LiquidAction-JS-TW.json | LiquidAction JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/LiquidAction-TS-CSS.json | LiquidAction TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/LiquidAction-TS-TW.json | LiquidAction TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/MonoCommand-JS-CSS.json | MonoCommand JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/MonoCommand-JS-TW.json | MonoCommand JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/MonoCommand-TS-CSS.json | MonoCommand TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/MonoCommand-TS-TW.json | MonoCommand TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/NeonToggle-JS-CSS.json | NeonToggle JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/NeonToggle-JS-TW.json | NeonToggle JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/NeonToggle-TS-CSS.json | NeonToggle TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/NeonToggle-TS-TW.json | NeonToggle TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitSlider-JS-CSS.json | OrbitSlider JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitSlider-JS-TW.json | OrbitSlider JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitSlider-TS-CSS.json | OrbitSlider TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitSlider-TS-TW.json | OrbitSlider TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitStage-JS-CSS.json | OrbitStage JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitStage-JS-TW.json | OrbitStage JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitStage-TS-CSS.json | OrbitStage TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrbitStage-TS-TW.json | OrbitStage TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrigamiNav-JS-CSS.json | OrigamiNav JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrigamiNav-JS-TW.json | OrigamiNav JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrigamiNav-TS-CSS.json | OrigamiNav TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/OrigamiNav-TS-TW.json | OrigamiNav TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PaperNote-JS-CSS.json | PaperNote JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PaperNote-JS-TW.json | PaperNote JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PaperNote-TS-CSS.json | PaperNote TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PaperNote-TS-TW.json | PaperNote TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PixelMeter-JS-CSS.json | PixelMeter JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PixelMeter-JS-TW.json | PixelMeter JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PixelMeter-TS-CSS.json | PixelMeter TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PixelMeter-TS-TW.json | PixelMeter TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PostcardFlip-JS-CSS.json | PostcardFlip JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PostcardFlip-JS-TW.json | PostcardFlip JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PostcardFlip-TS-CSS.json | PostcardFlip TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PostcardFlip-TS-TW.json | PostcardFlip TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PrismDeck-JS-CSS.json | PrismDeck JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PrismDeck-JS-TW.json | PrismDeck JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PrismDeck-TS-CSS.json | PrismDeck TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/PrismDeck-TS-TW.json | PrismDeck TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RibbonBadge-JS-CSS.json | RibbonBadge JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RibbonBadge-JS-TW.json | RibbonBadge JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RibbonBadge-TS-CSS.json | RibbonBadge TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RibbonBadge-TS-TW.json | RibbonBadge TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RippleButton-JS-CSS.json | RippleButton JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RippleButton-JS-TW.json | RippleButton JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RippleButton-TS-CSS.json | RippleButton TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/RippleButton-TS-TW.json | RippleButton TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ScrollTheater-JS-CSS.json | ScrollTheater JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ScrollTheater-JS-TW.json | ScrollTheater JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ScrollTheater-TS-CSS.json | ScrollTheater TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ScrollTheater-TS-TW.json | ScrollTheater TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ShutterText-JS-CSS.json | ShutterText JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ShutterText-JS-TW.json | ShutterText JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ShutterText-TS-CSS.json | ShutterText TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ShutterText-TS-TW.json | ShutterText TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/SpringAccordion-JS-CSS.json | SpringAccordion JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/SpringAccordion-JS-TW.json | SpringAccordion JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/SpringAccordion-TS-CSS.json | SpringAccordion TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/SpringAccordion-TS-TW.json | SpringAccordion TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/TerminalStatus-JS-CSS.json | TerminalStatus JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/TerminalStatus-JS-TW.json | TerminalStatus JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/TerminalStatus-TS-CSS.json | TerminalStatus TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/TerminalStatus-TS-TW.json | TerminalStatus TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ToastStack-JS-CSS.json | ToastStack JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ToastStack-JS-TW.json | ToastStack JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ToastStack-TS-CSS.json | ToastStack TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/ToastStack-TS-TW.json | ToastStack TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/VinylDeck-JS-CSS.json | VinylDeck JS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/VinylDeck-JS-TW.json | VinylDeck JS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/VinylDeck-TS-CSS.json | VinylDeck TS-CSS 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/VinylDeck-TS-TW.json | VinylDeck TS-TW 本地安装包（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| public/r/registry.json | 112个本地包索引（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/captureMotionShowcase.cjs | 真实DOM动作/截图录像取样（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/checkLocalCollection.mjs | 独立性/源码解析/四版本逻辑与CSS同步断言（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/checkLocalRegistry.mjs | 载荷/目标/来源/原包/安装/canonical断言（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/checkPropDocs.test.js | Windows fixture根目录解析（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/collectMotionEvidence.mjs | 四批结果/样式/历史指纹/逐文件机械门禁（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/createCollectionFixture.mjs | 隔离的正常受控/非受控测试调用方（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/createInstalledFixture.mjs | 真实安装项目无主题调用方（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/createMotionFixture.mjs | 40份真实源码的正常props调用方（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/createMotionInstalledFixture.mjs | 真实安装源/样式相等与独立调用方入口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/generateLlmsText.js | 生成本地 AI 文档路径/来源提示（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/generateLocalCollection.mjs | 新增十项定义、hooks/types 导入、属性选择器与公开 data-part 生成（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/generateLocalEvidence.mjs | 本报告与证据指纹/变更集生成（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/generateRouteMeta.js | 本地组件 canonical 使用实际 docsUrl（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/generateRss.js | 官方RSS排除尚未发布的本地新增项（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/core.mjs | 四种实现共用的组件/样式/API定义源（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/essential.mjs | 四种实现共用的组件/样式/API定义源（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/expressive.mjs | 四种实现共用的组件/样式/API定义源（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/kinetic.mjs | 十项动效定义或可复制时钟模板（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/playful.mjs | 四种实现共用的组件/样式/API定义源（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/scene-core.mjs | 十项动效定义或可复制时钟模板（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/local-collection/spatial.mjs | 十项动效定义或可复制时钟模板（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/normalizeRegistry.mjs | LF/稳定文件顺序与本地来源恢复（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyInstalledCollection.cjs | 独立CLI安装实例的样式/回调检查（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyLocalCollection.cjs | 组件真实行为检查与字段记录（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyLocalDocs.cjs | 生产文档预览/源码/参数呈现检查（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyMotionCollection.cjs | 正常动效/原生操作/偏好/视口/空值等字段断言（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyMotionDocs.cjs | 十个生产库路由/props/源码/registry UI呈现（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/verifyMotionInstalled.cjs | 两项安装后行为检查（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| scripts/watchRegistry.js | 监听本地元数据、成功后规范化（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/Categories.js | 分类中追加本地18项（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/Components.js | 合并本地惰性路由（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/Information.js | 合并本地 metadata（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/LocalCollection.js | 28项机器目录、风格/中英文标签/API/路径（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/LocalComponents.js | 28份惰性 demo 入口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/apertureRevealCode.js | ApertureReveal 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/bauhausStepperCode.js | BauhausStepper 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/beamPathCode.js | BeamPath 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/blueprintPanelCode.js | BlueprintPanel 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/conveyorGalleryCode.js | ConveyorGallery 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/depthLiftCardCode.js | DepthLiftCard 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/kineticTilesCode.js | KineticTiles 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/liquidActionCode.js | LiquidAction 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/monoCommandCode.js | MonoCommand 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/orbitStageCode.js | OrbitStage 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/origamiNavCode.js | OrigamiNav 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/prismDeckCode.js | PrismDeck 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/scrollTheaterCode.js | ScrollTheater 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/shutterTextCode.js | ShutterText 五份原始源码与示例（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Components/vinylDeckCode.js | VinylDeck 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/arcadeButtonCode.js | ArcadeButton 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/bubbleChoiceCode.js | BubbleChoice 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/elasticTabsCode.js | ElasticTabs 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/neonToggleCode.js | NeonToggle 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/orbitSliderCode.js | OrbitSlider 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/paperNoteCode.js | PaperNote 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/pixelMeterCode.js | PixelMeter 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/postcardFlipCode.js | PostcardFlip 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/ribbonBadgeCode.js | RibbonBadge 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/rippleButtonCode.js | RippleButton 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/springAccordionCode.js | SpringAccordion 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/terminalStatusCode.js | TerminalStatus 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/constants/code/Micro/toastStackCode.js | ToastStack 五份 raw 源码、使用示例与依赖（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ApertureReveal/ApertureReveal.css | ApertureReveal content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ApertureReveal/ApertureReveal.jsx | ApertureReveal content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BauhausStepper/BauhausStepper.css | BauhausStepper content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BauhausStepper/BauhausStepper.jsx | BauhausStepper content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BeamPath/BeamPath.css | BeamPath content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BeamPath/BeamPath.jsx | BeamPath content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BlueprintPanel/BlueprintPanel.css | BlueprintPanel content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/BlueprintPanel/BlueprintPanel.jsx | BlueprintPanel content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ConveyorGallery/ConveyorGallery.css | ConveyorGallery content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ConveyorGallery/ConveyorGallery.jsx | ConveyorGallery content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/DepthLiftCard/DepthLiftCard.css | DepthLiftCard content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/DepthLiftCard/DepthLiftCard.jsx | DepthLiftCard content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/KineticTiles/KineticTiles.css | KineticTiles content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/KineticTiles/KineticTiles.jsx | KineticTiles content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/LiquidAction/LiquidAction.css | LiquidAction content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/LiquidAction/LiquidAction.jsx | LiquidAction content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/MonoCommand/MonoCommand.css | MonoCommand content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/MonoCommand/MonoCommand.jsx | MonoCommand content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/OrbitStage/OrbitStage.css | OrbitStage content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/OrbitStage/OrbitStage.jsx | OrbitStage content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/OrigamiNav/OrigamiNav.css | OrigamiNav content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/OrigamiNav/OrigamiNav.jsx | OrigamiNav content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/PrismDeck/PrismDeck.css | PrismDeck content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/PrismDeck/PrismDeck.jsx | PrismDeck content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ScrollTheater/ScrollTheater.css | ScrollTheater content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ScrollTheater/ScrollTheater.jsx | ScrollTheater content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ShutterText/ShutterText.css | ShutterText content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/ShutterText/ShutterText.jsx | ShutterText content 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/VinylDeck/VinylDeck.css | VinylDeck content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Components/VinylDeck/VinylDeck.jsx | VinylDeck content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ArcadeButton/ArcadeButton.css | ArcadeButton content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ArcadeButton/ArcadeButton.jsx | ArcadeButton content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/BubbleChoice/BubbleChoice.css | BubbleChoice content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/BubbleChoice/BubbleChoice.jsx | BubbleChoice content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ElasticTabs/ElasticTabs.css | ElasticTabs content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ElasticTabs/ElasticTabs.jsx | ElasticTabs content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/NeonToggle/NeonToggle.css | NeonToggle content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/NeonToggle/NeonToggle.jsx | NeonToggle content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/OrbitSlider/OrbitSlider.css | OrbitSlider content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/OrbitSlider/OrbitSlider.jsx | OrbitSlider content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PaperNote/PaperNote.css | PaperNote content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PaperNote/PaperNote.jsx | PaperNote content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PixelMeter/PixelMeter.css | PixelMeter content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PixelMeter/PixelMeter.jsx | PixelMeter content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PostcardFlip/PostcardFlip.css | PostcardFlip content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/PostcardFlip/PostcardFlip.jsx | PostcardFlip content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/RibbonBadge/RibbonBadge.css | RibbonBadge content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/RibbonBadge/RibbonBadge.jsx | RibbonBadge content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/RippleButton/RippleButton.css | RippleButton content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/RippleButton/RippleButton.jsx | RippleButton content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/SpringAccordion/SpringAccordion.css | SpringAccordion content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/SpringAccordion/SpringAccordion.jsx | SpringAccordion content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/TerminalStatus/TerminalStatus.css | TerminalStatus content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/TerminalStatus/TerminalStatus.jsx | TerminalStatus content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ToastStack/ToastStack.css | ToastStack content 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/content/Micro/ToastStack/ToastStack.jsx | ToastStack content 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/ApertureRevealDemo.jsx | ApertureReveal 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/BauhausStepperDemo.jsx | BauhausStepper 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/BeamPathDemo.jsx | BeamPath 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/BlueprintPanelDemo.jsx | BlueprintPanel 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/ConveyorGalleryDemo.jsx | ConveyorGallery 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/DepthLiftCardDemo.jsx | DepthLiftCard 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/KineticTilesDemo.jsx | KineticTiles 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/LiquidActionDemo.jsx | LiquidAction 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/MonoCommandDemo.jsx | MonoCommand 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/OrbitStageDemo.jsx | OrbitStage 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/OrigamiNavDemo.jsx | OrigamiNav 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/PrismDeckDemo.jsx | PrismDeck 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/ScrollTheaterDemo.jsx | ScrollTheater 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/ShutterTextDemo.jsx | ShutterText 库文档/props/使用源码（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Components/VinylDeckDemo.jsx | VinylDeck 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/ArcadeButtonDemo.jsx | ArcadeButton 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/BubbleChoiceDemo.jsx | BubbleChoice 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/ElasticTabsDemo.jsx | ElasticTabs 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/NeonToggleDemo.jsx | NeonToggle 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/OrbitSliderDemo.jsx | OrbitSlider 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/PaperNoteDemo.jsx | PaperNote 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/PixelMeterDemo.jsx | PixelMeter 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/PostcardFlipDemo.jsx | PostcardFlip 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/RibbonBadgeDemo.jsx | RibbonBadge 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/RippleButtonDemo.jsx | RippleButton 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/SpringAccordionDemo.jsx | SpringAccordion 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/TerminalStatusDemo.jsx | TerminalStatus 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/demo/Micro/ToastStackDemo.jsx | ToastStack 独立库文档示例/参数表/代码页（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/ApertureReveal/ApertureReveal.jsx | ApertureReveal tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/BauhausStepper/BauhausStepper.jsx | BauhausStepper tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/BeamPath/BeamPath.jsx | BeamPath tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/BlueprintPanel/BlueprintPanel.jsx | BlueprintPanel tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/ConveyorGallery/ConveyorGallery.jsx | ConveyorGallery tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/DepthLiftCard/DepthLiftCard.jsx | DepthLiftCard tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/KineticTiles/KineticTiles.jsx | KineticTiles tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/LiquidAction/LiquidAction.jsx | LiquidAction tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/MonoCommand/MonoCommand.jsx | MonoCommand tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/OrbitStage/OrbitStage.jsx | OrbitStage tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/OrigamiNav/OrigamiNav.jsx | OrigamiNav tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/PrismDeck/PrismDeck.jsx | PrismDeck tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/ScrollTheater/ScrollTheater.jsx | ScrollTheater tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/ShutterText/ShutterText.jsx | ShutterText tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Components/VinylDeck/VinylDeck.jsx | VinylDeck tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/ArcadeButton/ArcadeButton.jsx | ArcadeButton tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/BubbleChoice/BubbleChoice.jsx | BubbleChoice tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/ElasticTabs/ElasticTabs.jsx | ElasticTabs tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/NeonToggle/NeonToggle.jsx | NeonToggle tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/OrbitSlider/OrbitSlider.jsx | OrbitSlider tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/PaperNote/PaperNote.jsx | PaperNote tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/PixelMeter/PixelMeter.jsx | PixelMeter tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/PostcardFlip/PostcardFlip.jsx | PostcardFlip tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/RibbonBadge/RibbonBadge.jsx | RibbonBadge tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/RippleButton/RippleButton.jsx | RippleButton tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/SpringAccordion/SpringAccordion.jsx | SpringAccordion tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/TerminalStatus/TerminalStatus.jsx | TerminalStatus tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/tailwind/Micro/ToastStack/ToastStack.jsx | ToastStack tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ApertureReveal/ApertureReveal.css | ApertureReveal ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ApertureReveal/ApertureReveal.tsx | ApertureReveal ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BauhausStepper/BauhausStepper.css | BauhausStepper ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BauhausStepper/BauhausStepper.tsx | BauhausStepper ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BeamPath/BeamPath.css | BeamPath ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BeamPath/BeamPath.tsx | BeamPath ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BlueprintPanel/BlueprintPanel.css | BlueprintPanel ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/BlueprintPanel/BlueprintPanel.tsx | BlueprintPanel ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ConveyorGallery/ConveyorGallery.css | ConveyorGallery ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ConveyorGallery/ConveyorGallery.tsx | ConveyorGallery ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/DepthLiftCard/DepthLiftCard.css | DepthLiftCard ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/DepthLiftCard/DepthLiftCard.tsx | DepthLiftCard ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/KineticTiles/KineticTiles.css | KineticTiles ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/KineticTiles/KineticTiles.tsx | KineticTiles ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/LiquidAction/LiquidAction.css | LiquidAction ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/LiquidAction/LiquidAction.tsx | LiquidAction ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/MonoCommand/MonoCommand.css | MonoCommand ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/MonoCommand/MonoCommand.tsx | MonoCommand ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/OrbitStage/OrbitStage.css | OrbitStage ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/OrbitStage/OrbitStage.tsx | OrbitStage ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/OrigamiNav/OrigamiNav.css | OrigamiNav ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/OrigamiNav/OrigamiNav.tsx | OrigamiNav ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/PrismDeck/PrismDeck.css | PrismDeck ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/PrismDeck/PrismDeck.tsx | PrismDeck ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ScrollTheater/ScrollTheater.css | ScrollTheater ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ScrollTheater/ScrollTheater.tsx | ScrollTheater ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ShutterText/ShutterText.css | ShutterText ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/ShutterText/ShutterText.tsx | ShutterText ts-default 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/VinylDeck/VinylDeck.css | VinylDeck ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Components/VinylDeck/VinylDeck.tsx | VinylDeck ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ArcadeButton/ArcadeButton.css | ArcadeButton ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ArcadeButton/ArcadeButton.tsx | ArcadeButton ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/BubbleChoice/BubbleChoice.css | BubbleChoice ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/BubbleChoice/BubbleChoice.tsx | BubbleChoice ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ElasticTabs/ElasticTabs.css | ElasticTabs ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ElasticTabs/ElasticTabs.tsx | ElasticTabs ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/NeonToggle/NeonToggle.css | NeonToggle ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/NeonToggle/NeonToggle.tsx | NeonToggle ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/OrbitSlider/OrbitSlider.css | OrbitSlider ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/OrbitSlider/OrbitSlider.tsx | OrbitSlider ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PaperNote/PaperNote.css | PaperNote ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PaperNote/PaperNote.tsx | PaperNote ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PixelMeter/PixelMeter.css | PixelMeter ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PixelMeter/PixelMeter.tsx | PixelMeter ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PostcardFlip/PostcardFlip.css | PostcardFlip ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/PostcardFlip/PostcardFlip.tsx | PostcardFlip ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/RibbonBadge/RibbonBadge.css | RibbonBadge ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/RibbonBadge/RibbonBadge.tsx | RibbonBadge ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/RippleButton/RippleButton.css | RippleButton ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/RippleButton/RippleButton.tsx | RippleButton ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/SpringAccordion/SpringAccordion.css | SpringAccordion ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/SpringAccordion/SpringAccordion.tsx | SpringAccordion ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/TerminalStatus/TerminalStatus.css | TerminalStatus ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/TerminalStatus/TerminalStatus.tsx | TerminalStatus ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ToastStack/ToastStack.css | ToastStack ts-default 命名样式（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-default/Micro/ToastStack/ToastStack.tsx | ToastStack ts-default 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/ApertureReveal/ApertureReveal.tsx | ApertureReveal ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/BauhausStepper/BauhausStepper.tsx | BauhausStepper ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/BeamPath/BeamPath.tsx | BeamPath ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/BlueprintPanel/BlueprintPanel.tsx | BlueprintPanel ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/ConveyorGallery/ConveyorGallery.tsx | ConveyorGallery ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/DepthLiftCard/DepthLiftCard.tsx | DepthLiftCard ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/KineticTiles/KineticTiles.tsx | KineticTiles ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/LiquidAction/LiquidAction.tsx | LiquidAction ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/MonoCommand/MonoCommand.tsx | MonoCommand ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/OrbitStage/OrbitStage.tsx | OrbitStage ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/OrigamiNav/OrigamiNav.tsx | OrigamiNav ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/PrismDeck/PrismDeck.tsx | PrismDeck ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/ScrollTheater/ScrollTheater.tsx | ScrollTheater ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/ShutterText/ShutterText.tsx | ShutterText ts-tailwind 的主体动效/样式/正常调用接口（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Components/VinylDeck/VinylDeck.tsx | VinylDeck ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/ArcadeButton/ArcadeButton.tsx | ArcadeButton ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/BubbleChoice/BubbleChoice.tsx | BubbleChoice ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/ElasticTabs/ElasticTabs.tsx | ElasticTabs ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/NeonToggle/NeonToggle.tsx | NeonToggle ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/OrbitSlider/OrbitSlider.tsx | OrbitSlider ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/PaperNote/PaperNote.tsx | PaperNote ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/PixelMeter/PixelMeter.tsx | PixelMeter ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/PostcardFlip/PostcardFlip.tsx | PostcardFlip ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/RibbonBadge/RibbonBadge.tsx | RibbonBadge ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/RippleButton/RippleButton.tsx | RippleButton ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/SpringAccordion/SpringAccordion.tsx | SpringAccordion ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/TerminalStatus/TerminalStatus.tsx | TerminalStatus ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| src/ts-tailwind/Micro/ToastStack/ToastStack.tsx | ToastStack ts-tailwind 独立实现/props/事件与动态（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |
| tsconfig.local-collection.json | 56份本地TS实现的严格类型范围（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |

## 工作区根目录新增产物

| 文件 | 改动语义 | 证据或明确未验证声明 |
| --- | --- | --- |
| summarize-components.mjs | 可重现盘点脚本 | 注册入口==磁盘；下载名==API==日志；保存registry内容==源码；没有行为测试；首次R4，mtime=2026-09-30T04:39:10.924Z，SHA256=deed7ffb603239e728881f17a61f9ed416057749798782c32c22b5918eded521 |
| COMPONENT-INVENTORY.json | 来源、源码、依赖、四版本、SHA/mtime机器目录 | 361个库ID唯一；源码集合SHA见目录；导入正则不是完整依赖解析；首次R4，mtime=2026-09-30T04:41:38.592Z，SHA256=fc0345b0969ffabe908f6d64bde20b5c708ce4cdd3d4a0c476dea923bb0d4fda |
| COMPONENT-INVENTORY.md | 全量分类表与取用边界 | 361个条目逐项出现在表格；链接存在断言，不证明API语义；首次R4，mtime=2026-09-30T04:41:38.595Z，SHA256=286bafdcfffe8151073809c040c693f0051a7b664f5d8a9392654c7cf95ae21e |
| DESIGN-PREFERENCES.md | 原话/历史偏好/设计推断与可选页面方向 | 本地引用目标存在；个人审美判断未作用户确认或视觉验收；首次R4，mtime=2026-09-30T04:34:41.044Z，SHA256=51e6dc6ab74213e756f576c0ac4ddf308c5b96b0dcde51b8f862d56ccc8807d7 |
| SUMMARY-EVIDENCE.md | 当前逐文件证据与边界 | git文件表行数等于当前diff文件数；自引用文档不独立证明行为，SHA可用Get-FileHash采集 |

历史文件SHA相等=380/380。同一旧证据不提高完成度动词。

## 未覆盖范围

没有重跑R2/R3浏览器、verifyMotionCollection/verifyLocalCollection/verifyInstalledCollection、checkPropDocs.test.js、build、tsc或完整lint；Aceternity未独立安装/编译/运行。没有逐项人工阅读全文、检查全部空值/错误/宿主别名/资源/SSR分支、许可证适用方式、Safari、真实触摸、无障碍或性能。工作区外组件下载未扫描。

## 本轮改动可能引入的新风险

目录快照会随下载过时；相似组件不等价；正则技术范式不等于实际交互；历史偏好不代表所有项目的新要求。来源、接口和推断分层用于限定这些风险。本轮源码无新变化的命题仅由上述SHA比较支持，不以旧绿套件推出新行为结论。
