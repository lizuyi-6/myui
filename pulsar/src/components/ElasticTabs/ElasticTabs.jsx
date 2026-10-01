import { useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function ElasticTabs({ items, value, defaultValue, onChange, ariaLabel = '内容分类', className = '' }) {
  const id = useId();
  const buttons = useRef([]);
  const reduce = usePrefersReducedMotion();
  const [selected, setSelected] = useState(defaultValue ?? items[0]?.id);
  const active = value ?? selected;
  const choose = next => {
    if (value === undefined) setSelected(next);
    onChange?.(next);
  };
  const navigate = (event, index) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    choose(items[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={ariaLabel} className="flex rounded-2xl border border-[var(--border)] bg-[var(--wash)] p-1.5">
        {items.map((item, index) => (
          <button key={item.id} ref={el => { buttons.current[index] = el; }} type="button" role="tab"
            id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === item.id}
            tabIndex={active === item.id ? 0 : -1} onClick={() => choose(item.id)} onKeyDown={event => navigate(event, index)}
            className="relative min-h-11 min-w-0 flex-1 rounded-xl px-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
            {active === item.id && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-xl bg-[var(--accent-soft)]"
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 27 }} />}
            <span className={`relative ${active === item.id ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{item.label}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={item.id} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
          hidden={active !== item.id} tabIndex={0} className="mt-6 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
          {item.content}
        </div>
      ))}
    </div>
  );
}
