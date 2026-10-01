'use client';
import { useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,250px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#5b75634d] [border-right-width:1px] [border-right-style:solid] [border-right-color:#5b75634d] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#5b75634d] [border-left-width:1px] [border-left-style:solid] [border-left-color:#5b75634d] [border-radius:8px] [box-shadow:inset_0_1px_0_#ffffff12]',
  header: '[display:flex] [justify-content:space-between] [margin-bottom:20px] [font-size:11px] [letter-spacing:2px]',
  state: '[font-size:10px] [color:var(--lc-accent)] [letter-spacing:0]',
  track:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:relative] [display:block] [width:154px] [height:62px] [margin:auto] [border-top-width:1px] [border-top-style:solid] [border-top-color:#354b3d] [border-right-width:1px] [border-right-style:solid] [border-right-color:#354b3d] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#354b3d] [border-left-width:1px] [border-left-style:solid] [border-left-color:#354b3d] [border-radius:7px] [background:#080e0b] [box-shadow:inset_0_3px_8px_#00000080] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] disabled:[opacity:0.4] disabled:[cursor:not-allowed]',
  lane: '[position:absolute] [left:18px] [right:18px] [top:29px] [height:3px] [background:var(--lc-accent)] [border-radius:4px]',
  thumb:
    '[position:absolute] [top:5px] [left:5px] [display:flex] [align-items:center] [justify-content:center] [width:68px] [height:50px] [border-radius:4px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#749180] [border-right-width:1px] [border-right-style:solid] [border-right-color:#749180] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#749180] [border-left-width:1px] [border-left-style:solid] [border-left-color:#749180] [background:linear-gradient(#344c3e,#1b2a21)] [box-shadow:0_3px_8px_#00000080]',
  grip: '[font-size:20px] [color:#779280] [letter-spacing:4px]',
  ticks: '[margin-top:12px] [text-align:center] [font-size:10px] [color:#657e6d]'
};

export interface NeonToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  accent?: string;
  surface?: string;
  ink?: string;
  className?: string;
}

const motionQuery = '(prefers-reduced-motion: reduce)';
const motionSnapshot = () => typeof window !== 'undefined' && window.matchMedia(motionQuery).matches;
const motionSubscribe = (listener: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
function useMotionPreference() {
  return useSyncExternalStore(motionSubscribe, motionSnapshot, () => false);
}

export default function NeonToggle({
  checked,
  defaultChecked = false,
  onChange,
  label = 'SIGNAL',
  disabled = false,
  accent = '#a6fa69',
  surface = '#17201c',
  ink = '#def6e5',
  className = ''
}: NeonToggleProps) {
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
    >
      <div className={c.header}>
        <span>{label}</span>
        <span className={c.state}>{on ? '01 / ON' : '00 / OFF'}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        disabled={disabled}
        className={c.track}
        onClick={() => {
          if (checked === undefined) setInner(!on);
          onChange?.(!on);
        }}
      >
        <span
          aria-hidden="true"
          className={c.lane}
          style={{ opacity: on ? 1 : 0.18, boxShadow: on ? '0 0 16px ' + accent : 'none' }}
        />
        <motion.span
          aria-hidden="true"
          className={c.thumb}
          animate={{ x: on ? 74 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 25 }}
        >
          <span className={c.grip}>|||</span>
        </motion.span>
      </button>
      <div className={c.ticks} aria-hidden="true">
        ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊
      </div>
    </div>
  );
}
