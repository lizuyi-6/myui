'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './BubbleChoice.css';
const c = {
  root: 'lc-bubble-choice-root',
  legend: 'lc-bubble-choice-legend',
  options: 'lc-bubble-choice-options',
  option: 'lc-bubble-choice-option',
  bubble: 'lc-bubble-choice-bubble',
  optionlabel: 'lc-bubble-choice-optionlabel',
  radio: 'lc-bubble-choice-radio'
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
