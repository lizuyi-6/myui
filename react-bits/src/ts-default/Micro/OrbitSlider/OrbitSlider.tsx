'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import './OrbitSlider.css';
const c = {
  root: 'lc-orbit-slider-root',
  caption: 'lc-orbit-slider-caption',
  dial: 'lc-orbit-slider-dial',
  svg: 'lc-orbit-slider-svg',
  orbit: 'lc-orbit-slider-orbit',
  dot: 'lc-orbit-slider-dot',
  reading: 'lc-orbit-slider-reading',
  range: 'lc-orbit-slider-range',
  ends: 'lc-orbit-slider-ends',
  value: 'lc-orbit-slider-value',
  unit: 'lc-orbit-slider-unit'
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
