import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

import Aurora from './components/Aurora/Aurora';
import Particles from './components/Particles/Particles';
import DecryptedText from './components/DecryptedText/DecryptedText';
import GradientText from './components/GradientText/GradientText';
import ShinyText from './components/ShinyText/ShinyText';
import CountUp from './components/CountUp/CountUp';
import ScrollVelocity from './components/ScrollVelocity/ScrollVelocity';
import TrueFocus from './components/TrueFocus/TrueFocus';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Magnet from './components/Magnet/Magnet';
import Counter from './components/Counter/Counter';
import SpotlightCard from './components/SpotlightCard/SpotlightCard';
import TiltedCard from './components/TiltedCard/TiltedCard';
import AnimatedList from './components/AnimatedList/AnimatedList';
import Dock from './components/Dock/Dock';
import SquishSwitch from './components/SquishSwitch/SquishSwitch';
import PromptBar from './components/PromptBar/PromptBar';
import AnimatedContent from './components/AnimatedContent/AnimatedContent';
import BlurText from './components/BlurText/BlurText';
import StarBorder from './components/StarBorder/StarBorder';
import TargetCursor from './components/TargetCursor/TargetCursor';
import TextType from './components/TextType/TextType';
import Radar from './components/Radar/Radar';
import LogoLoop from './components/LogoLoop/LogoLoop';
import MotionGallery, { MICRO_COMPONENTS } from './components/MotionGallery/MotionGallery';

const COMPONENT_COUNT = 24 + MICRO_COMPONENTS.length;

const NAV = [
	{ label: '能力', href: '#capabilities' },
	{ label: '作品', href: '#works' },
	{ label: '组件', href: '#components' },
	{ label: '实验台', href: '#lab' },
	{ label: '试玩', href: '#playground' }
];

const rgba = (hex, a) => {
	const n = parseInt(hex.slice(1), 16);
	return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/* 主题驱动全站配色：每个主题定义整套变量，切换时全站（含组件）实时跟随 */
const THEMES = [
	{
		name: '暖阳',
		light: true,
		stops: ['#FF6B4A', '#FFB347', '#FFD166'],
		bg: '#FFF8F0',
		ink: '#3D2C1E',
		muted: '#8A7460',
		faint: '#B3A18F',
		ghost: '#CDBBA8',
		accent: '#FF6B4A',
		accent2: '#F59E0B',
		card: 'rgba(255,255,255,0.66)',
		border: 'rgba(61,44,30,0.14)',
		wash: 'rgba(255,255,255,0.55)',
		particles: ['#FF6B4A', '#F59E0B', '#FFB347', '#FFD9A0'],
		cta: { bg: '#FF6B4A', border: '#FFB347', star: '#FFE9C7', text: '#FFFFFF' },
		prompt: { bg: '#FFFFFF', menu: '#FFF3E6', spark: '#FF6B4A' },
		feed: { item: '#FFF1E3', active: '#FFE2CB', text: '#3D2C1E', fade: '#FFF6EC', thumb: '#EBD7C0' }
	},
	{
		name: '青柠汽水',
		light: true,
		stops: ['#00E5A8', '#38F8D4', '#7CE0FF'],
		bg: '#F1FBF5',
		ink: '#12372A',
		muted: '#5D8A77',
		faint: '#93B5A4',
		ghost: '#BDD4C6',
		accent: '#0DBF77',
		accent2: '#0EA5B7',
		card: 'rgba(255,255,255,0.62)',
		border: 'rgba(18,55,42,0.14)',
		wash: 'rgba(255,255,255,0.5)',
		particles: ['#0DBF77', '#0EA5B7', '#38F8D4', '#7CE0FF'],
		cta: { bg: '#0DBF77', border: '#38F8D4', star: '#DFFFF2', text: '#FFFFFF' },
		prompt: { bg: '#FFFFFF', menu: '#E8F6EE', spark: '#0DBF77' },
		feed: { item: '#ECF7F0', active: '#D9EFE2', text: '#12372A', fade: '#F1FBF5', thumb: '#C4DECE' }
	},
	{
		name: '蜜桃日落',
		light: false,
		stops: ['#FF5E3A', '#FF8A5C', '#FFC46B'],
		bg: '#1E1216',
		ink: '#FFE9D8',
		muted: '#C9A896',
		faint: '#9E7E6C',
		ghost: '#6E4F44',
		accent: '#FF7A4D',
		accent2: '#FFB86B',
		card: 'rgba(255,255,255,0.045)',
		border: 'rgba(255,233,216,0.12)',
		wash: 'rgba(255,255,255,0.025)',
		particles: ['#FF8A5C', '#FFB86B', '#FFE9D8', '#FF5E3A'],
		cta: { bg: '#FF7A4D', border: '#FFB86B', star: '#FFE9D8', text: '#33160B' },
		prompt: { bg: '#2B1A1F', menu: '#3B242B', spark: '#FFB86B' },
		feed: { item: '#2B1B21', active: '#3C262E', text: '#FFE9D8', fade: '#1E1216', thumb: '#4A2E36' }
	},
	{
		name: '经典深夜',
		light: false,
		stops: ['#5227FF', '#B537F2', '#00E5FF'],
		bg: '#030014',
		ink: '#E2E8F0',
		muted: '#94A3B8',
		faint: '#64748B',
		ghost: '#334155',
		accent: '#A78BFA',
		accent2: '#22D3EE',
		card: 'rgba(255,255,255,0.03)',
		border: 'rgba(255,255,255,0.08)',
		wash: 'rgba(255,255,255,0.02)',
		particles: ['#a78bfa', '#e879f9', '#22d3ee', '#ffffff'],
		cta: { bg: '#7C3AED', border: '#A78BFA', star: '#C4B5FD', text: '#FFFFFF' },
		prompt: { bg: '#131028', menu: '#1B1533', spark: '#C4B5FD' },
		feed: { item: '#111111', active: '#222222', text: '#FFFFFF', fade: '#120F17', thumb: '#222222' }
	}
];

const themeVars = t => ({
	'--bg': t.bg,
	'--ink': t.ink,
	'--muted': t.muted,
	'--faint': t.faint,
	'--ghost': t.ghost,
	'--card': t.card,
	'--border': t.border,
	'--wash': t.wash,
	'--accent': t.accent,
	'--accent2': t.accent2,
	'--accent-soft': rgba(t.accent, t.light ? 0.14 : 0.12),
	'--accent-softer': rgba(t.accent, t.light ? 0.08 : 0.05),
	'--accent-hover': rgba(t.accent, t.light ? 0.24 : 0.22),
	'--accent-border': rgba(t.accent, t.light ? 0.45 : 0.4),
	'--reply-bg': rgba(t.accent, t.light ? 0.08 : 0.1),
	'--reply-border': rgba(t.accent, t.light ? 0.3 : 0.22),
	'--sel': t.accent
});

const STATS = [
	{ to: 128, suffix: ' 个', label: '上线项目' },
	{ to: 60, suffix: ' fps', label: '平均帧率' },
	{ to: COMPONENT_COUNT, suffix: ' 种', label: '动效组件' },
	{ to: 4096, suffix: ' 杯', label: '咖啡消耗' }
];

const CAPABILITIES = [
	{
		icon: '🌀',
		title: '生成式动效',
		desc: 'WebGL shader 与弹簧物理驱动界面呼吸感，每一个像素都经过插值。'
	},
	{
		icon: '⚡',
		title: '微交互炼金',
		desc: '按钮不再是按钮，是可按压、可回弹、会发光的生命体。'
	},
	{
		icon: '🛰️',
		title: '实时数据演出',
		desc: '把枯燥的指标变成一场灯光秀，数字在 canvas 上跳舞。'
	}
];

const WORKS = [
	{ src: '/assets/showcase-afaq.webp', caption: 'NEON·霓虹重构', tag: '品牌官网' },
	{ src: '/assets/showcase-dominik.webp', caption: 'FLUX·粒子引擎', tag: '数据可视化' },
	{ src: '/assets/showcase-oscar.webp', caption: 'ORBIT·轨道画廊', tag: '3D 展厅' },
	{ src: '/assets/showcase-izadoesdev.webp', caption: 'ECHO·回声终端', tag: '开发者工具' }
];

const FEED = [
	'⚡ 渲染管线 v4.2 已部署到边缘节点',
	'🌀 Aurora 着色器帧时间 1.8ms',
	`📦 组件目录 · ${COMPONENT_COUNT} 种动效，6 个新交互`,
	'🛰️ 卫星频道 #pulsar-live 已连接',
	'🎚️ 弹簧参数 damping=20 stiffness=100',
	'✨ 新动效「液态玻璃」进入灰度',
	'🧪 物理引擎 matter-js 沙箱就绪',
	'🔥 热更新：微交互延迟降低 32%',
	'📊 帧率监控：60fps 稳定',
	'🎨 四套主题 · 一键切换全站配色',
	'🚀 发布列车驶向生产环境',
	'💾 存档点已保存 · rev 2049'
];

const SAMPLE_QUESTIONS = ['「今天炫什么技？」', '「换个配色看看？」', '「帧数还能再高一点吗？」'];

const TECH = ['REACT 19', 'MOTION', 'GSAP', 'OGL · WEBGL', 'TAILWIND CSS 4', 'VITE', `PULSAR · ${COMPONENT_COUNT} 组件`, '弹簧物理', 'rAF 驱动'];

const DOCK_ITEMS = [
	{ icon: <span className="text-2xl">✦</span>, label: '首页', onClick: () => scrollTo({ top: 0, behavior: 'smooth' }) },
	{ icon: <span className="text-2xl">🌀</span>, label: '能力', onClick: () => document.querySelector('#capabilities')?.scrollIntoView({ behavior: 'smooth' }) },
	{ icon: <span className="text-2xl">🖼️</span>, label: '作品', onClick: () => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }) },
	{ icon: <span className="text-2xl">📡</span>, label: '实验台', onClick: () => document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' }) },
	{ icon: <span className="text-2xl">🎮</span>, label: '试玩', onClick: () => document.querySelector('#playground')?.scrollIntoView({ behavior: 'smooth' }) }
];

function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
	return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent)]" />;
}

function SectionTitle({ kicker, children }) {
	return (
		<div className="mb-12 text-center">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--accent)]">{kicker}</p>
			<BlurText
				text={children}
				animateBy="letters"
				delay={60}
				threshold={0.2}
				className="text-3xl font-bold text-[var(--ink)] md:text-5xl"
			/>
		</div>
	);
}

/* WebGL 画布只在临近视口时挂载，滚远即卸载——省下看不见的 GPU 开销 */
function useNearViewport(margin = '300px') {
	const ref = useRef(null);
	const [near, setNear] = useState(true);
	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === 'undefined') return;
		const io = new IntersectionObserver(entries => setNear(entries[0].isIntersecting), { rootMargin: margin });
		io.observe(el);
		return () => io.disconnect();
	}, [margin]);
	return [ref, near];
}

export default function App() {
	const [frames, setFrames] = useState(2049);
	const [turbo, setTurbo] = useState(false);
	const [promptReply, setPromptReply] = useState(null);
	const [theme, setTheme] = useState(0);
	const t = THEMES[theme];
	const [heroRef, heroNear] = useNearViewport();
	const [radarRef, radarNear] = useNearViewport();

	useEffect(() => {
		const id = setInterval(() => setFrames(f => f + Math.floor(Math.random() * (turbo ? 900 : 60)) + 1), turbo ? 120 : 1000);
		return () => clearInterval(id);
	}, [turbo]);

	// 主题变量挂到 :root，让 fixed 定位的兄弟元素（进度条、光标）也能取到
	useEffect(() => {
		const vars = themeVars(t);
		for (const [k, v] of Object.entries(vars)) document.documentElement.style.setProperty(k, v);
		document.body.style.backgroundColor = vars['--bg'];
		document.body.style.color = vars['--ink'];
	}, [theme]);

	return (
		<ClickSpark sparkColor={t.accent} sparkCount={10} sparkSize={12}>
			<ScrollProgress />
			<TargetCursor targetSelector="a, button, [role='button']" spinDuration={12} cursorColor={t.accent2} cursorColorOnTarget={t.accent} />
			<div style={themeVars(t)} className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--ink)] transition-colors duration-500">
				{/* ─────────── 导航 ─────────── */}
				<nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md md:px-12">
					<a href="#" className="text-xl font-black tracking-widest">
						<GradientText colors={[t.accent, t.accent2, t.accent]} animationSpeed={5} className="!text-xl">
							PULSAR
						</GradientText>
					</a>
					<div className="hidden items-center gap-2 md:flex">
						{NAV.map(item => (
							<Magnet key={item.href} padding={30} magnetStrength={3}>
								<a href={item.href} className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
									{item.label}
								</a>
							</Magnet>
						))}
					</div>
					<Magnet padding={60} magnetStrength={4}>
						<a
							href="#components"
							className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-5 py-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-hover)]"
						>
							<ShinyText text="开始炫技 ✦" speed={3} color={t.accent} shineColor={t.light ? '#FFFFFF' : '#EDE9FE'} />
						</a>
					</Magnet>
				</nav>

				{/* ─────────── Hero ─────────── */}
				<header ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
					<div className="pointer-events-none absolute inset-0">
						{heroNear && <Aurora key={theme} colorStops={t.stops} amplitude={0.9} blend={0.6} lightMode={t.light} />}
					</div>
					<div className="pointer-events-none absolute inset-0">
						{heroNear && (
							<Particles
								particleCount={160}
								particleSpread={12}
								speed={0.25}
								particleColors={t.particles}
								moveParticlesOnHover
								particleHoverFactor={2}
								alphaParticles
								particleBaseSize={120}
								cameraDistance={25}
							/>
						)}
					</div>

					<div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
						<div className="mb-6 rounded-full border border-[var(--border)] bg-[var(--wash)] px-4 py-1.5 text-xs text-[var(--muted)] backdrop-blur">
							<ShinyText text={`PULSAR 动效现场 · ${COMPONENT_COUNT} 个组件 · 6 个新交互`} speed={4} color={t.muted} shineColor={t.accent} />
						</div>

						<h1 className="text-5xl font-black leading-tight tracking-tight md:text-8xl">
							<DecryptedText
								text="PULSAR"
								animateOn="view"
								speed={60}
								maxIterations={12}
								characters="ABCDEFGLMNPRSUVWXYZ#@%&*"
								className="text-[var(--ink)]"
								encryptedClassName="text-[var(--accent)]"
							/>
						</h1>

						<p className="mt-4 text-2xl font-bold md:text-4xl">
							<GradientText colors={[t.accent, t.accent2, t.accent]} animationSpeed={6}>
								脉冲星实验室 · 让界面有心跳
							</GradientText>
						</p>

						<p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
							我们相信每一次点击都应该有回应，每一帧都值得被设计。
						极光、粒子、解密标题、弹性 Dock 来自 React Bits，六个全新微交互在这里继续生长。
						</p>

						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Magnet padding={80} magnetStrength={5}>
								<StarBorder
									as="a"
									href="#works"
									color={t.cta.star}
									backgroundColor={t.cta.bg}
									borderColor={t.cta.border}
									textColor={t.cta.text}
									speed="6s"
									thickness={1}
									className="text-sm font-bold"
								>
									<ShinyText text="进入作品宇宙" speed={3} color={t.cta.text} shineColor="#FFFFFF" />
								</StarBorder>
							</Magnet>
							<Magnet padding={80} magnetStrength={5}>
								<a
									href="#lab"
									className="rounded-full border border-[var(--border)] bg-[var(--wash)] px-8 py-3.5 text-sm font-bold text-[var(--muted)] backdrop-blur transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
								>
									看看实验台
								</a>
							</Magnet>
						</div>

						<div className="mt-10 flex items-center gap-3">
							<span className="text-[10px] uppercase tracking-[0.4em] text-[var(--faint)]">全站配色</span>
							{THEMES.map((th, i) => (
								<button
									key={th.name}
									onClick={() => setTheme(i)}
									aria-label={`切换配色：${th.name}`}
									title={th.name}
									className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
										theme === i ? 'scale-110 border-[var(--ink)]' : 'border-[var(--border)]'
									}`}
									style={{ background: `linear-gradient(135deg, ${th.stops.join(', ')})` }}
								/>
							))}
						</div>
					</div>

					<div className="absolute bottom-24 z-10 animate-bounce text-2xl text-[var(--faint)]">↓</div>
				</header>

				{/* ─────────── 数据带 ─────────── */}
				<section className="relative border-y border-[var(--border)] bg-[var(--wash)] py-14">
					<div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
						{STATS.map((stat, i) => (
							<AnimatedContent key={stat.label} distance={50} delay={i * 0.12} duration={0.9}>
								<div className="text-center">
									<p className="text-4xl font-black text-[var(--ink)] md:text-5xl">
										<CountUp to={stat.to} duration={2.5} separator="," />
										<span className="text-lg font-semibold text-[var(--accent)]">{stat.suffix}</span>
									</p>
									<p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--faint)]">{stat.label}</p>
								</div>
							</AnimatedContent>
						))}
					</div>
				</section>

				{/* ─────────── 滚动横幅 ─────────── */}
				<div className="border-b border-[var(--border)] py-6">
					<ScrollVelocity
						texts={['MAKE IT MOVE ✦ 让界面动起来', 'REACT BITS ✦ 炫技现场']}
						velocity={90}
						numCopies={4}
						className="text-4xl font-black tracking-wider text-[var(--ink)] opacity-90 md:text-6xl"
					/>
				</div>

				{/* ─────────── 能力 ─────────── */}
				<section id="capabilities" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
					<SectionTitle kicker="CAPABILITIES">我们擅长什么</SectionTitle>

					<div className="mb-16 text-center">
						<TrueFocus
							sentence="光 影 弹 性 节 奏 皆 可 编 程"
							blurAmount={4}
							borderColor={t.accent}
							glowColor={rgba(t.accent, t.light ? 0.45 : 0.6)}
							animationDuration={0.6}
						/>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{CAPABILITIES.map((cap, i) => (
							<AnimatedContent key={cap.title} distance={60} delay={i * 0.14} duration={1}>
								<SpotlightCard
									className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 backdrop-blur"
									spotlightColor={rgba(t.accent, t.light ? 0.15 : 0.25)}
								>
									<div className="mb-5 text-4xl">{cap.icon}</div>
									<h3 className="mb-3 text-xl font-bold text-[var(--ink)]">{cap.title}</h3>
									<p className="text-sm leading-relaxed text-[var(--muted)]">{cap.desc}</p>
								</SpotlightCard>
							</AnimatedContent>
						))}
					</div>
				</section>

				{/* ─────────── 作品 ─────────── */}
				<section id="works" className="scroll-mt-24 border-y border-[var(--border)] bg-gradient-to-b from-transparent via-[var(--accent-softer)] to-transparent py-28">
					<div className="mx-auto max-w-6xl px-6">
						<SectionTitle kicker="SELECTED WORKS">把鼠标放上来，卡片会呼吸</SectionTitle>
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{WORKS.map((work, i) => (
								<AnimatedContent key={work.src} distance={60} delay={i * 0.12} duration={1} scale={0.92}>
									<TiltedCard
										imageSrc={work.src}
										altText={work.caption}
										captionText={`${work.caption} · ${work.tag}`}
										containerHeight="320px"
										containerWidth="100%"
										imageHeight="320px"
										imageWidth="100%"
										rotateAmplitude={12}
										showMobileWarning={false}
										overlayContent={
											<div className="flex h-full flex-col items-end justify-start p-4">
												<span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold tracking-widest text-white backdrop-blur">
													{work.tag}
												</span>
											</div>
										}
										displayOverlayContent
									/>
								</AnimatedContent>
							))}
						</div>
					</div>
				</section>

				{/* ─────────── 新组件试玩 ─────────── */}
				<section id="components" className="scroll-mt-24 border-b border-[var(--border)] bg-gradient-to-b from-[var(--accent-softer)] to-transparent py-28">
					<div className="mx-auto max-w-6xl px-6">
						<SectionTitle kicker="SMALL MOVES, BIG FEELINGS">让指尖多一点惊喜</SectionTitle>
						<MotionGallery />
					</div>
				</section>

				{/* ─────────── 实验台 ─────────── */}
				<section id="lab" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
					<SectionTitle kicker="LIVE LAB">实时实验台</SectionTitle>

					<div className="grid gap-8 lg:grid-cols-2">
						<AnimatedContent distance={50} duration={1}>
							<div
								className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
								style={{
									'--al-item': t.feed.item,
									'--al-item-active': t.feed.active,
									'--al-text': t.feed.text,
									'--al-fade': t.feed.fade,
									'--al-thumb': t.feed.thumb
								}}
							>
								<div className="mb-4 flex items-center justify-between">
									<h3 className="font-bold text-[var(--ink)]">📡 事件流</h3>
									<div className="flex items-center gap-3 text-xs text-[var(--muted)]">
										<span>涡轮增压</span>
										<SquishSwitch
											checked={turbo}
											onChange={setTurbo}
											width={64}
											height={32}
											radius={16}
											trackColor={t.light ? 'rgba(61,44,30,0.18)' : 'rgba(255,255,255,0.14)'}
											trackOnColor={t.accent}
											ariaLabel="涡轮增压开关"
										/>
									</div>
								</div>
								<AnimatedList items={FEED} className="!max-h-[340px]" onItemSelect={item => console.log(item)} />
							</div>
						</AnimatedContent>

						<AnimatedContent distance={50} duration={1} delay={0.15}>
							<div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-softer)] to-transparent p-8">
								<p className="mb-2 text-xs uppercase tracking-[0.4em] text-[var(--faint)]">已渲染帧数 · LIVE</p>
								<Counter
									value={frames}
									fontSize={72}
									gap={6}
									textColor={t.ink}
									gradientFrom={t.bg}
									gradientTo="transparent"
								/>
								<p className="mt-4 text-center text-sm text-[var(--muted)]">
									{turbo ? '🔥 涡轮已开启，帧计数器正在燃烧' : '数字在弹簧物理下平滑滚动'}
								</p>
								<p className="mt-1 text-center text-xs text-[var(--faint)]">打开左上方开关试试 Turbo 模式</p>
							</div>
						</AnimatedContent>
					</div>
				</section>

				{/* ─────────── 试玩 ─────────── */}
				<section id="playground" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--wash)] py-28">
					<div className="mx-auto max-w-3xl px-6 text-center">
						<SectionTitle kicker="PLAYGROUND">和它聊两句</SectionTitle>
						<TextType
							text={SAMPLE_QUESTIONS}
							typingSpeed={65}
							deletingSpeed={35}
							pauseDuration={1600}
							loop
							showCursor
							cursorCharacter="|"
							cursorClassName="text-[var(--accent)]"
							className="mb-6 text-sm text-[var(--accent)]"
						/>
						<PromptBar
							placeholder="随便问点什么…"
							width={620}
							background={t.prompt.bg}
							menuBackground={t.prompt.menu}
							sparkColor={t.prompt.spark}
							color={t.ink}
							onSend={text =>
								setPromptReply({
									q: text,
									a: [
										`已收到指令。${COMPONENT_COUNT} 个动效组件正在这座实验室里等你探索 ✦`,
										'答案随风飘散，但极光会替我回答你 🌀',
										'这个问题已被加密进 DecryptedText，hover 一下标题试试 🔐',
										'渲染管线表示情绪稳定，帧率 60fps，可以放心炫技 ⚡'
									][Math.floor(Math.random() * 4)]
								})
							}
						/>
						{promptReply && (
							<div className="mx-auto mt-6 max-w-xl rounded-xl border border-[var(--reply-border)] bg-[var(--reply-bg)] p-4 text-left text-sm">
								<p className="text-[var(--accent)]">你：{promptReply.q}</p>
								<p className="mt-2">
									<DecryptedText
										text={`PULSAR：${promptReply.a}`}
										animateOn="view"
										speed={40}
										maxIterations={8}
										characters="#@%&*$"
										className="text-[var(--ink)]"
										encryptedClassName="text-[var(--accent)] opacity-70"
									/>
								</p>
							</div>
						)}
					</div>
				</section>

				{/* ─────────── 雷达 CTA ─────────── */}
				<section ref={radarRef} className="relative overflow-hidden border-y border-[var(--border)]">
					<div className="absolute inset-0">
						{radarNear && (
							<Radar
								color={t.accent}
								backgroundColor={t.bg}
								ringCount={5}
								sweepSpeed={0.55}
								speed={0.6}
								scale={1.15}
								enableMouseInteraction
								mouseInfluence={0.5}
								brightness={t.light ? 1.4 : 0.5}
								falloff={1.1}
							/>
						)}
					</div>
					<div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
						<SectionTitle kicker="SIGNAL">把雷达对准我们</SectionTitle>
						<p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
							移动鼠标扫过这片雷达，波束会跟着你偏转。信号已锁定——下一步，去给这项技术点个星。
						</p>
						<StarBorder
							as="a"
							href="https://github.com/DavidHDev/react-bits"
							target="_blank"
							rel="noreferrer"
							color={t.cta.star}
							backgroundColor={t.cta.bg}
							borderColor={t.cta.border}
							textColor={t.cta.text}
							speed="5s"
							className="text-sm font-bold"
						>
							去 GitHub 点亮 React Bits ✦
						</StarBorder>
					</div>
				</section>

				{/* ─────────── 技术栈 ─────────── */}
				<div className="border-b border-[var(--border)] py-8">
					<LogoLoop
						logos={TECH.map(tech => ({
							node: <span className="text-sm font-semibold tracking-[0.35em] text-[var(--faint)]">{tech}</span>
						}))}
						speed={70}
						gap={72}
						pauseOnHover
						fadeOut
						fadeOutColor={t.bg}
						logoHeight={24}
					/>
				</div>

				{/* ─────────── 页脚 ─────────── */}
				<footer className="relative overflow-hidden border-t border-[var(--border)] pt-20">
					<div className="flex justify-center px-6">
						<GradientText
							colors={[t.accent, t.accent2, t.accent]}
							animationSpeed={7}
							className="!text-[14vw] leading-none font-black tracking-tight md:!text-[10rem]"
						>
							PULSAR
						</GradientText>
					</div>
					<div className="relative z-10 -mt-[4vw] bg-gradient-to-t from-[var(--bg)] to-transparent pb-28 pt-16 text-center">
						<p className="text-xs text-[var(--ghost)]">© 2026 脉冲星实验室 · 炫技即正义</p>
					</div>
				</footer>

				{/* ─────────── 底部 Dock ─────────── */}
				<div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
					<div className="pointer-events-auto">
						<Dock items={DOCK_ITEMS} baseItemSize={44} magnification={64} distance={120} panelHeight={56} />
					</div>
				</div>
			</div>
		</ClickSpark>
	);
}
