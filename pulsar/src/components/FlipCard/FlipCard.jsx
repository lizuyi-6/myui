import { useId, useState } from 'react';
import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function FlipCard({ front, back, flipped, defaultFlipped = false, onChange, className = '' }) {
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const [inner, setInner] = useState(defaultFlipped);
  const isFlipped = flipped ?? inner;
  return (
    <div className={className}>
      <div style={{ perspective: 1000 }}>
        <motion.div id={id} className="relative grid" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 22 }}>
          <div aria-hidden={isFlipped} inert={isFlipped} className="col-start-1 row-start-1 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-gradient-to-br from-[var(--accent-soft)] to-[var(--wash)] p-6 text-center"
            style={{ backfaceVisibility: 'hidden' }}>{front}</div>
          <div aria-hidden={!isFlipped} inert={!isFlipped} className="col-start-1 row-start-1 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--bg)] p-6 text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>{back}</div>
        </motion.div>
      </div>
      <button type="button" aria-controls={id} aria-pressed={isFlipped} onClick={() => { const next = !isFlipped; if (flipped === undefined) setInner(next); onChange?.(next); }}
        className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-[var(--ink)] outline-none hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
        <span aria-hidden="true">↻</span>{isFlipped ? '翻到正面' : '翻到背面'}
      </button>
    </div>
  );
}
