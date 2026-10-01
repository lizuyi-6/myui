# Aceternity UI 免费组件 — 按技术范式分类

> 共 122 项（组件/块/hook 合并），位于 `by-paradigm/<类>/<名>/`；
> 类别按学习难度递进排序（简单→复杂）。每个目录内 `component.json` 含完整检测信号。

## 01-static-visual — 静态视觉（17）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Grid** `grid` | components | 15 | — |
| **Label** `label` | components | 23 | — |
| **Use Outside Click** `use-outside-click` | hooks | 25 | — |
| **Tailwind CSS buttons** `tailwindcss-buttons` | components | 29 | — |
| **Cards Demo 1** `cards-demo-1` | blocks | 31 | — |
| **Cards Demo 2** `cards-demo-2` | blocks | 43 | — |
| **Bento Grid** `bento-grid` | components | 55 | — |
| **Focus Cards** `focus-cards` | components | 69 | — |
| **Scales** `scales` | components | 82 | — |
| **Features Section Demo 2** `features-section-demo-2` | blocks | 110 | — |
| **Code Block** `code-block` | components | 115 | — |
| **Glare Card** `glare-card` | components | 135 | — |
| **3d Card** `3d-card` | components | 156 | — |
| **Encrypted Text** `encrypted-text` | components | 157 | useInView |
| **Glowing Effect** `glowing-effect` | components | 191 | — |
| **Carousel** `carousel` | components | 215 | — |
| **Terminal** `terminal` | components | 524 | useInView |

## 02-css-keyframes — 纯CSS/Tailwind关键帧（3）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Aurora Background** `aurora-background` | components | 62 | animate-aurora |
| **Infinite Moving Cards** `infinite-moving-cards` | components | 118 | animate-scroll |
| **Background Ripple Effect** `background-ripple-effect` | components | 134 | animate-cell-ripple |

## 03-enter-exit — motion声明式/进出场编排（44）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Meteor Effect** `meteors` | components | 45 | animate-meteor-effect |
| **Colourful Text** `colourful-text` | components | 55 | — |
| **Layout Text Flip** `layout-text-flip` | components | 59 | AnimatePresence, layoutId |
| **Text Generate Effect** `text-generate-effect` | components | 63 | useAnimate, stagger |
| **Magnetic Button** `magnetic-button` | components | 64 | — |
| **Background Gradient** `background-gradient` | components | 73 | — |
| **Card Stack** `card-stack` | components | 75 | — |
| **Background Boxes** `background-boxes` | components | 77 | — |
| **Wobble Card** `wobble-card` | components | 79 | — |
| **SVG Mask Effect** `svg-mask-effect` | components | 84 | — |
| **Flip Words** `flip-words` | components | 99 | AnimatePresence, LayoutGroup |
| **Hover Border Gradient** `hover-border-gradient` | components | 100 | — |
| **Container Text Flip** `container-text-flip` | components | 105 | layoutId |
| **Lamp** `lamp` | components | 105 | — |
| **Hover Effect** `card-hover-effect` | components | 112 | AnimatePresence, layoutId |
| **Layout Grid** `layout-grid` | components | 113 | layoutId |
| **Hero Section Demo 1** `hero-section-demo-1` | blocks | 119 | — |
| **Pointer Highlight** `pointer-highlight` | components | 120 | — |
| **Navbar Menu** `navbar-menu` | components | 122 | layoutId |
| **Animated Tabs** `tabs` | components | 125 | layoutId |
| **Lens** `lens` | components | 127 | AnimatePresence |
| **Spotlight New** `spotlight-new` | components | 129 | — |
| **3D Marquee** `3d-marquee` | components | 143 | — |
| **Multi Step Loader** `multi-step-loader` | components | 147 | AnimatePresence |
| **Background Lines** `background-lines` | components | 148 | — |
| **Images Slider** `images-slider` | components | 152 | AnimatePresence |
| **Glowing Stars** `glowing-stars` | components | 159 | AnimatePresence |
| **Animated Testimonials** `animated-testimonials` | components | 166 | AnimatePresence |
| **3D Animated Pin** `3d-pin` | components | 167 | — |
| **Direction Aware Hover** `direction-aware-hover` | components | 170 | AnimatePresence |
| **Images Badge** `images-badge` | components | 178 | — |
| **Text Reveal Card** `text-reveal-card` | components | 188 | — |
| **Typewriter Effect** `typewriter-effect` | components | 188 | useAnimate, stagger, useInView |
| **Sidebar** `sidebar` | components | 189 | AnimatePresence |
| **Tooltip Card** `tooltip-card` | components | 189 | AnimatePresence |
| **File Upload** `file-upload` | components | 195 | layoutId |
| **Loaders** `loader` | components | 217 | — |
| **Compare** `compare` | components | 241 | AnimatePresence |
| **Background Beams With Collision** `background-beams-with-collision` | components | 260 | AnimatePresence |
| **Features Section Demo 3** `features-section-demo-3` | blocks | 282 | — |
| **Notch** `notch` | components | 311 | AnimatePresence, layoutId |
| **Apple Cards Carousel** `apple-cards-carousel` | components | 322 | AnimatePresence, layoutId |
| **Text Flipping Board** `text-flipping-board` | components | 441 | — |
| **Keyboard** `keyboard` | components | 972 | AnimatePresence |

## 04-svg-vector — SVG路径与滤镜动画（14）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Spotlight** `spotlight` | components | 57 | animate-spotlight, svg-filter x2 |
| **Text Hover Effect** `text-hover-effect` | components | 135 | svg-filter x2 |
| **Features Section Demo 1** `features-section-demo-1` | blocks | 140 | svg-filter x2 |
| **Background Beams** `background-beams` | components | 142 | svg-filter x2 |
| **Shooting Stars** `shooting-stars` | components | 147 | svg-filter x2 |
| **Google Gemini Effect** `google-gemini-effect` | components | 162 | MotionValue, svg-filter x2 |
| **Stateful Button** `stateful-button` | components | 169 | AnimatePresence, useAnimate, layoutId |
| **World Map** `world-map` | components | 171 | svg-filter x2 |
| **Background Gradient Animation** `background-gradient-animation` | components | 182 | animate-fifth, animate-first, svg-filter x2 |
| **Animated Modal** `animated-modal` | components | 244 | AnimatePresence |
| **Gooey Input** `gooey-input` | components | 263 | layoutId, svg-filter x2 |
| **Expandable Card Demo Grid** `expandable-card-demo-grid` | blocks | 320 | AnimatePresence, layoutId |
| **Expandable Card Demo Standard** `expandable-card-demo-standard` | blocks | 344 | AnimatePresence, layoutId |
| **Cards Demo 3** `cards-demo-3` | blocks | 360 | animate-move, svg-filter x5 |

## 05-motion-pipeline — MotionValue管线(鼠标/物理弹簧)（13）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Input** `input` | components | 55 | useMotionValue, useMotionTemplate |
| **Animated Tooltip** `animated-tooltip` | components | 100 | AnimatePresence, useTransform, useSpring, useMotionValue |
| **Evervault Card** `evervault-card` | components | 108 | useMotionValue, useMotionTemplate |
| **Comet Card** `comet-card` | components | 116 | useTransform, useSpring, useMotionValue, useMotionTemplate |
| **Squiggly Text** `squiggly-text` | components | 117 | useTransform, svg-filter x2 |
| **Following Pointer** `following-pointer` | components | 137 | AnimatePresence, useMotionValue |
| **Moving Border** `moving-border` | components | 140 | useTransform, useMotionValue, useAnimationFrame, useMotionTemplate |
| **Hero Highlight** `hero-highlight` | components | 141 | useMotionValue, useMotionTemplate |
| **Link Preview** `link-preview` | components | 152 | AnimatePresence, useSpring, useMotionValue |
| **Parallax Hero Images** `parallax-hero-images` | components | 189 | useTransform, useSpring, useMotionValue, MotionValue |
| **Draggable Card** `draggable-card` | components | 192 | useTransform, useSpring, useMotionValue, useVelocity |
| **Floating Dock** `floating-dock` | components | 201 | AnimatePresence, useTransform, useSpring, useMotionValue |
| **Noise Background** `noise-background` | components | 232 | useTransform, useSpring, useMotionValue, useAnimationFrame |

## 06-scroll-driven — 滚动驱动(useScroll)（12）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Sticky Banner** `sticky-banner` | components | 84 | useScroll, useMotionValueEvent |
| **Parallax Grid Scroll** `parallax-scroll` | components | 86 | useScroll, useTransform |
| **Floating Navbar** `floating-navbar` | components | 89 | AnimatePresence, useScroll, useMotionValueEvent |
| **Timeline** `timeline` | components | 91 | useScroll, useTransform, useMotionValueEvent |
| **Container Scroll Animation** `container-scroll-animation` | components | 96 | useScroll, useTransform, MotionValue |
| **Parallax Scroll 2** `parallax-scroll-2` | components | 101 | useScroll, useTransform |
| **Moving Line** `moving-line` | components | 102 | useScroll, useTransform, useSpring, useMotionValueEvent, svg-filter x2 |
| **Sticky Scroll Reveal** `sticky-scroll-reveal` | components | 113 | useScroll, useMotionValueEvent |
| **Tracing Beam** `tracing-beam` | components | 127 | useScroll, useTransform, useSpring, useVelocity, svg-filter x1 |
| **Hero Parallax** `hero-parallax` | components | 160 | useScroll, useTransform, useSpring, MotionValue |
| **Resizable Navbar** `resizable-navbar` | components | 289 | AnimatePresence, useScroll, useMotionValueEvent, layoutId |
| **Fey.com Macbook Scroll** `macbook-scroll` | components | 656 | useScroll, useTransform, MotionValue |

## 07-canvas-2d — Canvas 2D指令式绘图（11）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Wavy Background** `wavy-background` | components | 133 | canvas2d |
| **Stars Background** `stars-background` | components | 144 | canvas2d |
| **Canvas Text** `canvas-text` | components | 216 | canvas2d |
| **Vortex Background** `vortex` | components | 269 | canvas2d |
| **Placeholders And Vanish Input** `placeholders-and-vanish-input` | components | 277 | AnimatePresence, canvas2d |
| **Dotted Glow Background** `dotted-glow-background` | components | 321 | canvas2d |
| **Dither Shader** `dither-shader` | components | 461 | canvas2d |
| **ASCII Art** `ascii-art` | components | 516 | useInView, animate-pulse, canvas2d |
| **Webcam Pixel Grid** `webcam-pixel-grid` | components | 536 | animate-in, canvas2d |
| **Pixelated Canvas** `pixelated-canvas` | components | 562 | canvas2d |
| **Image Generation Loader** `image-generation-loader` | components | 574 | canvas2d |

## 08-particles-engine — 粒子引擎(tsparticles)（2）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Sparkles** `sparkles` | components | 435 | tsparticles |
| **Cover** `cover` | components | 664 | AnimatePresence, animate-pulse, tsparticles, svg-filter x1 |

## 09-webgl-shader — WebGL/three.js/shader（6）

| 名称 | 类型 | LOC | 核心信号 |
|---|---|---|---|
| **Canvas Reveal Effect** `canvas-reveal-effect` | components | 309 | webgl/three |
| **Globe** `globe` | components | 310 | webgl/three |
| **Chromatic Image** `chromatic-image` | components | 337 | webgl/three |
| **Cloud Shader** `cloud-shader` | components | 369 | webgl/three |
| **Card Spotlight** `card-spotlight` | components | 384 | useMotionValue, useMotionTemplate, webgl/three |
| **3D Globe** `3d-globe` | components | 551 | webgl/three |
