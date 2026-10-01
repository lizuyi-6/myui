'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import './ScrollTheater.css';
const c = {
  root: 'lc-scroll-theater-root',
  viewport: 'lc-scroll-theater-viewport',
  track: 'lc-scroll-theater-track',
  stage: 'lc-scroll-theater-stage',
  poster: 'lc-scroll-theater-poster',
  stripe: 'lc-scroll-theater-stripe',
  disc: 'lc-scroll-theater-disc',
  content: 'lc-scroll-theater-content',
  number: 'lc-scroll-theater-number',
  title: 'lc-scroll-theater-title',
  copy: 'lc-scroll-theater-copy',
  controls: 'lc-scroll-theater-controls',
  scene: 'lc-scroll-theater-scene'
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
