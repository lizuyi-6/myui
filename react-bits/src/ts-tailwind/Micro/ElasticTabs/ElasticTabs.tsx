'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, KeyboardEvent } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,420px)] [padding:24px] [background:var(--lc-surface)] [border-radius:24px]',
  track:
    '[display:flex] [gap:4px] [padding:5px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#d8cec7] [border-right-width:1px] [border-right-style:solid] [border-right-color:#d8cec7] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#d8cec7] [border-left-width:1px] [border-left-style:solid] [border-left-color:#d8cec7] [border-radius:16px]',
  tab: '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:relative] [flex:1] [min-width:0] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [padding:10px] [border-radius:12px] [font-size:14px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  indicator:
    '[position:absolute] [inset:0] [border-radius:12px] [background:color-mix(in_srgb,var(--lc-accent)_18%,transparent)]',
  label: '[position:relative]',
  panel:
    '[margin-top:22px] [line-height:1.7] [font-size:15px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
};
export interface ElasticTab {
  id: string;
  label: ReactNode;
  content: ReactNode;
}
export interface ElasticTabsProps {
  items: ElasticTab[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  ariaLabel?: string;
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
}: ElasticTabsProps) {
  const id = useId();
  const reduce = useMotionPreference();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id);
  const active = items.some((item) => item.id === (value ?? inner)) ? (value ?? inner) : items[0]?.id;
  const choose = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
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
