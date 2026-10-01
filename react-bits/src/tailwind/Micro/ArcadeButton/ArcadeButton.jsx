'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,300px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:3px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:3px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:3px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:3px] [border-left-style:solid] [border-left-color:var(--lc-ink)]',
  topline: '[display:flex] [justify-content:space-between] [margin-bottom:26px] [font-size:11px] [letter-spacing:1px]',
  key: '[box-sizing:border-box] [min-height:72px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [align-items:center] [justify-content:center] [gap:14px] [position:relative] [width:100%] [border-top-width:3px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:3px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:3px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:3px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [border-radius:0] [background:var(--lc-accent)] [box-shadow:6px_8px_0_var(--lc-ink)] [font-size:17px] [font-weight:900] [letter-spacing:1px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] disabled:[opacity:0.45] disabled:[cursor:not-allowed]',
  star: '[font-size:28px]',
  bottomline: '[margin-top:26px] [font-size:9px] [letter-spacing:1px] [text-align:center]'
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
