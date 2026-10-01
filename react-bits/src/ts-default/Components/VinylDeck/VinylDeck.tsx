'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion, useInView } from 'motion/react';
import './VinylDeck.css';
const c = {
  root: 'lc-vinyl-deck-root',
  title: 'lc-vinyl-deck-title',
  platter: 'lc-vinyl-deck-platter',
  record: 'lc-vinyl-deck-record',
  recordlabel: 'lc-vinyl-deck-recordlabel',
  hole: 'lc-vinyl-deck-hole',
  arm: 'lc-vinyl-deck-arm',
  head: 'lc-vinyl-deck-head',
  control: 'lc-vinyl-deck-control'
};

export interface VinylDeckProps {
  title?: string;
  artist?: string;
  spinning?: boolean;
  defaultSpinning?: boolean;
  onChange?: (spinning: boolean) => void;
  rpm?: number;
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

export default function VinylDeck({
  title = 'Slow Sunday',
  artist = 'Side A / Studio Sessions',
  spinning,
  defaultSpinning = false,
  onChange,
  rpm = 33,
  accent = '#e67846',
  surface = '#e6dfd3',
  ink = '#302a24',
  className = ''
}: VinylDeckProps) {
  const reduce = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref);
  const [inner, setInner] = useState(defaultSpinning);
  const on = spinning ?? inner;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      ref={ref}
    >
      <div className={c.title}>
        <strong>{title}</strong>
        <span>{artist}</span>
      </div>
      <div className={c.platter}>
        <motion.div
          className={c.record}
          aria-hidden="true"
          animate={{ rotate: on && !reduce && near ? 360 : 0 }}
          transition={
            on && !reduce && near
              ? { duration: 60 / Math.max(1, rpm), repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
        >
          <span className={c.recordlabel}>
            <span>SIDE A</span>
            <strong>LP / 33</strong>
            <i className={c.hole} />
          </span>
        </motion.div>
        <motion.div
          aria-hidden="true"
          className={c.arm}
          animate={{ rotate: on ? 20 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 18 }}
        >
          <span className={c.head} />
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={on}
        className={c.control}
        onClick={() => {
          if (spinning === undefined) setInner(!on);
          onChange?.(!on);
        }}
      >
        {on ? 'Stop rotation' : 'Spin the record'}
        <span aria-hidden="true">{on ? 'Ⅱ' : '▶'}</span>
      </button>
    </div>
  );
}
