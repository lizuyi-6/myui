'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,440px)] [padding:8px_24px] [background:var(--lc-surface)] [border-top-width:2px] [border-top-style:solid] [border-top-color:var(--lc-ink)]',
  item: '[border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#bcbab4]',
  heading: '[margin:0]',
  button:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [align-items:center] [gap:16px] [width:100%] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [text-align:left] [padding:20px_0] [font-size:16px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  number: '[font-family:monospace] [font-size:11px] [opacity:0.6]',
  title: '[flex:1] [font-family:Georgia,serif] [font-weight:400]',
  clip: '[overflow:hidden]',
  content: '[padding:0_0_20px_32px] [font-size:14px] [line-height:1.8]'
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
