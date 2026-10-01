'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,380px)] [padding:20px] [border-top-width:2px] [border-top-style:solid] [border-top-color:#e8bad1] [border-right-width:2px] [border-right-style:solid] [border-right-color:#e8bad1] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:#e8bad1] [border-left-width:2px] [border-left-style:solid] [border-left-color:#e8bad1] [border-radius:32px] [background:var(--lc-surface)]',
  legend: '[padding:0_10px] [font-size:18px] [font-weight:800] [color:var(--lc-ink)]',
  options: '[display:flex] [flex-wrap:wrap] [justify-content:center] [gap:12px]',
  option:
    '[display:flex] [flex:1] [min-width:76px] [flex-direction:column] [align-items:center] [gap:10px] [cursor:pointer]',
  bubble:
    '[display:flex] [align-items:center] [justify-content:center] [width:70px] [height:70px] [border-radius:40%_55%_45%_50%] [font-size:34px] [box-shadow:inset_0_-5px_0_#0000000a]',
  optionlabel: '[display:flex] [align-items:center] [gap:5px] [font-size:12px] [font-weight:600]',
  radio:
    '[width:16px] [height:16px] [accent-color:var(--lc-accent)] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
export default function BubbleChoice({
  options = ['Peach', 'Mint', 'Lavender'],
  value,
  defaultValue = 'Peach',
  onChange,
  label = 'Pick your mood',
  accent = '#c74f91',
  surface = '#fff0f7',
  ink = '#63334d',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const active = value ?? inner;
  return (
    <fieldset
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <legend className={c.legend}>{label}</legend>
      <div className={c.options}>
        {options.map((option, index) => (
          <label key={option} className={c.option}>
            <motion.span
              aria-hidden="true"
              className={c.bubble}
              style={{ background: ['#ffd5b8', '#caf0de', '#dfd2f4'][index % 3] }}
              animate={{ scale: active === option ? 1 : 0.75, y: active === option && !reduce ? -4 : 0 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 290, damping: 17 }}
            >
              {['✿', '✳', '✦'][index % 3]}
            </motion.span>
            <span className={c.optionlabel}>
              <input
                className={c.radio}
                type="radio"
                name={id}
                value={option}
                checked={active === option}
                onChange={() => {
                  if (value === undefined) setInner(option);
                  onChange?.(option);
                }}
              />
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
