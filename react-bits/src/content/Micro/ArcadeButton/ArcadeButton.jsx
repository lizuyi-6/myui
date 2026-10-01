'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './ArcadeButton.css';
const c = {
  root: 'lc-arcade-button-root',
  topline: 'lc-arcade-button-topline',
  key: 'lc-arcade-button-key',
  star: 'lc-arcade-button-star',
  bottomline: 'lc-arcade-button-bottomline'
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
export default function ArcadeButton({
  label = 'INSERT COIN',
  onClick,
  disabled = false,
  accent = '#ffb83e',
  surface = '#fbeac3',
  ink = '#312316',
  className = ''
}) {
  const reduce = useMotionPreference();
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div className={c.topline}>
        <span>PLAYER 01</span>
        <span aria-hidden="true">◆ ◆ ◆</span>
      </div>
      <motion.button
        type="button"
        disabled={disabled}
        className={c.key}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onKeyDown={(event) => {
          if (event.key === ' ' || event.key === 'Enter') setPressed(true);
        }}
        onKeyUp={() => setPressed(false)}
        onBlur={() => setPressed(false)}
        onClick={onClick}
        animate={{ y: pressed && !disabled && !reduce ? 6 : 0 }}
        transition={{ duration: reduce ? 0 : 0.08 }}
      >
        <span aria-hidden="true" className={c.star}>
          ✦
        </span>
        {label}
      </motion.button>
      <div className={c.bottomline}>PRESS START / MAKE YOUR MOVE</div>
    </div>
  );
}
