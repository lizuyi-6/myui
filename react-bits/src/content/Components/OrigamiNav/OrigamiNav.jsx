'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './OrigamiNav.css';
const c = {
  root: 'lc-origami-nav-root',
  trigger: 'lc-origami-nav-trigger',
  fold: 'lc-origami-nav-fold',
  links: 'lc-origami-nav-links',
  link: 'lc-origami-nav-link',
  number: 'lc-origami-nav-number',
  arrow: 'lc-origami-nav-arrow'
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
export default function OrigamiNav({
  items,
  open,
  defaultOpen = false,
  onChange,
  label = 'Explore the studio',
  accent = '#8469ad',
  surface = '#f0e7fc',
  ink = '#453558',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultOpen);
  const expanded = open ?? inner;
  return (
    <nav
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      aria-label={label}
    >
      <button
        type="button"
        className={c.trigger}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => {
          if (open === undefined) setInner(!expanded);
          onChange?.(!expanded);
        }}
      >
        <span>{label}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        id={id}
        aria-hidden={!expanded}
        inert={!expanded}
        className={c.fold}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.32 }}
      >
        <div className={c.links}>
          {items.map((item, index) => (
            <motion.a
              key={item.href + index}
              href={item.href}
              className={c.link}
              initial={false}
              animate={{ rotateX: reduce || expanded ? 0 : -70 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : index * 0.04 }}
              style={{
                background:
                  index % 2 === 0 ? 'var(--lc-surface)' : 'color-mix(in srgb,var(--lc-accent) 16%,var(--lc-surface))'
              }}
            >
              <span className={c.number}>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
              <span aria-hidden="true" className={c.arrow}>
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
