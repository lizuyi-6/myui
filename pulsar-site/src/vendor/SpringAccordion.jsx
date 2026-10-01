'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './SpringAccordion.css';
const c = {
  root: 'lc-spring-accordion-root',
  item: 'lc-spring-accordion-item',
  heading: 'lc-spring-accordion-heading',
  button: 'lc-spring-accordion-button',
  number: 'lc-spring-accordion-number',
  title: 'lc-spring-accordion-title',
  clip: 'lc-spring-accordion-clip',
  content: 'lc-spring-accordion-content'
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
export default function SpringAccordion({
  items,
  value,
  defaultValue = null,
  onChange,
  accent = '#252525',
  surface = '#f7f6f2',
  ink = '#252525',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultValue);
  const active = value === undefined ? inner : value;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      {items.map((item, index) => {
        const open = active === item.id;
        return (
          <div key={item.id} className={c.item}>
            <h3 className={c.heading}>
              <button
                type="button"
                id={id + '-heading-' + index}
                aria-expanded={open}
                aria-controls={id + '-panel-' + index}
                className={c.button}
                onClick={() => {
                  const next = open ? null : item.id;
                  if (value === undefined) setInner(next);
                  onChange?.(next);
                }}
              >
                <span className={c.number}>{String(index + 1).padStart(2, '0')}</span>
                <span className={c.title}>{item.title}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 24 }}
                >
                  +
                </motion.span>
              </button>
            </h3>
            <div
              id={id + '-panel-' + index}
              role="region"
              aria-labelledby={id + '-heading-' + index}
              aria-hidden={!open}
              inert={!open}
            >
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 26 }}
                    className={c.clip}
                  >
                    <div className={c.content}>{item.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
