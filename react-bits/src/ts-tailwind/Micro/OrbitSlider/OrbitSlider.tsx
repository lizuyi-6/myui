'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,300px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#b3cfc2] [border-right-width:1px] [border-right-style:solid] [border-right-color:#b3cfc2] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#b3cfc2] [border-left-width:1px] [border-left-style:solid] [border-left-color:#b3cfc2] [border-radius:20px]',
  caption: '[display:block] [font-size:10px] [letter-spacing:2px] [text-transform:uppercase]',
  dial: '[position:relative] [width:160px] [height:160px] [margin:18px_auto]',
  svg: '[width:100%] [height:100%] [transform:rotate(-90deg)]',
  orbit: '[position:absolute] [inset:0] [pointer-events:none]',
  dot: '[position:absolute] [top:9px] [left:calc(50%_-_7px)] [width:14px] [height:14px] [background:var(--lc-accent)] [border-top-width:3px] [border-top-style:solid] [border-top-color:var(--lc-surface)] [border-right-width:3px] [border-right-style:solid] [border-right-color:var(--lc-surface)] [border-bottom-width:3px] [border-bottom-style:solid] [border-bottom-color:var(--lc-surface)] [border-left-width:3px] [border-left-style:solid] [border-left-color:var(--lc-surface)] [border-radius:50%]',
  reading:
    '[position:absolute] [inset:0] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [gap:6px] [font-size:12px]',
  range:
    '[width:100%] [height:44px] [accent-color:var(--lc-accent)] [cursor:pointer] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  ends: '[display:flex] [justify-content:space-between] [font-size:11px] [font-family:monospace]',
  value: '[font-size:38px] [font-variant-numeric:tabular-nums]',
  unit: '[font-size:14px]'
};

export interface OrbitSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
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

export default function OrbitSlider({
  value,
  defaultValue = 60,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = 'Intensity',
  unit = '%',
  accent = '#087f72',
  surface = '#e4f4ec',
  ink = '#133b31',
  className = ''
}: OrbitSliderProps) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const current = Math.min(max, Math.max(min, value ?? inner));
  const progress = max > min ? (current - min) / (max - min) : 0;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
    >
      <div className={c.caption}>ORBIT / 001</div>
      <div className={c.dial} aria-hidden="true">
        <svg viewBox="0 0 160 160" className={c.svg}>
          <circle cx="80" cy="80" r="64" fill="none" stroke="#b3cfc2" strokeWidth="7" />
          <motion.circle
            cx="80"
            cy="80"
            r="64"
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1 1"
            animate={{ strokeDashoffset: 1 - progress }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
          />
        </svg>
        <motion.div
          className={c.orbit}
          animate={{ rotate: progress * 360 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
        >
          <span className={c.dot} />
        </motion.div>
        <div className={c.reading}>
          <strong className={c.value}>
            {current}
            <small className={c.unit}>{unit}</small>
          </strong>
          <span>{label}</span>
        </div>
      </div>
      <label htmlFor={id} className={c.caption}>
        {label}
      </label>
      <input
        id={id}
        aria-valuetext={current + unit}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setInner(next);
          onChange?.(next);
        }}
        className={c.range}
      />
      <div className={c.ends}>
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
