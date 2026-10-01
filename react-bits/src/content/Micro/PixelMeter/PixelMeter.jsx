'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './PixelMeter.css';
const c = {
  root: 'lc-pixel-meter-root',
  header: 'lc-pixel-meter-header',
  matrix: 'lc-pixel-meter-matrix',
  pixel: 'lc-pixel-meter-pixel',
  range: 'lc-pixel-meter-range',
  legend: 'lc-pixel-meter-legend'
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
export default function PixelMeter({
  value,
  defaultValue = 8,
  onChange,
  max = 16,
  label = 'ENERGY',
  accent = '#c29cff',
  surface = '#201c30',
  ink = '#f0e8ff',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const current = Math.max(0, Math.min(max, value ?? inner));
  const lit = max > 0 ? Math.round((current / max) * 32) : 0;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div className={c.header}>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {String(current).padStart(2, '0')} / {max}
        </output>
      </div>
      <div className={c.matrix} aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => (
          <motion.span
            key={index}
            data-lit={index < lit}
            className={c.pixel}
            animate={{ opacity: index < lit ? 1 : 0.12, scale: index < lit && !reduce ? 1 : 0.88 }}
            transition={{ duration: reduce ? 0 : 0.15, delay: reduce ? 0 : index * 0.008 }}
          />
        ))}
      </div>
      <input
        id={id}
        className={c.range}
        type="range"
        min="0"
        max={max}
        step="1"
        value={current}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setInner(next);
          onChange?.(next);
        }}
      />
      <div className={c.legend}>
        LOW<span>HIGH</span>
      </div>
    </div>
  );
}
