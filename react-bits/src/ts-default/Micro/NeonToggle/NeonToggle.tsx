'use client';
import { useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import './NeonToggle.css';
const c = {
  root: 'lc-neon-toggle-root',
  header: 'lc-neon-toggle-header',
  state: 'lc-neon-toggle-state',
  track: 'lc-neon-toggle-track',
  lane: 'lc-neon-toggle-lane',
  thumb: 'lc-neon-toggle-thumb',
  grip: 'lc-neon-toggle-grip',
  ticks: 'lc-neon-toggle-ticks'
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
