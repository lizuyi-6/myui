'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './ElasticTabs.css';
const c = {
  root: 'lc-elastic-tabs-root',
  track: 'lc-elastic-tabs-track',
  tab: 'lc-elastic-tabs-tab',
  indicator: 'lc-elastic-tabs-indicator',
  label: 'lc-elastic-tabs-label',
  panel: 'lc-elastic-tabs-panel'
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
export default function ElasticTabs({
  items,
  value,
  defaultValue,
  onChange,
  ariaLabel = 'Explore',
  accent = '#d97745',
  surface = '#fff8f1',
  ink = '#3b2d24',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const refs = useRef([]);
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id);
  const active = items.some((item) => item.id === (value ?? inner)) ? (value ?? inner) : items[0]?.id;
  const choose = (next) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const navigate = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    choose(items[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div role="tablist" aria-label={ariaLabel} className={c.track}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            ref={(el) => {
              refs.current[index] = el;
            }}
            id={id + '-tab-' + index}
            aria-controls={id + '-panel-' + index}
            aria-selected={active === item.id}
            tabIndex={active === item.id ? 0 : -1}
            onClick={() => choose(item.id)}
            onKeyDown={(event) => navigate(event, index)}
            className={c.tab}
          >
            {active === item.id && (
              <motion.span
                aria-hidden="true"
                layoutId={id + '-indicator'}
                className={c.indicator}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 27 }}
              />
            )}
            <span className={c.label}>{item.label}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={id + '-panel-' + index}
          aria-labelledby={id + '-tab-' + index}
          hidden={active !== item.id}
          tabIndex={0}
          className={c.panel}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
