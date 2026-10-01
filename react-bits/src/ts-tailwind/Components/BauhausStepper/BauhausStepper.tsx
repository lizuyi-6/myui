'use client';
import { useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,440px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:2px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:2px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:2px] [border-left-style:solid] [border-left-color:var(--lc-ink)]',
  head: '[display:flex] [justify-content:space-between] [gap:12px] [font-size:10px] [letter-spacing:2px]',
  steps: '[display:flex] [flex-wrap:wrap] [gap:16px] [margin:28px_0_20px]',
  step: '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [flex:1] [min-width:72px] [align-items:center] [flex-direction:column] [gap:14px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [padding:4px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  shape: '[display:block] [width:54px] [height:54px]',
  stepname: '[font:10px_monospace] [line-height:1.6] [text-align:center]',
  track: '[height:5px] [background:#24232324]',
  progress: '[height:100%] [background:var(--lc-ink)]',
  output: '[display:block] [margin-top:18px] [font-size:24px] [font-weight:800] [letter-spacing:-1px]'
};

export interface BauhausStepperProps {
  steps?: string[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
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

export default function BauhausStepper({
  steps = ['Discover', 'Make', 'Share'],
  value,
  defaultValue = 0,
  onChange,
  accent = '#cf392e',
  surface = '#f2ebdf',
  ink = '#242323',
  className = ''
}: BauhausStepperProps) {
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const active = Math.max(0, Math.min(steps.length - 1, value ?? inner));
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
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
