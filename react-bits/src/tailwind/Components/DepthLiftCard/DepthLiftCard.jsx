'use client';
import { useState, useSyncExternalStore, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,400px)] [perspective:900px] [padding:30px_16px]',
  card: '[position:relative] [min-height:355px] [padding:26px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#af9aff55] [border-right-width:1px] [border-right-style:solid] [border-right-color:#af9aff55] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#af9aff55] [border-left-width:1px] [border-left-style:solid] [border-left-color:#af9aff55] [border-radius:24px] [background:var(--lc-surface)] [transform-style:preserve-3d] [box-shadow:0_25px_70px_#00000050]',
  glow: '[position:absolute] [width:180px] [height:180px] [transform:translate(-50%,-50%)] [border-radius:50%] [background:radial-gradient(circle,var(--lc-accent),transparent_70%)] [opacity:0.22] [pointer-events:none]',
  label: '[position:relative] [font:10px_monospace] [letter-spacing:3px] [color:var(--lc-accent)]',
  orbits: '[position:relative] [display:grid] [place-items:center] [height:180px] [transform-style:preserve-3d]',
  ring: '[position:absolute] [width:180px] [height:90px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-accent)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-accent)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-accent)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-accent)] [border-radius:50%] [box-shadow:0_0_20px_#af9aff22]',
  core: '[font-size:66px] [color:var(--lc-accent)] [text-shadow:0_0_24px_var(--lc-accent)]',
  foreground: '[position:relative] [transform-style:preserve-3d]',
  title: '[margin:0_0_10px] [font-size:28px] [line-height:1.1] [letter-spacing:-1px]',
  copy: '[font-size:13px] [line-height:1.6] [opacity:0.8]',
  trigger:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:relative] [display:flex] [align-items:center] [justify-content:space-between] [width:100%] [padding:14px_0_0] [margin-top:14px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#af9aff44] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font-size:12px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
