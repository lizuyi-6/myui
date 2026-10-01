'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,320px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:2px] [border-top-style:solid] [border-top-color:#645579] [border-right-width:2px] [border-right-style:solid] [border-right-color:#645579] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:#645579] [border-left-width:2px] [border-left-style:solid] [border-left-color:#645579] [border-radius:8px]',
  header: '[display:flex] [justify-content:space-between] [gap:12px] [font-size:12px] [letter-spacing:1px]',
  matrix:
    '[display:grid] [grid-template-columns:repeat(8,minmax(0,1fr))] [gap:6px] [margin:24px_0] [padding:10px] [background:#0b0915] [border-top-width:1px] [border-top-style:solid] [border-top-color:#453451] [border-right-width:1px] [border-right-style:solid] [border-right-color:#453451] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#453451] [border-left-width:1px] [border-left-style:solid] [border-left-color:#453451]',
  pixel:
    '[display:block] [aspect-ratio:1] [background:var(--lc-accent)] [box-shadow:0_0_5px_color-mix(in_srgb,var(--lc-accent)_50%,transparent)]',
  range:
    '[display:block] [width:100%] [height:44px] [accent-color:var(--lc-accent)] [cursor:pointer] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  legend: '[display:flex] [justify-content:space-between] [font-size:9px] [letter-spacing:2px]'
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
