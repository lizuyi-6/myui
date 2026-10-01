'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './BauhausStepper.css';
const c = {
  root: 'lc-bauhaus-stepper-root',
  head: 'lc-bauhaus-stepper-head',
  steps: 'lc-bauhaus-stepper-steps',
  step: 'lc-bauhaus-stepper-step',
  shape: 'lc-bauhaus-stepper-shape',
  stepname: 'lc-bauhaus-stepper-stepname',
  track: 'lc-bauhaus-stepper-track',
  progress: 'lc-bauhaus-stepper-progress',
  output: 'lc-bauhaus-stepper-output'
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
export default function BauhausStepper({
  steps = ['Discover', 'Make', 'Share'],
  value,
  defaultValue = 0,
  onChange,
  accent = '#cf392e',
  surface = '#f2ebdf',
  ink = '#242323',
  className = ''
}) {
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const active = Math.max(0, Math.min(steps.length - 1, value ?? inner));
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div className={c.head}>
        FORM FOLLOWS FEELING<span aria-hidden="true">↗</span>
      </div>
      <div className={c.steps}>
        {steps.map((step, index) => (
          <button
            type="button"
            key={index}
            aria-current={index === active ? 'step' : undefined}
            className={c.step}
            onClick={() => {
              if (value === undefined) setInner(index);
              onChange?.(index);
            }}
          >
            <motion.span
              aria-hidden="true"
              className={c.shape}
              style={{
                borderRadius: index % 3 === 0 ? '50%' : index % 3 === 1 ? 0 : '50% 50% 0 0',
                background: ['var(--lc-accent)', '#dfb934', '#315c99'][index % 3]
              }}
              animate={{ scale: index === active ? 1 : 0.72, rotate: reduce ? 0 : index === active ? 0 : -12 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 20 }}
            />
            <span className={c.stepname}>
              {String(index + 1).padStart(2, '0')} / {step}
            </span>
          </button>
        ))}
      </div>
      <div className={c.track}>
        <motion.div
          className={c.progress}
          animate={{ width: steps.length ? ((active + 1) / steps.length) * 100 + '%' : '0%' }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 23 }}
        />
      </div>
      <output className={c.output}>{steps[active] ?? 'No steps'}</output>
    </div>
  );
}
