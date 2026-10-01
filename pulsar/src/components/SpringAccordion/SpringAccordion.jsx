import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function SpringAccordion({ items, value, defaultValue = null, onChange, className = '' }) {
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const [inner, setInner] = useState(defaultValue);
  const active = value === undefined ? inner : value;
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const open = active === item.id;
        return <div key={item.id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--wash)]">
          <h4><button type="button" id={`${id}-heading-${index}`} aria-expanded={open} aria-controls={`${id}-body-${index}`}
            onClick={() => { const next = open ? null : item.id; if (value === undefined) setInner(next); onChange?.(next); }}
            className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl px-4 text-left text-sm font-semibold text-[var(--ink)] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]">
            {item.title}<motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
              className="text-xl font-normal text-[var(--accent)]">+</motion.span>
          </button></h4>
          <div id={`${id}-body-${index}`} role="region" aria-labelledby={`${id}-heading-${index}`} aria-hidden={!open} inert={!open}>
            <AnimatePresence initial={false}>
              {open && <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 26 }}>
                <div className="px-4 pb-4 text-sm leading-relaxed text-[var(--muted)]">{item.content}</div>
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>;
      })}
    </div>
  );
}
