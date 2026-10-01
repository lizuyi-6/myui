'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './RibbonBadge.css';
const c = {
  root: 'lc-ribbon-badge-root',
  ribbon: 'lc-ribbon-badge-ribbon',
  tailleft: 'lc-ribbon-badge-tailleft',
  tailright: 'lc-ribbon-badge-tailright',
  detail: 'lc-ribbon-badge-detail',
  inner: 'lc-ribbon-badge-inner'
};

export interface RibbonBadgeProps {
  label?: string;
  detail?: ReactNode;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
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

export default function RibbonBadge({
  label = 'A LITTLE EXTRA',
  detail = 'Made with care. Kept with love.',
  defaultOpen = false,
  onChange,
  accent = '#ad473e',
  surface = '#fff3e7',
  ink = '#603b32',
  className = ''
}: RibbonBadgeProps) {
  const id = useId();
  const reduce = useMotionPreference();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
    >
      <span aria-hidden="true" className={c.tailleft} />
      <span aria-hidden="true" className={c.tailright} />
      <button
        type="button"
        className={c.ribbon}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((previous) => !previous);
          onChange?.(!open);
        }}
      >
        <span aria-hidden="true">✷</span>
        {label}
        <span aria-hidden="true">✷</span>
      </button>
      <div id={id} aria-hidden={!open} inert={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className={c.detail}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28 }}
            >
              <div className={c.inner}>{detail}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
