'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,500px)] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#191c2040] [border-right-width:1px] [border-right-style:solid] [border-right-color:#191c2040] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#191c2040] [border-left-width:1px] [border-left-style:solid] [border-left-color:#191c2040]',
  viewport:
    '[overflow:auto] [overscroll-behavior:contain] [scrollbar-width:thin] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  track: '[position:relative]',
  stage: '[position:sticky] [top:0] [overflow:hidden] [display:grid] [place-items:center] [perspective:700px]',
  poster:
    '[position:absolute] [width:75%] [height:70%] [border-top-width:2px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:2px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:2px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [background:var(--lc-accent)] [overflow:hidden]',
  stripe:
    '[position:absolute] [inset:25%] [border-top-width:22px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:22px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:22px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:22px] [border-left-style:solid] [border-left-color:var(--lc-ink)]',
  disc: '[position:absolute] [right:-30px] [bottom:22px] [width:190px] [height:190px] [border-radius:50%] [background:var(--lc-ink)]',
  content: '[position:relative] [padding:35px] [width:100%] [z-index:1] [mix-blend-mode:normal]',
  number: '[display:inline-block] [background:var(--lc-surface)] [padding:6px] [font:10px_monospace]',
  title:
    '[margin:24px_0_16px] [max-width:300px] [font-size:clamp(32px,8vw,60px)] [line-height:0.9] [font-weight:900] [letter-spacing:-3px] [word-break:normal] [text-shadow:2px_2px_var(--lc-surface)]',
  copy: '[display:inline-block] [max-width:290px] [padding:8px] [background:var(--lc-surface)] [font-size:12px] [line-height:1.5]',
  controls: '[display:flex] [gap:6px] [padding:12px]',
  scene:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [min-width:44px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [background:transparent] [font:12px_monospace] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] [&[aria-pressed="true"]]:[background:var(--lc-ink)] [&[aria-pressed="true"]]:[color:var(--lc-surface)]'
};
const motionQuery = '(prefers-reduced-motion: reduce)';
const motionSnapshot = () => typeof window !== 'undefined' && window.matchMedia(motionQuery).matches;
const motionSubscribe = (listener) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
function useMotionPreference() {
  return useSyncExternalStore(motionSubscribe, motionSnapshot, () => false);
}
export default function ScrollTheater({
  items,
  height = 400,
  onChange,
  accent = '#e84a32',
  surface = '#eee6cf',
  ink = '#191c20',
  className = ''
}) {
  const reduce = useMotionPreference();
  const viewport = useRef(null);
  const [index, setIndex] = useState(0);
  const progress = useMotionValue(0);
  const twist = useTransform(progress, (t) => (reduce ? 0 : -30 + t * 60));
  const drift = useTransform(progress, (t) => (reduce ? 0 : (t - 0.5) * 100));
  const scale = useTransform(progress, (t) => (reduce ? 1 : 0.78 + t * 0.35));
  const tilt = useTransform(progress, (t) => (reduce ? 0 : 35 - t * 70));
  const active = Math.min(index, Math.max(0, items.length - 1));
  const size = Number.isFinite(height) ? Math.max(260, height) : 400;
  const scroll = () => {
    const node = viewport.current;
    if (!node) return;
    const range = node.scrollHeight - node.clientHeight;
    const p = range > 0 ? node.scrollTop / range : 0;
    progress.set(p);
    const next = Math.min(items.length - 1, Math.max(0, Math.round(p * (items.length - 1))));
    if (next !== index) {
      setIndex(next);
      if (items[next]) onChange?.(items[next].id);
    }
  };
  const jump = (next) => {
    const node = viewport.current;
    if (!node) return;
    node.scrollTo({
      top: ((node.scrollHeight - node.clientHeight) * next) / Math.max(1, items.length - 1),
      behavior: reduce ? 'instant' : 'smooth'
    });
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div
        ref={viewport}
        data-part="viewport"
        className={c.viewport}
        style={{ height: size }}
        onScroll={scroll}
        tabIndex={0}
        role="region"
        aria-label="Scroll scenes"
      >
        <div data-part="track" className={c.track} style={{ height: Math.max(1, items.length) * 100 + '%' }}>
          <div data-part="stage" className={c.stage} style={{ height: size }}>
            <motion.div
              data-part="poster"
              className={c.poster}
              style={{ rotateX: tilt, rotateZ: twist, scale }}
              aria-hidden="true"
            >
              <span data-part="stripe" className={c.stripe} />
              <span data-part="stripe" className={c.stripe} style={{ transform: 'rotate(90deg)' }} />
            </motion.div>
            <motion.div data-part="disc" className={c.disc} style={{ y: drift }} aria-hidden="true" />
            <div data-part="content" className={c.content}>
              <span data-part="number" className={c.number}>
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <h3 data-part="title" className={c.title}>
                {items[active]?.title ?? 'No scenes'}
              </h3>
              <div data-part="copy" className={c.copy}>
                {items[active]?.content ?? 'Add scenes to start.'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-part="controls" className={c.controls}>
        {items.map((item, i) => (
          <button
            type="button"
            key={item.id}
            data-part="scene"
            className={c.scene}
            aria-label={item.title}
            aria-pressed={i === active}
            onClick={() => jump(i)}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}
