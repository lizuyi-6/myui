import { useRef, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import ElasticTabs from '../ElasticTabs/ElasticTabs';
import OrbitSlider from '../OrbitSlider/OrbitSlider';
import RippleButton from '../RippleButton/RippleButton';
import SpringAccordion from '../SpringAccordion/SpringAccordion';
import ToastStack from '../ToastStack/ToastStack';
import FlipCard from '../FlipCard/FlipCard';

export const MICRO_COMPONENTS = ['ElasticTabs', 'OrbitSlider', 'RippleButton', 'SpringAccordion', 'ToastStack', 'FlipCard'];

function Demo({ index, title, name, hint, children }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.article initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : (index % 3) * 0.06 }}
      className="flex min-w-0 flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div><h3 className="text-lg font-bold text-[var(--ink)]">{title}</h3><p className="mt-1 text-[10px] tracking-[0.15em] text-[var(--muted)]">{name}</p></div>
        <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-softer)] px-2.5 py-1 text-[10px] tabular-nums text-[var(--accent)]">0{index + 1}</span>
      </div>
      <div className="flex min-h-64 flex-1 flex-col justify-center">{children}</div>
      <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">{hint}</p>
    </motion.article>
  );
}

function RippleDemo() {
  const [clicks, setClicks] = useState(0);
  return <div className="flex flex-col items-center gap-7">
    <div aria-hidden="true" className="text-5xl text-[var(--accent)]">✳</div>
    <RippleButton onClick={() => setClicks(count => count + 1)}>点亮一圈涟漪 <span aria-hidden="true">↗</span></RippleButton>
    <p role="status" className="text-sm tabular-nums text-[var(--muted)]">{clicks ? `回应了 ${clicks} 次点击` : '从你按下的位置，轻轻扩散'}</p>
  </div>;
}

function ToastDemo() {
  const nextId = useRef(2);
  const [items, setItems] = useState([
    { id: 1, title: '灵感已收藏', message: '留住刚刚的那一帧。' },
    { id: 0, title: '欢迎来到实验室', message: '试着展开这叠小卡片。' }
  ]);
  const [announcement, setAnnouncement] = useState('');
  const add = () => {
    const item = { id: nextId.current++, title: `新灵感 #${nextId.current - 1}`, message: '这是一条本地演示提示。' };
    setItems(previous => [item, ...previous].slice(0, 3));
    setAnnouncement(`${item.title}，${item.message}`);
  };
  return <div>
    <ToastStack items={items} onDismiss={id => { setItems(previous => previous.filter(item => item.id !== id)); setAnnouncement('提示已关闭'); }} />
    <div role="status" aria-live="polite" className="sr-only">{announcement}</div>
    <div className="mt-6 flex justify-center"><RippleButton onClick={add} className="!px-5 !text-sm">＋ 添加一条提示</RippleButton></div>
  </div>;
}

const tabItems = [
  { id: 'feel', label: '手感', content: <div><p className="mb-3 text-3xl text-[var(--accent)]" aria-hidden="true">〰</p><h4 className="font-bold text-[var(--ink)]">软一点，刚刚好</h4><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">指示器追着你的选择滑行，停下时带一点自然回弹。</p></div> },
  { id: 'color', label: '色彩', content: <div><div className="mb-4 flex gap-2" aria-hidden="true">{['var(--accent)', 'var(--accent2)', 'var(--ink)'].map(color => <span key={color} className="h-8 w-8 rounded-full" style={{ background: color }} />)}</div><h4 className="font-bold text-[var(--ink)]">让心情选颜色</h4><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">从暖阳到薄荷，切换全站主题，这里的色彩也一起回应。</p></div> },
  { id: 'rhythm', label: '节奏', content: <div><p className="mb-3 text-3xl text-[var(--accent)]" aria-hidden="true">✦</p><h4 className="font-bold text-[var(--ink)]">每一次选择都有回声</h4><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">用左右方向键继续探索，也可以随时回到第一个标签。</p></div> }
];

const accordionItems = [
  { id: 'spring', title: '为什么回弹让人想再点一次？', content: '一点惯性，一点阻尼。内容展开和符号旋转同时发生，让每次操作都有清晰的回应。' },
  { id: 'theme', title: '换个主题会怎样？', content: '边框、底色和强调色会随全站切换；你的选择和滑杆位置留在原处。' },
  { id: 'keyboard', title: '不用鼠标也能玩？', content: '用 Tab 移动到标题，再按 Enter 或空格展开。每次只展开一项，也能再次点击收起。' }
];

export default function MotionGallery() {
  const [revision, setRevision] = useState(0);
  return (
    <MotionConfig reducedMotion="user">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">六种小交互，把回应交还给指尖。</p>
        <button type="button" onClick={() => setRevision(version => version + 1)} className="min-h-11 rounded-full border border-[var(--border)] px-5 text-xs font-semibold text-[var(--ink)] outline-none transition-colors hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">↻ 重置试玩</button>
      </div>
      <div key={revision} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Demo index={0} title="弹性标签" name="ELASTIC TABS" hint="点击切换 · 方向键也能游走"><ElasticTabs items={tabItems} ariaLabel="动效探索" /></Demo>
        <Demo index={1} title="轨道滑杆" name="ORBIT SLIDER" hint="拖动滑杆 · 用方向键微调"><OrbitSlider /></Demo>
        <Demo index={2} title="涟漪按钮" name="RIPPLE BUTTON" hint="按压回弹 · 从点击位置泛起涟漪"><RippleDemo /></Demo>
        <Demo index={3} title="回弹折叠" name="SPRING ACCORDION" hint="展开一个想法 · 再按一下收起"><SpringAccordion items={accordionItems} defaultValue="spring" /></Demo>
        <Demo index={4} title="堆叠提示" name="TOAST STACK" hint="悬停或聚焦展开 · 最多保留三条演示提示"><ToastDemo /></Demo>
        <Demo index={5} title="翻面惊喜" name="FLIP CARD" hint="点击翻面 · 换个角度发现另一面"><FlipCard
          front={<><span aria-hidden="true" className="mb-4 text-5xl text-[var(--accent)]">✺</span><p className="text-lg font-bold text-[var(--ink)]">每一面，都有灵感</p><p className="mt-2 text-xs tracking-widest text-[var(--muted)]">TURN A LITTLE. FIND A LOT.</p></>}
          back={<><span aria-hidden="true" className="mb-4 text-3xl text-[var(--accent2)]">↗</span><p className="text-lg font-bold text-[var(--ink)]">好设计，值得多看一眼</p><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">让一个小动作，带来一点新的发现。</p></>} /></Demo>
      </div>
    </MotionConfig>
  );
}
