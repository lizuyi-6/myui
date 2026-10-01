# PULSAR 主题配色系统

> 本文档供后续开发者/AI agent 直接使用。配色方案是用户明确认可的风格，
> 其中 **暖阳（橙色系）** 和 **青柠汽水（绿色系）** 是用户最喜欢的两套，优先使用。

## 用户偏好（重要）

用户多次反馈：AI 生成的前端项目"每次都是黑色+紫色"，明确不喜欢这种默认配色。
**新项目默认用亮色/暖色起步**，深色只是可选项之一。抽象出来的两套通用配色：

- **暖橙（Sunset Warm）**：底 `#FFF8F0` 米白 / 墨 `#3D2C1E` 暖棕 / 强调 `#FF6B4A` 珊瑚橙 + `#F59E0B` 琥珀 / 极光 `['#FF6B4A','#FFB347','#FFD166']`
- **薄荷绿（Mint Fresh）**：底 `#F1FBF5` 浅薄荷 / 墨 `#12372A` 深绿 / 强调 `#0DBF77` 翠绿 + `#0EA5B7` 水鸭蓝 / 极光 `['#00E5A8','#38F8D4','#7CE0FF']`

## 本项目的四套主题

定义在 `src/App.jsx` 的 `THEMES` 数组（含全部字段），顺序即色球顺序，**第 0 个是默认主题（暖阳）**。
每个主题字段：

| 字段 | 含义 |
| --- | --- |
| `name` / `light` | 名称 / 是否浅色（决定 Aurora `lightMode`、雷达亮度等） |
| `stops` | Aurora 极光三色 |
| `bg` / `ink` | 页面底色 / 主文字色 |
| `muted` / `faint` / `ghost` | 次级文字 / 小标签 / 极淡文字（三级递淡） |
| `accent` / `accent2` | 主强调 / 次强调 |
| `card` / `border` / `wash` | 卡片底 / 边框 / 区块浅染色 |
| `particles` | 粒子四色 |
| `cta` | `{bg, border, star, text}` StarBorder 按钮四色 |
| `prompt` | `{bg, menu, spark}` PromptBar 三色 |
| `feed` | `{item, active, text, fade, thumb}` AnimatedList 事件流五色 |

### 完整色值（直接抄）

**1. 暖阳（默认，亮色暖橙）** — `light: true`
```
stops ['#FF6B4A','#FFB347','#FFD166']  bg '#FFF8F0'  ink '#3D2C1E'
muted '#8A7460' faint '#B3A18F' ghost '#CDBBA8'
accent '#FF6B4A' accent2 '#F59E0B'
card 'rgba(255,255,255,0.66)' border 'rgba(61,44,30,0.14)' wash 'rgba(255,255,255,0.55)'
particles ['#FF6B4A','#F59E0B','#FFB347','#FFD9A0']
cta {bg:'#FF6B4A', border:'#FFB347', star:'#FFE9C7', text:'#FFFFFF'}
prompt {bg:'#FFFFFF', menu:'#FFF3E6', spark:'#FF6B4A'}
feed {item:'#FFF1E3', active:'#FFE2CB', text:'#3D2C1E', fade:'#FFF6EC', thumb:'#EBD7C0'}
```

**2. 青柠汽水（亮色薄荷绿）** — `light: true`
```
stops ['#00E5A8','#38F8D4','#7CE0FF']  bg '#F1FBF5'  ink '#12372A'
muted '#5D8A77' faint '#93B5A4' ghost '#BDD4C6'
accent '#0DBF77' accent2 '#0EA5B7'
card 'rgba(255,255,255,0.62)' border 'rgba(18,55,42,0.14)' wash 'rgba(255,255,255,0.5)'
particles ['#0DBF77','#0EA5B7','#38F8D4','#7CE0FF']
cta {bg:'#0DBF77', border:'#38F8D4', star:'#DFFFF2', text:'#FFFFFF'}
prompt {bg:'#FFFFFF', menu:'#E8F6EE', spark:'#0DBF77'}
feed {item:'#ECF7F0', active:'#D9EFE2', text:'#12372A', fade:'#F1FBF5', thumb:'#C4DECE'}
```

**3. 蜜桃日落（暗色暖调，非冷黑）** — `light: false`
```
stops ['#FF5E3A','#FF8A5C','#FFC46B']  bg '#1E1216'  ink '#FFE9D8'
muted '#C9A896' faint '#9E7E6C' ghost '#6E4F44'
accent '#FF7A4D' accent2 '#FFB86B'
card 'rgba(255,255,255,0.045)' border 'rgba(255,233,216,0.12)' wash 'rgba(255,255,255,0.025)'
particles ['#FF8A5C','#FFB86B','#FFE9D8','#FF5E3A']
cta {bg:'#FF7A4D', border:'#FFB86B', star:'#FFE9D8', text:'#33160B'}
prompt {bg:'#2B1A1F', menu:'#3B242B', spark:'#FFB86B'}
feed {item:'#2B1B21', active:'#3C262E', text:'#FFE9D8', fade:'#1E1216', thumb:'#4A2E36'}
```

**4. 经典深夜（原深紫，保留选项）** — `light: false`
```
stops ['#5227FF','#B537F2','#00E5FF']  bg '#030014'  ink '#E2E8F0'
muted '#94A3B8' faint '#64748B' ghost '#334155'
accent '#A78BFA' accent2 '#22D3EE'
card 'rgba(255,255,255,0.03)' border 'rgba(255,255,255,0.08)' wash 'rgba(255,255,255,0.02)'
particles ['#a78bfa','#e879f9','#22d3ee','#ffffff']
cta {bg:'#7C3AED', border:'#A78BFA', star:'#C4B5FD', text:'#FFFFFF'}
prompt {bg:'#131028', menu:'#1B1533', spark:'#C4B5FD'}
feed {item:'#111111', active:'#222222', text:'#FFFFFF', fade:'#120F17', thumb:'#222222'}
```

## 工作机制

1. `themeVars(t)` 把主题展开成 CSS 变量（`--bg --ink --muted --faint --ghost --card --border --wash --accent --accent2`，以及由 `rgba()` 派生的 `--accent-soft/-softer/-hover/-border`、`--reply-bg/-border`、`--sel`），同时挂在根 div 的 `style` 和 `:root`（effect 里 setProperty，保证 fixed 定位的兄弟元素——进度条、光标——也能取到）。
2. 全站样式一律写 `text-[var(--ink)]`、`bg-[var(--card)]` 这类**变量任意值**，不写 Tailwind 调色板色。
3. react-bits 组件全部通过**颜色 prop** 接主题：Aurora `colorStops/lightMode`、Particles `particleColors`、ClickSpark `sparkColor`、TargetCursor `cursorColor/cursorColorOnTarget`、GradientText `colors=[accent,accent2,accent]`、ShinyText `color/shineColor`、StarBorder `color/backgroundColor/borderColor/textColor`、SpotlightCard `spotlightColor`（用 `rgba(t.accent,…)` 派生）、TrueFocus `borderColor/glowColor`、SquishSwitch `trackColor/trackOnColor`、PromptBar `background/menuBackground/sparkColor/color(=ink,浅色主题必须传否则文字不可见)`、Radar `color/backgroundColor/brightness(浅色 1.4 / 深色 0.5)`、LogoLoop `fadeOutColor(=bg)`、TextType/DecryptedText 用 className 套变量。
4. **改 vendored 组件用「var+默认值」模式，不要靠外部 className 覆盖**：Tailwind 同权重类的胜负由样式表排序决定，传入类不保证赢。已改的组件：AnimatedList（`--al-item/-item-active/-text/-fade/-thumb`，App 在事件流卡片上注入）、SpotlightCard（直接复用全局 `var(--card,#171717)` / `var(--border,#262626)`）。Dock 刻意保留深色（macOS 风格，勿改）。
5. `index.css`：body 底色/文字色 = 默认主题值（首帧防白闪），`::selection` 用 `var(--sel)`。

## 性能约定（已做，别回退）

- 三个全屏 WebGL 画布（Aurora/Particles/Radar）用 `useNearViewport()`（IntersectionObserver，rootMargin 300px）**按需挂载**，滚远即卸载。
- ClickSpark 的 rAF 循环**无火花时自动停**、点击时经 `startLoopRef` 重启（原本空闲也每帧清 6.7MP 画布）。
- Aurora 的 `antialias: false`（全屏单三角形 shader 无意义）。

## 验证新配色/新主题的方法

`python X:/myui/theme_shots.py`（kiosk Chrome + CDP 9223，或参考其内嵌的极简 WebSocket 客户端）：
对每个主题点 `button[aria-label="切换配色：<名>"]`，等 ~4s（Aurora 重建），截图 hero/lab/playground/radar 四个位置，人工检查浅色主题下文字可读性。构建验证：`npm run build`。

## 新增主题清单

在 `THEMES` 数组插入一个完整对象即可，全站（含组件）自动跟随，无需改任何样式；
注意填全 `cta/prompt/feed` 三组派生色，浅色主题记得 `light: true`（影响 Aurora 与雷达亮度）。
