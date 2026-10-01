'use client';
import { useState, useSyncExternalStore, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './DepthLiftCard.css';
const c = {
  root: 'lc-depth-lift-card-root',
  card: 'lc-depth-lift-card-card',
  glow: 'lc-depth-lift-card-glow',
  label: 'lc-depth-lift-card-label',
  orbits: 'lc-depth-lift-card-orbits',
  ring: 'lc-depth-lift-card-ring',
  core: 'lc-depth-lift-card-core',
  foreground: 'lc-depth-lift-card-foreground',
  title: 'lc-depth-lift-card-title',
  copy: 'lc-depth-lift-card-copy',
  trigger: 'lc-depth-lift-card-trigger'
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
export default function DepthLiftCard({
  title = 'A new dimension',
  eyebrow = 'SPECIMEN / 001',
  children = 'Move closer. Every layer has its own depth.',
  depth = 60,
  accent = '#af9aff',
  surface = '#151223',
  ink = '#f5f1ff',
  className = ''
}) {
  const reduce = useMotionPreference();
  const [hover, setHover] = useState(false);
  const [held, setHeld] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(
    useTransform(py, (value) => -value * 18),
    { stiffness: 160, damping: 22 }
  );
  const ry = useSpring(
    useTransform(px, (value) => value * 18),
    { stiffness: 160, damping: 22 }
  );
  const glowX = useTransform(px, (value) => 50 + value * 40 + '%');
  const glowY = useTransform(py, (value) => 50 + value * 40 + '%');
  const lifted = !reduce && (hover || held);
  const distance = Number.isFinite(depth) ? Math.max(0, depth) : 60;
  useEffect(() => {
    if (reduce) {
      px.set(0);
      py.set(0);
    }
  }, [reduce, px, py]);
  const move = (event) => {
    if (reduce || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const leave = () => {
    setHover(false);
    px.set(0);
    py.set(0);
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      onPointerMove={move}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={leave}
    >
      <motion.div data-part="card" className={c.card} style={{ rotateX: rx, rotateY: ry }}>
        <motion.div aria-hidden="true" data-part="glow" className={c.glow} style={{ left: glowX, top: glowY }} />
        <span data-part="label" className={c.label}>
          {eyebrow}
        </span>
        <motion.div
          aria-hidden="true"
          data-part="orbits"
          className={c.orbits}
          animate={{ z: lifted ? distance * 0.45 : 0, rotate: lifted ? 24 : 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
        >
          <span data-part="ring" className={c.ring} />
          <span data-part="ring" className={c.ring} style={{ transform: 'rotate(65deg)' }} />
          <span data-part="core" className={c.core}>
            ✦
          </span>
        </motion.div>
        <motion.div
          data-part="foreground"
          className={c.foreground}
          animate={{ z: lifted ? distance : 0, y: lifted ? -12 : 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20, duration: reduce ? 0 : undefined }}
        >
          <h3 data-part="title" className={c.title}>
            {title}
          </h3>
          <div data-part="copy" className={c.copy}>
            {children}
          </div>
        </motion.div>
        <button
          data-part="trigger"
          className={c.trigger}
          type="button"
          aria-pressed={held}
          onClick={() => setHeld((value) => !value)}
        >
          {held ? 'Release depth' : 'Explore depth'} <span aria-hidden="true">↗</span>
        </button>
      </motion.div>
    </div>
  );
}
