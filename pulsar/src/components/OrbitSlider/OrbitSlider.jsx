import { useId, useState } from 'react';
import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function OrbitSlider({ value, defaultValue = 60, onChange, min = 0, max = 100, step = 1, label = '动效强度', unit = '%', className = '' }) {
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const progress = max === min ? 0 : (current - min) / (max - min);
  return (
    <div className={className}>
      <div className="relative mx-auto h-40 w-40" aria-hidden="true">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r="64" fill="none" stroke="var(--border)" strokeWidth="8" />
          <motion.circle cx="80" cy="80" r="64" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round"
            pathLength="1" strokeDasharray="1 1" animate={{ strokeDashoffset: 1 - progress }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }} />
        </svg>
        <motion.div className="pointer-events-none absolute inset-0" animate={{ rotate: progress * 360 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}>
          <span className="absolute left-1/2 top-2 -ml-2 h-4 w-4 rounded-full border-4 border-[var(--bg)] bg-[var(--accent2)] shadow-sm" />
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tabular-nums text-[var(--ink)]">{current}<span className="text-base text-[var(--accent)]">{unit}</span></span>
          <span className="mt-1 text-xs text-[var(--muted)]">{label}</span>
        </div>
      </div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input id={id} type="range" min={min} max={max} step={step} value={current} aria-valuetext={`${current}${unit}`}
        onChange={event => { const next = Number(event.target.value); if (value === undefined) setInner(next); onChange?.(next); }}
        className="mt-4 h-11 w-full cursor-pointer accent-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]" />
      <div className="flex justify-between text-xs tabular-nums text-[var(--muted)]"><span>{min}{unit}</span><span>{max}{unit}</span></div>
    </div>
  );
}
