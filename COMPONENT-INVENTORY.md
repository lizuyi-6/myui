# 本地组件全量目录

盘点范围：X:/myui。首次出现：R4 / 2026-09-30。

库目录条目 361：React Bits 239（上游 211 + 本地原创 28）；Aceternity 122（组件 112 + 页面块 9 + hook 1）。

React Bits 四版本共 956 个实现；PULSAR 31 个源码模块，其中 30 个与库同名，另有 MotionGallery 页面编排。不加到库条目数。361条目不代表361种互不重叠的功能。

源码集合 SHA256：fb758d03b918c1c4db80875738e006edc25e1ad0bd6a1a12edea201f57f40ac2。逐文件 SHA/mtime、描述、依赖、四版本路径见 [机器目录](<X:/myui/COMPONENT-INVENTORY.json>)。

重现：在 X:/myui 执行 `node summarize-components.mjs`；脚本断言注册名==磁盘入口、API名==下载名==磁盘名、下载源码==保存的registry源码（仅统一换行符）。这些断言证明目录与快照对应，不证明运行行为。

## 取用与计数边界

- 优先从库目录取用，PULSAR 是带宿主主题的试验场。跨库同名项保留各自来源，不假定接口等价。
- React Bits：JS-CSS / JS-TW / TS-CSS / TS-TW，CSS版同时复制相邻CSS。本地原创没有官网发布。
- Aceternity：127 个落盘源码与保存的registry内容对应；99 项检测到 @/ 或 next/ 导入，取用时处理宿主别名、utils、Next环境和实际依赖。下载记录成功不等于安装/编译/交互通过。
- Aceternity九类是既有正则分类结果，不能直接当交互设计分类。例如3d-card被归到static-visual，但源码有鼠标驱动rotateX/rotateY。
- 不把API中179个examples当作本地179个独立组件；本轮没有盘点付费模板和工作区外下载。

## React Bits 全部目录

### Animations（40）

| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |
| --- | --- | --- | --- |
| AnimatedContent | 上游 | Wrapper that animates any children on scroll or mount with configurable direction, distance, duration, easing and disappear options. | [源码](<X:/myui/react-bits/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx>) |
| Antigravity | 上游 | 3D antigravity particle field that repels from the cursor with smooth motion. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Antigravity/Antigravity.tsx>) |
| BlobCursor | 上游 | Organic blob cursor that smoothly follows the pointer with inertia and elastic morphing. | [源码](<X:/myui/react-bits/src/ts-default/Animations/BlobCursor/BlobCursor.tsx>) |
| ClickSpark | 上游 | Creates particle spark bursts at click position. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ClickSpark/ClickSpark.tsx>) |
| Crosshair | 上游 | Custom crosshair cursor with tracking, and link hover effects. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Crosshair/Crosshair.tsx>) |
| Cubes | 上游 | 3D rotating cube cluster. Supports auto-rotation or hover interaction. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Cubes/Cubes.tsx>) |
| CursorGrid | 上游 | Canvas grid whose cells light up around the cursor with configurable radius, falloff and click pulses. | [源码](<X:/myui/react-bits/src/ts-default/Animations/CursorGrid/CursorGrid.tsx>) |
| DitherVeil | 上游 | A photo printed as a 1-bit dither that the cursor burns through to full colour, leaving a trail that knits back cell by cell. | [源码](<X:/myui/react-bits/src/ts-default/Animations/DitherVeil/DitherVeil.tsx>) |
| ElasticMesh | 上游 | Spring-mesh surface that stretches under the pointer and settles back with damped physics. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ElasticMesh/ElasticMesh.tsx>) |
| ElectricBorder | 上游 | Jittery electric energy border with animated arcs, glow and adjustable intensity. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ElectricBorder/ElectricBorder.tsx>) |
| ElectricLogo | 上游 | Turns any SVG or PNG into a living lightning outline, with flowing strands, arcs that leap off the edges and a charge that follows the cursor. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ElectricLogo/ElectricLogo.tsx>) |
| FadeContent | 上游 | Simple directional fade / slide entrance / exit wrapper with threshold-based activation. | [源码](<X:/myui/react-bits/src/ts-default/Animations/FadeContent/FadeContent.tsx>) |
| GhostCursor | 上游 | Semi-transparent ghost cursor that smoothly follows the real cursor with a trailing effect. | [源码](<X:/myui/react-bits/src/ts-default/Animations/GhostCursor/GhostCursor.tsx>) |
| GlareHover | 上游 | Adds a realistic moving glare highlight on hover over any element. | [源码](<X:/myui/react-bits/src/ts-default/Animations/GlareHover/GlareHover.tsx>) |
| GlowCursor | 上游 | Shader-powered light trail that smoothly follows the pointer with customizable glow, color, taper and pulse. | [源码](<X:/myui/react-bits/src/ts-default/Animations/GlowCursor/GlowCursor.tsx>) |
| GradualBlur | 上游 | Progressively un-blurs content based on scroll or trigger creating a cinematic reveal. | [源码](<X:/myui/react-bits/src/ts-default/Animations/GradualBlur/GradualBlur.tsx>) |
| HalftoneReveal | 上游 | Print-style halftone dot matrix that resolves into sharp content around the cursor. | [源码](<X:/myui/react-bits/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.tsx>) |
| ImageTrail | 上游 | Cursor-based image trail with several built-in variants. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ImageTrail/ImageTrail.tsx>) |
| LaserFlow | 上游 | Dynamic laser light that flows onto a surface, customizable effect. | [源码](<X:/myui/react-bits/src/ts-default/Animations/LaserFlow/LaserFlow.tsx>) |
| LogoLoop | 上游 | Continuously looping marquee of brand or tech logos with seamless repeat and hover pause. | [源码](<X:/myui/react-bits/src/ts-default/Animations/LogoLoop/LogoLoop.tsx>) |
| MagicRings | 上游 | Interactive magic rings effect with customizable parameters. | [源码](<X:/myui/react-bits/src/ts-default/Animations/MagicRings/MagicRings.tsx>) |
| Magnet | 上游 | Elements magnetically ease toward the cursor then settle back with spring physics. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Magnet/Magnet.tsx>) |
| MagnetLines | 上游 | Animated field lines bend toward the cursor. | [源码](<X:/myui/react-bits/src/ts-default/Animations/MagnetLines/MagnetLines.tsx>) |
| MetaBalls | 上游 | Liquid metaball blobs that merge and separate with smooth implicit surface animation. | [源码](<X:/myui/react-bits/src/ts-default/Animations/MetaBalls/MetaBalls.tsx>) |
| MetallicPaint | 上游 | Liquid metallic paint shader which can be applied to SVG elements. | [源码](<X:/myui/react-bits/src/ts-default/Animations/MetallicPaint/MetallicPaint.tsx>) |
| Noise | 上游 | Animated film grain / noise overlay adding subtle texture and motion. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Noise/Noise.tsx>) |
| OrbitImages | 上游 | SVG Path customizable orbiting images effect | [源码](<X:/myui/react-bits/src/ts-default/Animations/OrbitImages/OrbitImages.tsx>) |
| PixelSwap | 上游 | Pixel fragments assemble into a full cover, swap arbitrary content, then dissolve away with reversible colors and triggers. | [源码](<X:/myui/react-bits/src/ts-default/Animations/PixelSwap/PixelSwap.tsx>) |
| PixelTrail | 上游 | Pixelated cursor trail emitting fading squares with retro digital feel. | [源码](<X:/myui/react-bits/src/ts-default/Animations/PixelTrail/PixelTrail.tsx>) |
| PixelTransition | 上游 | Pixel dissolve transition for content reveal on hover. | [源码](<X:/myui/react-bits/src/ts-default/Animations/PixelTransition/PixelTransition.tsx>) |
| Ribbons | 上游 | Flowing responsive ribbons/cursor trail driven by physics and pointer motion. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Ribbons/Ribbons.tsx>) |
| RippleDistortion | 上游 | Pointer-driven water displacement that warps content and leaves a decaying wake. | [源码](<X:/myui/react-bits/src/ts-default/Animations/RippleDistortion/RippleDistortion.tsx>) |
| ScrollExpand | 上游 | A rounded media frame that grows to full bleed as it scrolls through the viewport. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ScrollExpand/ScrollExpand.tsx>) |
| ShapeBlur | 上游 | Morphing blurred geometric shape. The effect occurs on hover. | [源码](<X:/myui/react-bits/src/ts-default/Animations/ShapeBlur/ShapeBlur.tsx>) |
| SplashCursor | 上游 | Liquid splash burst at cursor with curling ripples and waves. | [源码](<X:/myui/react-bits/src/ts-default/Animations/SplashCursor/SplashCursor.tsx>) |
| StarBorder | 上游 | Animated star / sparkle border orbiting content with twinkle pulses. | [源码](<X:/myui/react-bits/src/ts-default/Animations/StarBorder/StarBorder.tsx>) |
| StickerPeel | 上游 | Sticker corner lift + peel interaction using 3D transform and shadow depth. | [源码](<X:/myui/react-bits/src/ts-default/Animations/StickerPeel/StickerPeel.tsx>) |
| Strands | 上游 | Glowing ribbon-like strands that ripple and weave across a transparent canvas. | [源码](<X:/myui/react-bits/src/ts-default/Animations/Strands/Strands.tsx>) |
| SwarmCursor | 上游 | Flocking particle swarm that chases the pointer, jostles for space and drifts apart at rest. | [源码](<X:/myui/react-bits/src/ts-default/Animations/SwarmCursor/SwarmCursor.tsx>) |
| TargetCursor | 上游 | A cursor follow animation with 4 corners that lock onto targets. | [源码](<X:/myui/react-bits/src/ts-default/Animations/TargetCursor/TargetCursor.tsx>) |

### Backgrounds（58）

| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |
| --- | --- | --- | --- |
| AcidSquares | 上游 | A crystalline corridor of stacked squares receding into depth. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/AcidSquares/AcidSquares.tsx>) |
| AeroShards | 上游 | A GPU-driven wind sculpture of folded foil shards with crisp detail, content-safe placements, and responsive pointer interactions. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/AeroShards/AeroShards.tsx>) |
| Aurora | 上游 | Flowing aurora gradient background. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Aurora/Aurora.tsx>) |
| Balatro | 上游 | The balatro shader, fully customizalbe and interactive. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Balatro/Balatro.tsx>) |
| Ballpit | 上游 | Physics ball pit simulation with bouncing colorful spheres. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Ballpit/Ballpit.tsx>) |
| Beams | 上游 | Crossing animated ribbons with customizable properties. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Beams/Beams.tsx>) |
| ColorBends | 上游 | Vibrant color bends with smooth flowing animation. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/ColorBends/ColorBends.tsx>) |
| CRTWarp | 上游 | Full-canvas CRT plasma with curved distortion, scanlines, bloom and pointer interaction. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/CRTWarp/CRTWarp.tsx>) |
| DarkVeil | 上游 | Subtle dark background with a smooth animation and postprocessing. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/DarkVeil/DarkVeil.tsx>) |
| Dither | 上游 | Retro dithered noise shader background. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Dither/Dither.tsx>) |
| DotField | 上游 | Interactive dot grid with cursor bulge, glow, sparkle, and wave effects. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/DotField/DotField.tsx>) |
| DotGrid | 上游 | Animated dot grid with cursor interactions. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/DotGrid/DotGrid.tsx>) |
| EvilEye | 上游 | Procedural evil eye shader with animated iris, slit pupil, and fiery outer glow. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/EvilEye/EvilEye.tsx>) |
| FaultyTerminal | 上游 | Terminal CRT scanline squares effect with flicker + noise. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/FaultyTerminal/FaultyTerminal.tsx>) |
| Ferrofluid | 上游 | A churning magnetic fluid traced by glowing contour lines, with a cursor magnet. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Ferrofluid/Ferrofluid.tsx>) |
| FloatingLines | 上游 | 3D floating lines that react to cursor movement. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/FloatingLines/FloatingLines.tsx>) |
| Galaxy | 上游 | Parallax realistic starfield with pointer interactions. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Galaxy/Galaxy.tsx>) |
| GhostFibers | 上游 | A deep-blue recursive fiber field with luminous bands, radial twisting and soft atmospheric glow. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GhostFibers/GhostFibers.tsx>) |
| GradientBlinds | 上游 | Layered gradient blinds with spotlight and noise distortion. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GradientBlinds/GradientBlinds.tsx>) |
| GradientWaves | 上游 | Raymarched sine waves rolling toward a soft, hazy horizon. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GradientWaves/GradientWaves.tsx>) |
| Grainient | 上游 | Grainy gradient swirls with soft wave distortion. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Grainient/Grainient.tsx>) |
| GridDistortion | 上游 | Warped grid mesh distorts smoothly reacting to cursor. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GridDistortion/GridDistortion.tsx>) |
| GridMotion | 上游 | Perspective moving grid lines based on cusror position. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GridMotion/GridMotion.tsx>) |
| GridScan | 上游 | Animated grid room 3D scan effect and cool interactions. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/GridScan/GridScan.tsx>) |
| Hyperspeed | 上游 | Animated lines continuously moving to simulate hyperspace travel on click hold. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Hyperspeed/Hyperspeed.tsx>) |
| Iridescence | 上游 | Slick iridescent shader with shifting waves. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Iridescence/Iridescence.tsx>) |
| LetterGlitch | 上游 | Matrix style letter animation. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LetterGlitch/LetterGlitch.tsx>) |
| Lightfall | 上游 | Colorful light streaks raining down a glowing tunnel with a cursor light. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Lightfall/Lightfall.tsx>) |
| Lightning | 上游 | Procedural lightning bolts with branching and glow flicker. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Lightning/Lightning.tsx>) |
| LightPillar | 上游 | Vertical pillar of light with glow effects. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LightPillar/LightPillar.tsx>) |
| LightRays | 上游 | Volumetric light rays/beams with customizable direction. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LightRays/LightRays.tsx>) |
| LightTunnel | 上游 | A radial fibre-optic tunnel with light pulses racing into depth. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LightTunnel/LightTunnel.tsx>) |
| LineWaves | 上游 | Animated line wave pattern with colorful warped distortion. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LineWaves/LineWaves.tsx>) |
| LiquidChrome | 上游 | Liquid metallic chrome shader with flowing reflective surface. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LiquidChrome/LiquidChrome.tsx>) |
| LiquidEther | 上游 | Interactive liquid shader with flowing distortion and customizable colors. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/LiquidEther/LiquidEther.tsx>) |
| MicroSlats | 上游 | A wall of tiny slats that becomes a rolling sea in perspective, with glinting crests, four presets, a real fluid the cursor stirs and an intro that rolls in from the horizon. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/MicroSlats/MicroSlats.tsx>) |
| MoltenMetal | 上游 | Swirling caustic plasma filaments with molten, white-hot cores. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/MoltenMetal/MoltenMetal.tsx>) |
| Orb | 上游 | Floating energy orb with customizable hover effect. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Orb/Orb.tsx>) |
| Particles | 上游 | Configurable particle system. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Particles/Particles.tsx>) |
| PixelBlast | 上游 | Exploding pixel particle bursts with optional liquid postprocessing. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/PixelBlast/PixelBlast.tsx>) |
| PixelSnow | 上游 | Falling pixelated snow effect with customizable density and speed. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/PixelSnow/PixelSnow.tsx>) |
| Plasma | 上游 | Organic plasma gradients swirl + morph with smooth turbulence. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Plasma/Plasma.tsx>) |
| PlasmaWave | 上游 | Raymarched plasma waves with dual-wave interference and OGL. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/PlasmaWave/PlasmaWave.tsx>) |
| Prism | 上游 | Rotating prism with configurable intensity, size, and colors. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Prism/Prism.tsx>) |
| PrismaticBurst | 上游 | Burst of light rays with controllable color, distortion, amount. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/PrismaticBurst/PrismaticBurst.tsx>) |
| Radar | 上游 | Radar sweep effect with concentric rings, radial spokes, and a rotating beam. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Radar/Radar.tsx>) |
| RippleGrid | 上游 | A grid that continuously animates with a ripple effect. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/RippleGrid/RippleGrid.tsx>) |
| Scanner | 上游 | Calm interference bands sweeping across the screen like an oscilloscope. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Scanner/Scanner.tsx>) |
| ShapeGrid | 上游 | Animated grid with shape variants (square, hexagon, circle, triangle) + direction customization. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/ShapeGrid/ShapeGrid.tsx>) |
| ShapeWaves | 上游 | A WebGPU field of triangles, circles and squares that brighten and grow along rolling waves, with an optional text cutout the waves flow around. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.tsx>) |
| SideRays | 上游 | Animated light rays emanating from the side with customizable colors and speed. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/SideRays/SideRays.tsx>) |
| Silk | 上游 | Smooth waves background with soft lighting. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Silk/Silk.tsx>) |
| SlicedWaves | 上游 | A grid of soft glowing bars rippling like a slatted equalizer. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/SlicedWaves/SlicedWaves.tsx>) |
| SoftAurora | 上游 | Soft aurora borealis shader with 3D Perlin noise and cosine gradient palettes. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/SoftAurora/SoftAurora.tsx>) |
| Threads | 上游 | Animated pattern of lines forming a fabric-like motion. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Threads/Threads.tsx>) |
| Topography | 上游 | A living contour map with glowing, elevation-tinted lines. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Topography/Topography.tsx>) |
| Waves | 上游 | Layered lines that form smooth wave patterns with animation. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/Waves/Waves.tsx>) |
| WebThreads | 上游 | Glowing sine threads woven through a luminous convergence point. | [源码](<X:/myui/react-bits/src/ts-default/Backgrounds/WebThreads/WebThreads.tsx>) |

### Components（61）

| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |
| --- | --- | --- | --- |
| AccordionGallery | 上游 | Panels expand on hover or focus, revealing parallax imagery and captions. | [源码](<X:/myui/react-bits/src/ts-default/Components/AccordionGallery/AccordionGallery.tsx>) |
| AnimatedList | 上游 | List items enter with staggered motion variants for polished reveals. | [源码](<X:/myui/react-bits/src/ts-default/Components/AnimatedList/AnimatedList.tsx>) |
| ApertureReveal | Swiss gallery / 瑞士画廊 | A circular aperture opens through an editorial cover to reveal real content. Pointer, focus and an explicit toggle share the same reversible reveal. | [源码](<X:/myui/react-bits/src/ts-default/Components/ApertureReveal/ApertureReveal.tsx>) |
| BauhausStepper | Bauhaus geometry / 包豪斯几何 | Primary-color geometric step selector with independent navigation and a sliding progress rule. | [源码](<X:/myui/react-bits/src/ts-default/Components/BauhausStepper/BauhausStepper.tsx>) |
| BeamPath | Electric circuit / 电路光束 | Animated packets travel on curved SVG paths into a glowing hub. Caller labels and real children stay independent of the decorative circuit. | [源码](<X:/myui/react-bits/src/ts-default/Components/BeamPath/BeamPath.tsx>) |
| BlueprintPanel | Technical blueprint / 技术蓝图 | A technical blueprint disclosure card with dimension annotations, grid paper and an expanding specification panel. | [源码](<X:/myui/react-bits/src/ts-default/Components/BlueprintPanel/BlueprintPanel.tsx>) |
| BorderGlow | 上游 | Glowing mesh-gradient border that follows cursor direction and intensifies near edges. | [源码](<X:/myui/react-bits/src/ts-default/Components/BorderGlow/BorderGlow.tsx>) |
| BounceCards | 上游 | Cards bounce that bounce in on mount. | [源码](<X:/myui/react-bits/src/ts-default/Components/BounceCards/BounceCards.tsx>) |
| BubbleMenu | 上游 | Floating circular expanding menu with staggered item reveal. | [源码](<X:/myui/react-bits/src/ts-default/Components/BubbleMenu/BubbleMenu.tsx>) |
| CardNav | 上游 | Expandable navigation bar with card panels revealing nested links. | [源码](<X:/myui/react-bits/src/ts-default/Components/CardNav/CardNav.tsx>) |
| CardSwap | 上游 | Cards animate position swapping with smooth layout transitions. | [源码](<X:/myui/react-bits/src/ts-default/Components/CardSwap/CardSwap.tsx>) |
| Carousel | 上游 | Responsive carousel with touch gestures, looping and transitions. | [源码](<X:/myui/react-bits/src/ts-default/Components/Carousel/Carousel.tsx>) |
| ChromaGrid | 上游 | A responsive grid of grayscale tiles. Hovering the grid reaveals their colors. | [源码](<X:/myui/react-bits/src/ts-default/Components/ChromaGrid/ChromaGrid.tsx>) |
| CircularGallery | 上游 | Circular orbit gallery rotating images. | [源码](<X:/myui/react-bits/src/ts-default/Components/CircularGallery/CircularGallery.tsx>) |
| ConveyorGallery | Analog film strip / 模拟胶片 | A continuous diagonal film strip carries caller artwork. Hover or keyboard focus pauses it; every original card remains accessible in a static list. | [源码](<X:/myui/react-bits/src/ts-default/Components/ConveyorGallery/ConveyorGallery.tsx>) |
| Counter | 上游 | Flexible animated counter supporting increments + easing. | [源码](<X:/myui/react-bits/src/ts-default/Components/Counter/Counter.tsx>) |
| CurvedInput | 上游 | Arc-bent input bar with text, caret and submit button all following the curve. | [源码](<X:/myui/react-bits/src/ts-default/Components/CurvedInput/CurvedInput.tsx>) |
| DecayCard | 上游 | Hover parallax effect that disintegrates the content of a card. | [源码](<X:/myui/react-bits/src/ts-default/Components/DecayCard/DecayCard.tsx>) |
| DepthCarousel | 上游 | Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance. | [源码](<X:/myui/react-bits/src/ts-default/Components/DepthCarousel/DepthCarousel.tsx>) |
| DepthLiftCard | Holographic specimen / 全息标本 | A holographic card whose frame, rings and foreground rise at different depths while tracking the pointer. Tap or press Enter to hold the lifted view. | [源码](<X:/myui/react-bits/src/ts-default/Components/DepthLiftCard/DepthLiftCard.tsx>) |
| Dock | 上游 | macOS style magnifying dock with proximity scaling of icons. | [源码](<X:/myui/react-bits/src/ts-default/Components/Dock/Dock.tsx>) |
| DomeGallery | 上游 | Immersive 3D dome gallery projecting images on a hemispheric surface. | [源码](<X:/myui/react-bits/src/ts-default/Components/DomeGallery/DomeGallery.tsx>) |
| DriftWall | 上游 | An endless perspective wall of tiles drifting past, lifting on hover. | [源码](<X:/myui/react-bits/src/ts-default/Components/DriftWall/DriftWall.tsx>) |
| ElasticSlider | 上游 | Slider handle stretches elastically then snaps with spring physics. | [源码](<X:/myui/react-bits/src/ts-default/Components/ElasticSlider/ElasticSlider.tsx>) |
| FlexCarousel | 上游 | An infinite image row that flows through invisible liquid glass at its edges, with four bend presets, five entrances, a speed squeeze and click to focus. | [源码](<X:/myui/react-bits/src/ts-default/Components/FlexCarousel/FlexCarousel.tsx>) |
| FlowingMenu | 上游 | Liquid flowing active indicator glides between menu items. | [源码](<X:/myui/react-bits/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx>) |
| FluidGlass | 上游 | Glassmorphism container with animated liquid distortion refraction. | [源码](<X:/myui/react-bits/src/ts-default/Components/FluidGlass/FluidGlass.tsx>) |
| FlyingPosters | 上游 | 3D posters rotate on scroll infinitely. | [源码](<X:/myui/react-bits/src/ts-default/Components/FlyingPosters/FlyingPosters.tsx>) |
| Folder | 上游 | Interactive folder opens to reveal nested content smooth motion. | [源码](<X:/myui/react-bits/src/ts-default/Components/Folder/Folder.tsx>) |
| GlassIcons | 上游 | Icon set styled with frosted glass blur. | [源码](<X:/myui/react-bits/src/ts-default/Components/GlassIcons/GlassIcons.tsx>) |
| GlassSurface | 上游 | Advanced Apple-style glass surface with real-time distortion + lighting. | [源码](<X:/myui/react-bits/src/ts-default/Components/GlassSurface/GlassSurface.tsx>) |
| GooeyNav | 上游 | Navigation indicator morphs with gooey blob transitions between items. | [源码](<X:/myui/react-bits/src/ts-default/Components/GooeyNav/GooeyNav.tsx>) |
| InfiniteMenu | 上游 | Horizontally looping menu effect that scrolls endlessly with seamless wrap. | [源码](<X:/myui/react-bits/src/ts-default/Components/InfiniteMenu/InfiniteMenu.tsx>) |
| InfiniteSpiral | 上游 | An endlessly looping 3D helix of images with customizable motion, depth, spacing and interaction. | [源码](<X:/myui/react-bits/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.tsx>) |
| KineticTiles | Neo brutalist playground / 新粗野主义操场 | A grid ripples away from the pointer: nearby tiles lift, rotate and spring apart. Keyboard focus lifts a tile and selection is a caller callback. | [源码](<X:/myui/react-bits/src/ts-default/Components/KineticTiles/KineticTiles.tsx>) |
| Lanyard | 上游 | Swinging 3D lanyard / badge card with realistic inertial motion. | [源码](<X:/myui/react-bits/src/ts-default/Components/Lanyard/Lanyard.tsx>) |
| LineSidebar | 上游 | Static list navigation with a cursor-proximity effect that shifts and highlights nearby items. | [源码](<X:/myui/react-bits/src/ts-default/Components/LineSidebar/LineSidebar.tsx>) |
| LiquidAction | Liquid candy / 液态糖果 | A spring-following action sits inside orbiting liquid droplets. Hover or keyboard focus merges the droplets into a wide halo; activation belongs to the caller. | [源码](<X:/myui/react-bits/src/ts-default/Components/LiquidAction/LiquidAction.tsx>) |
| MagicBento | 上游 | Interactive bento grid tiles expand + animate with various options. | [源码](<X:/myui/react-bits/src/ts-default/Components/MagicBento/MagicBento.tsx>) |
| Masonry | 上游 | Responsive masonry layout with animated reflow + gaps optimization. | [源码](<X:/myui/react-bits/src/ts-default/Components/Masonry/Masonry.tsx>) |
| ModelViewer | 上游 | Three.js model viewer with orbit controls and lighting presets. | [源码](<X:/myui/react-bits/src/ts-default/Components/ModelViewer/ModelViewer.tsx>) |
| MonoCommand | Monochrome utility / 单色工具 | A compact monochrome command surface with immediate search, native buttons, keyboard result navigation and recoverable empty state. | [源码](<X:/myui/react-bits/src/ts-default/Components/MonoCommand/MonoCommand.tsx>) |
| MorphSlider | 上游 | WebGL slider that melts between images with a displacement transition. | [源码](<X:/myui/react-bits/src/ts-default/Components/MorphSlider/MorphSlider.tsx>) |
| OptionWheel | 上游 | Curved option picker that spins via scroll, drag, or arrow keys, fading and tilting items away from the selection. | [源码](<X:/myui/react-bits/src/ts-default/Components/OptionWheel/OptionWheel.tsx>) |
| OrbitStage | Solar observatory / 太阳观测站 | Caller-provided subjects orbit a central stage. Select any subject to update the central content; pause, focus or reduced motion freezes the orbits without losing selection. | [源码](<X:/myui/react-bits/src/ts-default/Components/OrbitStage/OrbitStage.tsx>) |
| OrigamiNav | Folded paper / 折纸导航 | A paper-strip navigation that folds open from a stable trigger; collapsed links are inert. | [源码](<X:/myui/react-bits/src/ts-default/Components/OrigamiNav/OrigamiNav.tsx>) |
| PillNav | 上游 | Minimal pill nav with sliding active highlight + smooth easing. | [源码](<X:/myui/react-bits/src/ts-default/Components/PillNav/PillNav.tsx>) |
| PixelCard | 上游 | Card content revealed through pixel expansion transition. | [源码](<X:/myui/react-bits/src/ts-default/Components/PixelCard/PixelCard.tsx>) |
| PrismDeck | Iridescent editorial / 虹彩编辑卡组 | Selectable panels fan out in perspective and exchange front-to-back positions with a spring. Arrow keys and direct tabs reach every panel. | [源码](<X:/myui/react-bits/src/ts-default/Components/PrismDeck/PrismDeck.tsx>) |
| ProfileCard | 上游 | Animated profile card glare with 3D hover effect. | [源码](<X:/myui/react-bits/src/ts-default/Components/ProfileCard/ProfileCard.tsx>) |
| ReflectiveCard | 上游 | Card with dynamic webcam reflection and glare effects that respond to cursor movement. | [源码](<X:/myui/react-bits/src/ts-default/Components/ReflectiveCard/ReflectiveCard.tsx>) |
| ScrollStack | 上游 | Overlapping card stack reveals on scroll with depth layering. | [源码](<X:/myui/react-bits/src/ts-default/Components/ScrollStack/ScrollStack.tsx>) |
| ScrollTheater | Constructivist poster / 构成主义剧场 | A scrollable scene with a poster plane, foreground disc and headline moving at different depths. Native scene buttons provide the same destinations without wheel gestures. | [源码](<X:/myui/react-bits/src/ts-default/Components/ScrollTheater/ScrollTheater.tsx>) |
| ShutterText | Split shutter typography / 百叶窗字排 | Large words exchange through alternating 3D shutter rows on a clock. Every word is directly selectable, with pause and reduced-motion alternatives. | [源码](<X:/myui/react-bits/src/ts-default/Components/ShutterText/ShutterText.tsx>) |
| SpecularButton | 上游 | Glass button with a shader-driven specular rim light that sweeps around the edge and follows the cursor. | [源码](<X:/myui/react-bits/src/ts-default/Components/SpecularButton/SpecularButton.tsx>) |
| SpotlightCard | 上游 | Dynamic spotlight follows cursor casting gradient illumination. | [源码](<X:/myui/react-bits/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx>) |
| Stack | 上游 | Layered stack with swipe animations, autoplay and smooth transitions. | [源码](<X:/myui/react-bits/src/ts-default/Components/Stack/Stack.tsx>) |
| StaggeredMenu | 上游 | Menu with staggered item animations and smooth transitions on open/close. | [源码](<X:/myui/react-bits/src/ts-default/Components/StaggeredMenu/StaggeredMenu.tsx>) |
| Stepper | 上游 | Animated multi-step progress indicator with active state transitions. | [源码](<X:/myui/react-bits/src/ts-default/Components/Stepper/Stepper.tsx>) |
| TiltedCard | 上游 | 3D perspective tilt card reacting to pointer. | [源码](<X:/myui/react-bits/src/ts-default/Components/TiltedCard/TiltedCard.tsx>) |
| VinylDeck | Analog record player / 复古黑胶 | Analog vinyl artwork with concentric grooves, a lifting tonearm and an explicit visual rotation control. | [源码](<X:/myui/react-bits/src/ts-default/Components/VinylDeck/VinylDeck.tsx>) |

### Micro（47）

| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |
| --- | --- | --- | --- |
| ArcadeButton | 8-bit arcade / 像素街机 | Chunky arcade key with a stepped silhouette, hard offset shadow and physical press travel. | [源码](<X:/myui/react-bits/src/ts-default/Micro/ArcadeButton/ArcadeButton.tsx>) |
| BellToggle | 上游 | Pill toggle that answers a press at three tempos: the bell rings on damped keyframes, the label blur-crossfades, and the pill unfurls to the longer label through a clip-path on a critically damped spring. The pressed state is the receipt. | [源码](<X:/myui/react-bits/src/ts-default/Micro/BellToggle/BellToggle.tsx>) |
| BranchedMenu | 上游 | Collapsible menu whose sections unfold into a trunk with a curved branch to each child, and an accent line that travels down the trunk and around the curve to whatever you pick, while a marker glides to the open section. | [源码](<X:/myui/react-bits/src/ts-default/Micro/BranchedMenu/BranchedMenu.tsx>) |
| BubbleChoice | Candy pop / 糖果气泡 | Candy-colored native radio group with round labels and a spring bubble around the selected choice. | [源码](<X:/myui/react-bits/src/ts-default/Micro/BubbleChoice/BubbleChoice.tsx>) |
| CallChip | 上游 | Inline tool-call chip whose fill wipes across while a live ms counter ticks, completing with a green wash on success or stopping short and shaking red with a retry glyph on error. | [源码](<X:/myui/react-bits/src/ts-default/Micro/CallChip/CallChip.tsx>) |
| CodeSlots | 上游 | One-time-code input where a hidden overlay input owns focus, paste and SMS autofill while each slot lands its digit on one spring: the fill swells from the centre, the digit rises and the caret glides; a wrong code drains the slots in a cascade, a right one merges them into a single accent wash. | [源码](<X:/myui/react-bits/src/ts-default/Micro/CodeSlots/CodeSlots.tsx>) |
| CometDial | 上游 | Tick-ring dial you flick by angle: the reading launches on a spring and a velocity-driven comet streaks behind the lit head, trailing the direction of travel and vanishing at rest. | [源码](<X:/myui/react-bits/src/ts-default/Micro/CometDial/CometDial.tsx>) |
| DodgeField | 上游 | Wrapper that makes any child flee the pointer inside a bounded field, dodges once per approach, then relents after a few tries and glides home. | [源码](<X:/myui/react-bits/src/ts-default/Micro/DodgeField/DodgeField.tsx>) |
| ElasticTabs | Soft minimal / 柔和极简 | Soft segmented tabs with a spring-driven shared indicator, preserved panels and roving keyboard focus. | [源码](<X:/myui/react-bits/src/ts-default/Micro/ElasticTabs/ElasticTabs.tsx>) |
| FlipCard | 上游 | Two-faced card that flips in 3D on a click, a drag or a flick, settling on a spring that carries your release velocity, with an optional cursor tilt, a sheen that follows the pointer and a shadow that narrows as it turns edge on. | [源码](<X:/myui/react-bits/src/ts-default/Micro/FlipCard/FlipCard.tsx>) |
| FolderFloat | 上游 | Folder that opens on hover or press: the flap tilts toward you, a paper edge rises, and its notes spring out from behind the flap into a floating cloud to pick from, then sink back when the folder closes. | [源码](<X:/myui/react-bits/src/ts-default/Micro/FolderFloat/FolderFloat.tsx>) |
| FuseButton | 上游 | Action button whose done state carries its own undo on a burning fuse: press, the label crossfades to Undo, a hairline burns for the undo window, and Undo or Escape runs it back. | [源码](<X:/myui/react-bits/src/ts-default/Micro/FuseButton/FuseButton.tsx>) |
| GlideSelect | 上游 | Select chip whose menu pops out of its own corner and whose single hover highlight glides between rows, remembering where you left it so re-entry slides from there instead of blinking in. | [源码](<X:/myui/react-bits/src/ts-default/Micro/GlideSelect/GlideSelect.tsx>) |
| HoldButton | 上游 | Hold-to-confirm button whose liquid fill rises while pressed, snaps back on an early release and swaps its label through a blur when the hold completes. | [源码](<X:/myui/react-bits/src/ts-default/Micro/HoldButton/HoldButton.tsx>) |
| JellyRadio | 上游 | Radio group of labelled chips where the chosen one swells wide-then-tall on two springs and barges its neighbours outward with a travelling stagger, so a selection reads as a force moving through the row. | [源码](<X:/myui/react-bits/src/ts-default/Micro/JellyRadio/JellyRadio.tsx>) |
| LatticeLoader | 上游 | Inline agent-status row: a 3x3 or 4x4 lattice whose cells brighten in a phase-offset wave beside a verb and a live stopwatch, resolving into a check or a cross when the task ends. | [源码](<X:/myui/react-bits/src/ts-default/Micro/LatticeLoader/LatticeLoader.tsx>) |
| NeonToggle | Cyber hardware / 霓虹硬件 | Hardware-inspired switch with a luminous LED lane, etched ticks and a spring slider. | [源码](<X:/myui/react-bits/src/ts-default/Micro/NeonToggle/NeonToggle.tsx>) |
| OrbitSlider | Mint instrument / 薄荷仪表 | Mint circular instrument with a spring orbit and native keyboard-accessible range input. | [源码](<X:/myui/react-bits/src/ts-default/Micro/OrbitSlider/OrbitSlider.tsx>) |
| PaperCrumple | 上游 | An image that crumples into a textured 3D sheet while held and follows the grabbed point as you drag. Release it as a crumpled ball, unfold it flat, or leave the paper creased, with customizable folds, paper grain, lighting and shadows. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PaperCrumple/PaperCrumple.tsx>) |
| PaperNote | Analog stationery / 手写便签 | Editable ruled sticky note with a tape tab, live draft callback and pin-controlled paper tilt. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PaperNote/PaperNote.tsx>) |
| PeekRating | 上游 | Star rating you can try before you commit: sweeping the row lifts a trailing wave of stars up to the pointer while a tip hops along with the label; a click commits with a pop. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PeekRating/PeekRating.tsx>) |
| PixelMeter | Pixel synthesizer / 像素合成器 | A pixel matrix meter with staggered cell response and a native stepped range control. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PixelMeter/PixelMeter.tsx>) |
| PostcardFlip | Travel postcard / 旅行明信片 | A travel postcard with a sunburst cover, postal reverse and an accessible explicit flip control. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PostcardFlip/PostcardFlip.tsx>) |
| PromptBar | 上游 | Chat composer with an @ sources menu, a / commands menu, a model picker, dictation and attachments, whose send tile charges to ink the moment there is something to send and morphs its arrow into a stop square while busy. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PromptBar/PromptBar.tsx>) |
| PulseHeart | 上游 | Like button that contracts to a dot, flips colour at its smallest frame and pulses back while the count swaps one glyph. | [源码](<X:/myui/react-bits/src/ts-default/Micro/PulseHeart/PulseHeart.tsx>) |
| RefineFrame | 上游 | Reserved-aspect frame that walks any media through queued, generating, refining and complete without layout shift: each stage is one blur, saturate, scale and opacity tween, a soft band sweeps while it works, a chip reports the stage, and an error dims the picture behind a retry pill. | [源码](<X:/myui/react-bits/src/ts-default/Micro/RefineFrame/RefineFrame.tsx>) |
| RibbonBadge | Vintage ribbon / 复古绶带 | A vintage folded ribbon badge that reveals supporting content with an accessible disclosure button. | [源码](<X:/myui/react-bits/src/ts-default/Micro/RibbonBadge/RibbonBadge.tsx>) |
| RippleButton | Warm tactile / 暖色触感 | Warm tactile button with pointer-origin ripples, centered keyboard feedback and bounded animation nodes. | [源码](<X:/myui/react-bits/src/ts-default/Micro/RippleButton/RippleButton.tsx>) |
| RubberSegment | 上游 | Segmented control with a rubber thumb: taps stretch it across the gap and squash it onto the target, and you can grab, drag and flick it between slots. | [源码](<X:/myui/react-bits/src/ts-default/Micro/RubberSegment/RubberSegment.tsx>) |
| ScrubField | 上游 | Number chip you drag to scrub: the value follows the hand, pushes past the range on a rubber band, and a click without moving opens it for typing. | [源码](<X:/myui/react-bits/src/ts-default/Micro/ScrubField/ScrubField.tsx>) |
| Shredder | 上游 | A list with a paper shredder at the bottom. Drag a row into the slit and the rollers tug it in, pull it through and cut it into strips that curl out underneath, tumble away and fade out. The rest of the list settles down on a spring and the shredded item is handed to you to delete. | [源码](<X:/myui/react-bits/src/ts-default/Micro/Shredder/Shredder.tsx>) |
| SlideCommit | 上游 | Slide-to-confirm handle that plants with a spinner while your action runs, unfurls into a done pill on success and springs home with a squash and shake on failure. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SlideCommit/SlideCommit.tsx>) |
| SlingButton | 上游 | Send button you pull back like a slingshot: the band stretches, a power arc arms it, and releasing fires the action with the flick's velocity. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SlingButton/SlingButton.tsx>) |
| SloshGauge | 上游 | Tank gauge whose liquid chases the value with mass, tilts with its own speed and splashes against the top when it slams full; optionally a vertical slider. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SloshGauge/SloshGauge.tsx>) |
| SpringAccordion | Editorial / 黑白编辑排版 | Editorial ruled accordion with numbered headings and restrained spring expansion. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SpringAccordion/SpringAccordion.tsx>) |
| SpringCheck | 上游 | Checkbox row where a single spring fills the box, draws the tick, strikes the label and dims the words in one press. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SpringCheck/SpringCheck.tsx>) |
| SquishSwitch | 上游 | Drag-scrubbable switch whose thumb stretches by how fast it moves, flips at the midpoint and squashes against the track end on a flick. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SquishSwitch/SquishSwitch.tsx>) |
| StatusMark | 上游 | A 20px status glyph for agent task lists that morphs in place from a dashed idle ring to a spinning or real-progress arc, then draws a check or a cross, with an optional label strike. | [源码](<X:/myui/react-bits/src/ts-default/Micro/StatusMark/StatusMark.tsx>) |
| SwipeRow | 上游 | List row that swipes open to reveal actions, snaps by flick velocity, and deletes on a full swipe that stretches the action colour across the row. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SwipeRow/SwipeRow.tsx>) |
| SwipeToast | 上游 | Single toast that rises through its bottom edge, swipes down to dismiss on a flick or a distance, and burns a thin fuse for exactly its remaining time; hover pauses it and an inline mode keeps it inside any container. | [源码](<X:/myui/react-bits/src/ts-default/Micro/SwipeToast/SwipeToast.tsx>) |
| TearTicket | 上游 | Ticket whose perforated stub tears off by hand: paper bridges stretch into fibres and snap one by one from the far end, the torn edges are jagged and fit each other, the freed stub dangles and drops, and the body is stamped as used. The artwork tilts in 3D with parallax on hover. | [源码](<X:/myui/react-bits/src/ts-default/Micro/TearTicket/TearTicket.tsx>) |
| TerminalStatus | Phosphor terminal / 磷光终端 | A phosphor terminal status display driven by explicit caller-owned idle, running, success or error state. | [源码](<X:/myui/react-bits/src/ts-default/Micro/TerminalStatus/TerminalStatus.tsx>) |
| ThoughtLine | 上游 | Reasoning-trace header: a glyph and a label breathe beside a live clock while steps appear beneath, then the line settles on one beat into "Thought for 4.2s" through a blur crossfade and the trace folds into it. | [源码](<X:/myui/react-bits/src/ts-default/Micro/ThoughtLine/ThoughtLine.tsx>) |
| ToastStack | Frosted glass / 玻璃浮层 | Frosted toast stack that unfolds on hover or keyboard focus, with inaccessible exit nodes and stable focus after dismissal. | [源码](<X:/myui/react-bits/src/ts-default/Micro/ToastStack/ToastStack.tsx>) |
| VoicePill | 上游 | Mic button that swells into a tinted capsule of level-driven equalizer bars and an elapsed clock while held or toggled, then relaxes back into the mic on release; simulated voice by default, real microphone as an opt-in. | [源码](<X:/myui/react-bits/src/ts-default/Micro/VoicePill/VoicePill.tsx>) |
| WakeSlider | 上游 | Range slider drawn as thin bars with no thumb: drag speed raises a wake that trails behind the handle and flattens again at rest. | [源码](<X:/myui/react-bits/src/ts-default/Micro/WakeSlider/WakeSlider.tsx>) |
| WarmTooltip | 上游 | Tooltip group with one shared delay: the first label waits and pops from its trigger, then siblings open instantly while the group is warm, with an optional velocity lean. | [源码](<X:/myui/react-bits/src/ts-default/Micro/WarmTooltip/WarmTooltip.tsx>) |

### TextAnimations（33）

| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |
| --- | --- | --- | --- |
| ASCIIText | 上游 | Renders text with an animated ASCII background for a retro feel. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ASCIIText/ASCIIText.tsx>) |
| BlurText | 上游 | Text starts blurred then crisply resolves for a soft-focus reveal effect. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/BlurText/BlurText.tsx>) |
| CircularText | 上游 | Layouts characters around a circle with optional rotation animation. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/CircularText/CircularText.tsx>) |
| CountUp | 上游 | Animated number counter supporting formatting and decimals. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/CountUp/CountUp.tsx>) |
| CurvedLoop | 上游 | Flowing looping text path along a customizable curve with drag interaction. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/CurvedLoop/CurvedLoop.tsx>) |
| DecryptedText | 上游 | Hacker-style decryption cycling random glyphs until resolving to real text. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/DecryptedText/DecryptedText.tsx>) |
| DepthText | 上游 | Layered extruded type with parallax that shifts against the pointer. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/DepthText/DepthText.tsx>) |
| EchoText | 上游 | Ghosted copies trail behind the text and settle into a single word. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/EchoText/EchoText.tsx>) |
| FallingText | 上游 | Characters fall with gravity + bounce creating a playful entrance. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/FallingText/FallingText.tsx>) |
| FoldText | 上游 | Lines unfold into place like creased paper opening flat. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/FoldText/FoldText.tsx>) |
| FuzzyText | 上游 | Vibrating fuzzy text with controllable hover intensity. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/FuzzyText/FuzzyText.tsx>) |
| GlitchText | 上游 | RGB split and distortion glitch effect with jitter effects. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/GlitchText/GlitchText.tsx>) |
| GradientText | 上游 | Animated gradient sweep across live text with speed and color control. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/GradientText/GradientText.tsx>) |
| MaskedHeading | 上游 | A large headline with a drifting colour mesh or image showing through the glyphs, revealed word by word. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/MaskedHeading/MaskedHeading.tsx>) |
| ParticleText | 上游 | Text assembles from drifting particles that scatter and reform on demand. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ParticleText/ParticleText.tsx>) |
| RotatingText | 上游 | Cycles through multiple phrases with 3D rotate / flip transitions. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/RotatingText/RotatingText.tsx>) |
| ScrambledText | 上游 | Detects cursor position and applies a distortion effect to text. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ScrambledText/ScrambledText.tsx>) |
| ScrollFloat | 上游 | Text gently floats / parallax shifts on scroll. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.tsx>) |
| ScrollReveal | 上游 | Text gently unblurs and reveals on scroll. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx>) |
| ScrollVelocity | 上游 | Text marquee animatio - speed and distortion scale with user's scroll velocity. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ScrollVelocity/ScrollVelocity.tsx>) |
| ShinyText | 上游 | Metallic sheen sweeps across text producing a reflective highlight. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/ShinyText/ShinyText.tsx>) |
| Shuffle | 上游 | Animated text reveal where characters shuffle before settling. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/Shuffle/Shuffle.tsx>) |
| SplitFlapText | 上游 | Mechanical split-flap departure board that clacks through to each new phrase. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx>) |
| SplitText | 上游 | Splits text into characters / words for staggered entrance animation. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/SplitText/SplitText.tsx>) |
| StrokeText | 上游 | Outlined letterforms draw themselves on, then flood with fill. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/StrokeText/StrokeText.tsx>) |
| TechText | 上游 | A wordmark whose letters turn into dashed vector paths under the cursor. Grab any letter to drag it off the baseline and it springs back home. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TechText/TechText.tsx>) |
| TextCursor | 上游 | Make any text element follow your cursor, leaving a trail of copies behind it. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TextCursor/TextCursor.tsx>) |
| TextLoop | 上游 | A seamless text marquee that flows along curved SVG paths. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TextLoop/TextLoop.tsx>) |
| TextPressure | 上游 | Characters scale / warp interactively based on pointer pressure zone. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TextPressure/TextPressure.tsx>) |
| TextType | 上游 | Typewriter effect with blinking cursor and adjustable typing cadence. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TextType/TextType.tsx>) |
| TrueFocus | 上游 | Applies dynamic blur / clarity based over a series of words in order. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/TrueFocus/TrueFocus.tsx>) |
| VariableProximity | 上游 | Letter styling changes continuously with pointer distance mapping. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/VariableProximity/VariableProximity.tsx>) |
| WarpText | 上游 | WebGL warp that bends and refracts the text around the pointer. | [源码](<X:/myui/react-bits/src/ts-default/TextAnimations/WarpText/WarpText.tsx>) |

## Aceternity 全部目录

### 01-static-visual（17）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| 3d Card / 3d-card | components | 3d-card component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/3d-card/components/ui/3d-card.tsx>) |
| Bento Grid / bento-grid | components | A skewed grid layout with Title, description and a header component | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/bento-grid/components/ui/bento-grid.tsx>) |
| Cards Demo 1 / cards-demo-1 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/cards-demo-1/components/cards-demo-1.tsx>) |
| Cards Demo 2 / cards-demo-2 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/cards-demo-2/components/cards-demo-2.tsx>) |
| Carousel / carousel | components | A customizable carousel with microinteractions and slider. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/carousel/components/ui/carousel.tsx>) |
| Code Block / code-block | components | A configurable code block component built on top of react-syntax-highlighter. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/code-block/components/ui/code-block.tsx>) |
| Encrypted Text / encrypted-text | components | A text component that reveals the text gradually, gibberish effect. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/encrypted-text/components/ui/encrypted-text.tsx>) |
| Features Section Demo 2 / features-section-demo-2 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/features-section-demo-2/components/features-section-demo-2.tsx>) |
| Focus Cards / focus-cards | components | Hover over the card to focus on it, blurring the rest of the cards. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/focus-cards/components/ui/focus-cards.tsx>) |
| Glare Card / glare-card | components | A glare effect that happens on hover, as seen on Linear's website | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/glare-card/components/ui/glare-card.tsx>) |
| Glowing Effect / glowing-effect | components | A border glowing effect that adapts to any container or card, as seen on Cursor's website. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/glowing-effect/components/ui/glowing-effect.tsx>) |
| Grid / grid | components | grid component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/grid/components/ui/grid.tsx>) |
| Label / label | components | label component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/label/components/ui/label.tsx>) |
| Scales / scales | components | A repeating diagonal, horizontal, or vertical line pattern background effect. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/scales/components/ui/scales.tsx>) |
| Tailwind CSS buttons / tailwindcss-buttons | components | A curated list of awesome, battle tested Tailwind CSS buttons components | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/tailwindcss-buttons/components/ui/tailwindcss-buttons.tsx>) |
| Terminal / terminal | components | A mac style terminal component with bash syntax highlighting and typewriter effect. | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/terminal/components/ui/terminal.tsx>) |
| Use Outside Click / use-outside-click | hooks |  | [源码](<X:/myui/aceternity/by-paradigm/01-static-visual/use-outside-click/hooks/use-outside-click.tsx>) |

### 02-css-keyframes（3）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| Aurora Background / aurora-background | components | A subtle Aurora or Southern Lights background for your website. | [源码](<X:/myui/aceternity/by-paradigm/02-css-keyframes/aurora-background/components/ui/aurora-background.tsx>) |
| Background Ripple Effect / background-ripple-effect | components | A grid of cells that ripple when clicked. | [源码](<X:/myui/aceternity/by-paradigm/02-css-keyframes/background-ripple-effect/components/ui/background-ripple-effect.tsx>) |
| Infinite Moving Cards / infinite-moving-cards | components | A customizable group of cards that move infinitely in a loop. Made with Framer Motion and Tailwind CSS. | [源码](<X:/myui/aceternity/by-paradigm/02-css-keyframes/infinite-moving-cards/components/ui/infinite-moving-cards.tsx>) |

### 03-enter-exit（44）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| 3D Marquee / 3d-marquee | components | A 3D Marquee effect with grid, good for showcasing testimonials and hero sections | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/3d-marquee/components/ui/3d-marquee.tsx>) |
| 3D Animated Pin / 3d-pin | components | A gradient pin that animates on hover, perfect for product links. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/3d-pin/components/ui/3d-pin.tsx>) |
| Animated Testimonials / animated-testimonials | components | Minimal testimonials sections with image and quote. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/animated-testimonials/components/ui/animated-testimonials.tsx>) |
| Apple Cards Carousel / apple-cards-carousel | components | A sleek and minimal carousel implementation, as seen on apple.com | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/apple-cards-carousel/components/ui/apple-cards-carousel.tsx>) / [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/apple-cards-carousel/hooks/use-outside-click.tsx>) |
| Background Beams With Collision / background-beams-with-collision | components | Exploding beams in the background | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/background-beams-with-collision/components/ui/background-beams-with-collision.tsx>) |
| Background Boxes / background-boxes | components | A full width background box container that highlights on hover | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/background-boxes/components/ui/background-boxes.tsx>) |
| Background Gradient / background-gradient | components | An animated gradient that sits at the background of a card, button or anything. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/background-gradient/components/ui/background-gradient.tsx>) |
| Background Lines / background-lines | components | A set of svg paths that animate in a wave pattern. Good for hero sections background, as seen on height.app | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/background-lines/components/ui/background-lines.tsx>) |
| Hover Effect / card-hover-effect | components | Hover over the cards and the effect slides to the currently hovered card. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/card-hover-effect/components/ui/card-hover-effect.tsx>) |
| Card Stack / card-stack | components | Cards stack on top of each other after some interval. Perfect for showing testimonials. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/card-stack/components/ui/card-stack.tsx>) |
| Colourful Text / colourful-text | components | A text component with various colours, filter and scale effects. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/colourful-text/components/ui/colourful-text.tsx>) |
| Compare / compare | components | A comparison component between two images, slide or drag to compare | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/compare/components/ui/compare.tsx>) |
| Container Text Flip / container-text-flip | components | A container that flips through words, animating the width. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/container-text-flip/components/ui/container-text-flip.tsx>) |
| Direction Aware Hover / direction-aware-hover | components | A direction aware hover effect using Framer Motion, Tailwindcss and good old javascript. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/direction-aware-hover/components/ui/direction-aware-hover.tsx>) |
| Features Section Demo 3 / features-section-demo-3 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/features-section-demo-3/components/features-section-demo-3.tsx>) |
| File Upload / file-upload | components | A minimal file upload form with background grid, drag and drop, and micro interactions. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/file-upload/components/ui/file-upload.tsx>) |
| Flip Words / flip-words | components | A component that flips through a list of words | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/flip-words/components/ui/flip-words.tsx>) |
| Glowing Stars / glowing-stars | components | glowing-stars component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/glowing-stars/components/ui/glowing-stars.tsx>) |
| Hero Section Demo 1 / hero-section-demo-1 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/hero-section-demo-1/components/hero-section-demo-1.tsx>) |
| Hover Border Gradient / hover-border-gradient | components | A hover effect that expands to the entire container with a gradient border. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/hover-border-gradient/components/ui/hover-border-gradient.tsx>) |
| Images Badge / images-badge | components | A badge with images that can be hovered to reveal more images. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/images-badge/components/ui/images-badge.tsx>) |
| Images Slider / images-slider | components | A full page slider with images that can be navigated with the keyboard. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/images-slider/components/ui/images-slider.tsx>) |
| Keyboard / keyboard | components | A mac style keyboard component with mechanical keys sound effects. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/keyboard/components/ui/keyboard.tsx>) |
| Lamp / lamp | components | lamp component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/lamp/components/ui/lamp.tsx>) |
| Layout Grid / layout-grid | components | A layout effect that animates the grid item on click, powered by framer motion layout | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/layout-grid/components/ui/layout-grid.tsx>) |
| Layout Text Flip / layout-text-flip | components | A text flip effect that changes the layout of surrounding text | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/layout-text-flip/components/ui/layout-text-flip.tsx>) |
| Lens / lens | components | A lens component to zoom into images, videos, or practically anything. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/lens/components/ui/lens.tsx>) |
| Loaders / loader | components | A set of simple and minimal loaders for your loading screens and components. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/loader/components/ui/loader.tsx>) |
| Magnetic Button / magnetic-button | components | A button that subtly drifts toward the cursor as you hover, with a spring-based return when you leave. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/magnetic-button/components/ui/magnetic-button.tsx>) |
| Meteor Effect / meteors | components | A group of beams in the background of a container, sort of like meteors. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/meteors/components/ui/meteors.tsx>) |
| Multi Step Loader / multi-step-loader | components | A step loader for screens that take a lot of time to load. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/multi-step-loader/components/ui/multi-step-loader.tsx>) |
| Navbar Menu / navbar-menu | components | A navbar menu that animates its children on hover, makes a beautiful bignav | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/navbar-menu/components/ui/navbar-menu.tsx>) |
| Notch / notch | components | A floating, configurable notch that pins to the top or bottom of the screen. Pass an array of items with links and it animates the active state as you switch between them. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/notch/components/ui/notch.tsx>) |
| Pointer Highlight / pointer-highlight | components | A component that highlights text when it's in view, with a pointer and border. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/pointer-highlight/components/ui/pointer-highlight.tsx>) |
| Sidebar / sidebar | components | Expandable sidebar that expands on hover, mobile responsive and dark mode support | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/sidebar/components/ui/sidebar.tsx>) |
| Spotlight New / spotlight-new | components | A new spotlight component with left and right spotlight, configurable and customizable. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/spotlight-new/components/ui/spotlight-new.tsx>) |
| SVG Mask Effect / svg-mask-effect | components | A mask reveal effect, hover the cursor over a container to reveal what's underneath. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/svg-mask-effect/components/ui/svg-mask-effect.tsx>) |
| Animated Tabs / tabs | components | Tabs to switch content, click on a tab to check background animation. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/tabs/components/ui/tabs.tsx>) |
| Text Flipping Board / text-flipping-board | components | A split-flap display component that animates characters with flip transitions, inspired by Vestaboard. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/text-flipping-board/components/ui/text-flipping-board.tsx>) |
| Text Generate Effect / text-generate-effect | components | A cool text effect that fades in text on page load, one by one. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/text-generate-effect/components/ui/text-generate-effect.tsx>) |
| Text Reveal Card / text-reveal-card | components | Mousemove effect to reveal text content at the bottom of the card. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/text-reveal-card/components/ui/text-reveal-card.tsx>) |
| Tooltip Card / tooltip-card | components | A tooltip card container that follows mouse pointer when hovered over | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/tooltip-card/components/ui/tooltip-card.tsx>) |
| Typewriter Effect / typewriter-effect | components | Text generates as if it is being typed on the screen. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/typewriter-effect/components/ui/typewriter-effect.tsx>) |
| Wobble Card / wobble-card | components | A card effect that translates and scales on mousemove, perfect for feature cards. | [源码](<X:/myui/aceternity/by-paradigm/03-enter-exit/wobble-card/components/ui/wobble-card.tsx>) |

### 04-svg-vector（14）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| Animated Modal / animated-modal | components | A customizable, compound modal component with animated transitions | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/animated-modal/components/ui/animated-modal.tsx>) |
| Background Beams / background-beams | components | Multiple background beams that follow a path of SVG, makes a good hero section background. | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/background-beams/components/ui/background-beams.tsx>) |
| Background Gradient Animation / background-gradient-animation | components | A smooth and elegant background gradient animation that changes the gradient position over time. | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/background-gradient-animation/components/ui/background-gradient-animation.tsx>) |
| Cards Demo 3 / cards-demo-3 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/cards-demo-3/components/cards-demo-3.tsx>) |
| Expandable Card Demo Grid / expandable-card-demo-grid | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/expandable-card-demo-grid/components/expandable-card-demo-grid.tsx>) / [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/expandable-card-demo-grid/hooks/use-outside-click.tsx>) |
| Expandable Card Demo Standard / expandable-card-demo-standard | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/expandable-card-demo-standard/components/expandable-card-demo-standard.tsx>) / [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/expandable-card-demo-standard/hooks/use-outside-click.tsx>) |
| Features Section Demo 1 / features-section-demo-1 | blocks |  | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/features-section-demo-1/components/features-section-demo-1.tsx>) |
| Gooey Input / gooey-input | components | A search-style input that expands with a gooey SVG filter and shared layout animation | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/gooey-input/components/ui/gooey-input.tsx>) |
| Google Gemini Effect / google-gemini-effect | components | An effect of SVGs as seen on the Google Gemini Website | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/google-gemini-effect/components/ui/google-gemini-effect.tsx>) |
| Shooting Stars / shooting-stars | components | shooting-stars component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/shooting-stars/components/ui/shooting-stars.tsx>) |
| Spotlight / spotlight | components | A spotlight effect with Tailwind CSS, good for drawing attention to a particular element on the page. | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/spotlight/components/ui/spotlight.tsx>) |
| Stateful Button / stateful-button | components | A button that shows a loading state when clicked, and a success state when the action is completed. | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/stateful-button/components/ui/stateful-button.tsx>) |
| Text Hover Effect / text-hover-effect | components | A text hover effect that animates and outlines gradient on hover, as seen on x.ai | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/text-hover-effect/components/ui/text-hover-effect.tsx>) |
| World Map / world-map | components | A world map with animated lines and dots, programatically generated. | [源码](<X:/myui/aceternity/by-paradigm/04-svg-vector/world-map/components/ui/world-map.tsx>) |

### 05-motion-pipeline（13）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| Animated Tooltip / animated-tooltip | components | A cool tooltip that reveals on hover, follows mouse pointer | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/animated-tooltip/components/ui/animated-tooltip.tsx>) |
| Comet Card / comet-card | components | A perspective, 3D, Tilt card as seen on Perplexity Comet's website. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/comet-card/components/ui/comet-card.tsx>) |
| Draggable Card / draggable-card | components | A tiltable, draggable card component that jumps on bounds. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/draggable-card/components/ui/draggable-card.tsx>) |
| Evervault Card / evervault-card | components | A cool card with amazing hover effect, reveals encrypted text and a mixed gradient. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/evervault-card/components/ui/evervault-card.tsx>) |
| Floating Dock / floating-dock | components | A floating dock mac os style component, acts as a navigation bar. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/floating-dock/components/ui/floating-dock.tsx>) |
| Following Pointer / following-pointer | components | A custom pointer that follows mouse arrow and animates in pointer and content. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/following-pointer/components/ui/following-pointer.tsx>) |
| Hero Highlight / hero-highlight | components | A background effect with a text highlight component, perfect for hero sections. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/hero-highlight/components/ui/hero-highlight.tsx>) |
| Input / input | components | input component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/input/components/ui/input.tsx>) |
| Link Preview / link-preview | components | Dynamic link previews for your anchor tags | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/link-preview/components/ui/link-preview.tsx>) |
| Moving Border / moving-border | components | A border that moves around the container. Perfect for making your buttons stand out. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/moving-border/components/ui/moving-border.tsx>) |
| Noise Background / noise-background | components | A dynamic background effect with animated gradients, noise texture, and smooth motion. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/noise-background/components/ui/noise-background.tsx>) |
| Parallax Hero Images / parallax-hero-images | components | Mouse-driven parallax effect, perfect for hero sections. Images blur fade in and move at different depths. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/parallax-hero-images/components/ui/parallax-hero-images.tsx>) |
| Squiggly Text / squiggly-text | components | A squiggly text effect using SVG turbulence and displacement filters, animated with Motion. | [源码](<X:/myui/aceternity/by-paradigm/05-motion-pipeline/squiggly-text/components/ui/squiggly-text.tsx>) |

### 06-scroll-driven（12）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| Container Scroll Animation / container-scroll-animation | components | A scroll animation that rotates in 3d on scroll. Perfect for hero or marketing sections. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/container-scroll-animation/components/ui/container-scroll-animation.tsx>) |
| Floating Navbar / floating-navbar | components | A sticky Navbar that hides on scroll, reveals when scrolled up. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/floating-navbar/components/ui/floating-navbar.tsx>) |
| Hero Parallax / hero-parallax | components | A scroll effect with rotation, translation and opacity animations. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/hero-parallax/components/ui/hero-parallax.tsx>) |
| Fey.com Macbook Scroll / macbook-scroll | components | Scroll through the page and see the image come out of the screen, as seen on Fey.com website. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/macbook-scroll/components/ui/macbook-scroll.tsx>) |
| Moving Line / moving-line | components | moving-line component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/moving-line/components/ui/moving-line.tsx>) |
| Parallax Scroll 2 / parallax-scroll-2 | components | parallax-scroll-2 component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/parallax-scroll-2/components/ui/parallax-scroll-2.tsx>) |
| Parallax Grid Scroll / parallax-scroll | components | A grid where two columns scroll in oposite directions, giving a parallax effect. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/parallax-scroll/components/ui/parallax-scroll.tsx>) |
| Resizable Navbar / resizable-navbar | components | A navbar that changes width on scroll, responsive and animated. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/resizable-navbar/components/ui/resizable-navbar.tsx>) |
| Sticky Banner / sticky-banner | components | A banner component that sticks to top, hides when user scrolls down | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/sticky-banner/components/ui/sticky-banner.tsx>) |
| Sticky Scroll Reveal / sticky-scroll-reveal | components | A sticky container that sticks while scrolling, text reveals on scroll | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/sticky-scroll-reveal/components/ui/sticky-scroll-reveal.tsx>) |
| Timeline / timeline | components | A timeline component with sticky header and scroll beam follow. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/timeline/components/ui/timeline.tsx>) |
| Tracing Beam / tracing-beam | components | A Beam that follows the path of an SVG as the user scrolls. Adjusts beam length with scroll speed. | [源码](<X:/myui/aceternity/by-paradigm/06-scroll-driven/tracing-beam/components/ui/tracing-beam.tsx>) |

### 07-canvas-2d（11）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| ASCII Art / ascii-art | components | Convert any image to ASCII art with customizable charsets, colors, and animations. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/ascii-art/components/ui/ascii-art.tsx>) |
| Canvas Text / canvas-text | components | Animated text component with colorful curved lines rendered on canvas, clipped to the text shape. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/canvas-text/components/ui/canvas-text.tsx>) |
| Dither Shader / dither-shader | components | A real-time ordered dithering effect for images, perfect for pixel art and retro aesthetics. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/dither-shader/components/ui/dither-shader.tsx>) |
| Dotted Glow Background / dotted-glow-background | components | A background effect with opacity animation, glow effect and more. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/dotted-glow-background/components/ui/dotted-glow-background.tsx>) |
| Image Generation Loader / image-generation-loader | components | A canvas loader that scans across an image with animated pixel grids, text masks, and progress overlays. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/image-generation-loader/components/ui/image-generation-loader.tsx>) |
| Pixelated Canvas / pixelated-canvas | components | Convert any image to a pixelated canvas mouse distortion effects, as seen on Tailwind CSS Website. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/pixelated-canvas/components/ui/pixelated-canvas.tsx>) |
| Placeholders And Vanish Input / placeholders-and-vanish-input | components | Sliding in placeholders and vanish effect of input on submit | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/placeholders-and-vanish-input/components/ui/placeholders-and-vanish-input.tsx>) |
| Stars Background / stars-background | components | stars-background component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/stars-background/components/ui/stars-background.tsx>) |
| Vortex Background / vortex | components | A wavy, swirly, vortex background ideal for CTAs and backgrounds. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/vortex/components/ui/vortex.tsx>) |
| Wavy Background / wavy-background | components | A cool background effect with waves that move. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/wavy-background/components/ui/wavy-background.tsx>) |
| Webcam Pixel Grid / webcam-pixel-grid | components | A real-time webcam pixel grid effect, perfect for pixel art and retro aesthetics. | [源码](<X:/myui/aceternity/by-paradigm/07-canvas-2d/webcam-pixel-grid/components/ui/webcam-pixel-grid.tsx>) |

### 08-particles-engine（2）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| Cover / cover | components | cover component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/08-particles-engine/cover/components/ui/cover.tsx>) / [源码](<X:/myui/aceternity/by-paradigm/08-particles-engine/cover/components/ui/sparkles.tsx>) |
| Sparkles / sparkles | components | A configurable sparkles component that can be used as a background or as a standalone component. | [源码](<X:/myui/aceternity/by-paradigm/08-particles-engine/sparkles/components/ui/sparkles.tsx>) |

### 09-webgl-shader（6）

| 名称 | 类型 | 用途（API元数据） | 入口 |
| --- | --- | --- | --- |
| 3D Globe / 3d-globe | components | A realistic globe component with tooltips and avatar tips | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/3d-globe/components/ui/3d-globe.tsx>) |
| Canvas Reveal Effect / canvas-reveal-effect | components | A dot background that expands on hover, as seen on Clerk's website | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/canvas-reveal-effect/components/ui/canvas-reveal-effect.tsx>) |
| Card Spotlight / card-spotlight | components | A card component with a spotlight effect revealing a radial gradient background | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/card-spotlight/components/ui/card-spotlight.tsx>) / [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/card-spotlight/components/ui/canvas-reveal-effect.tsx>) |
| Chromatic Image / chromatic-image | components | An interactive image with responsive color separation, displacement, and tilt. | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/chromatic-image/components/ui/chromatic-image.tsx>) |
| Cloud Shader / cloud-shader | components | Soft procedural clouds that drift across the sky. Tune speed, count, and colors with props. | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/cloud-shader/components/ui/cloud-shader.tsx>) |
| Globe / globe | components | globe component for React/Next.js | [源码](<X:/myui/aceternity/by-paradigm/09-webgl-shader/globe/components/ui/globe.tsx>) |

## PULSAR 试验场源码

| 名称 | 关系 | 入口 |
| --- | --- | --- |
| AnimatedContent | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/AnimatedContent/AnimatedContent.jsx>) |
| AnimatedList | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/AnimatedList/AnimatedList.jsx>) |
| Aurora | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Aurora/Aurora.jsx>) |
| BlurText | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/BlurText/BlurText.jsx>) |
| ClickSpark | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/ClickSpark/ClickSpark.jsx>) |
| CountUp | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/CountUp/CountUp.jsx>) |
| Counter | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Counter/Counter.jsx>) |
| DecryptedText | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/DecryptedText/DecryptedText.jsx>) |
| Dock | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Dock/Dock.jsx>) |
| ElasticTabs | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/ElasticTabs/ElasticTabs.jsx>) |
| FlipCard | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/FlipCard/FlipCard.jsx>) |
| GradientText | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/GradientText/GradientText.jsx>) |
| LogoLoop | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/LogoLoop/LogoLoop.jsx>) |
| Magnet | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Magnet/Magnet.jsx>) |
| MotionGallery | 页面编排 | [源码](<X:/myui/pulsar/src/components/MotionGallery/MotionGallery.jsx>) |
| OrbitSlider | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/OrbitSlider/OrbitSlider.jsx>) |
| Particles | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Particles/Particles.jsx>) |
| PromptBar | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/PromptBar/PromptBar.jsx>) |
| Radar | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/Radar/Radar.jsx>) |
| RippleButton | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/RippleButton/RippleButton.jsx>) |
| ScrollVelocity | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/ScrollVelocity/ScrollVelocity.jsx>) |
| ShinyText | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/ShinyText/ShinyText.jsx>) |
| SpotlightCard | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/SpotlightCard/SpotlightCard.jsx>) |
| SpringAccordion | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/SpringAccordion/SpringAccordion.jsx>) |
| SquishSwitch | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/SquishSwitch/SquishSwitch.jsx>) |
| StarBorder | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/StarBorder/StarBorder.jsx>) |
| TargetCursor | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/TargetCursor/TargetCursor.jsx>) |
| TextType | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/TextType/TextType.jsx>) |
| TiltedCard | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/TiltedCard/TiltedCard.jsx>) |
| ToastStack | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/ToastStack/ToastStack.jsx>) |
| TrueFocus | 库中有同名项；不证明源码相同 | [源码](<X:/myui/pulsar/src/components/TrueFocus/TrueFocus.jsx>) |

## 未覆盖范围

本轮只做目录/源文件快照盘点，不运行组件行为测试、build、tsc、完整lint或独立安装。不重新认证R2/R3历史结果。未逐项人工读完392个条目/模块，不检查全部props、资源可达性、许可证适用方式、宿主适配、空值/错误分支、SSR、触摸、Safari、无障碍及性能。导入扫描仅识别from字符串，不代表完整依赖解析。工作区外Downloads等路径未扫描。

## 本轮文档可能引入的新风险

目录是当前快照，增删组件后必须重跑；跨库相似能力保留两个条目，不能拿总数当独立功能数；范式正则分类和API描述可能过于粗糙，选用前读真实接口；偏好与页面方案在DESIGN-PREFERENCES.md分开标记原话、历史记录、设计推断。
