'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import './PrismDeck.css';
const c = {
  root: 'lc-prism-deck-root',
  tabs: 'lc-prism-deck-tabs',
  tab: 'lc-prism-deck-tab',
  stage: 'lc-prism-deck-stage',
  panel: 'lc-prism-deck-panel',
  index: 'lc-prism-deck-index',
  title: 'lc-prism-deck-title',
  art: 'lc-prism-deck-art',
  shape: 'lc-prism-deck-shape',
  copy: 'lc-prism-deck-copy',
  empty: 'lc-prism-deck-empty'
};
export interface PrismPanel {
  id: string;
  label: string;
  title: string;
  content: ReactNode;
  color?: string;
}
export interface PrismDeckProps {
  items: PrismPanel[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
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

export default function PrismDeck({
  items,
  value,
  defaultValue = '',
  onChange,
  accent = '#b9a4ff',
  surface = '#171320',
  ink = '#fbf7ff',
  className = ''
}: PrismDeckProps) {
  const reduce = useMotionPreference();
  const uid = useId();
  const [internal, setInternal] = useState(defaultValue);
  const selected = items.findIndex((item) => item.id === (value ?? internal));
  const active = selected < 0 ? 0 : selected;
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (index: number) => {
    const item = items[index];
    if (!item) return;
    if (value === undefined) setInternal(item.id);
    onChange?.(item.id);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || !items.length) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    select(next);
    tabs.current[next]?.focus();
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
    >
      <div data-part="tabs" className={c.tabs} role="tablist" aria-label="Panels">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            data-part="tab"
            className={c.tab}
            id={uid + '-tab-' + index}
            aria-controls={uid + '-panel-' + index}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div data-part="stage" className={c.stage}>
        {items.length === 0 ? (
          <p data-part="empty" className={c.empty}>
            No panels yet.
          </p>
        ) : (
          items.map((item, index) => {
            const slot = (index - active + items.length) % items.length;
            return (
              <motion.section
                key={item.id}
                role="tabpanel"
                id={uid + '-panel-' + index}
                aria-labelledby={uid + '-tab-' + index}
                aria-hidden={slot !== 0}
                inert={slot !== 0}
                data-part="panel"
                className={c.panel}
                style={{ background: item.color ?? 'var(--lc-surface)', zIndex: items.length - slot }}
                animate={{
                  x: reduce ? 0 : slot * 15,
                  y: reduce ? 0 : slot * -18,
                  rotateX: reduce ? 0 : slot * 6,
                  rotateZ: reduce ? 0 : slot * 3,
                  scale: reduce ? 1 : Math.max(0.7, 1 - slot * 0.055),
                  opacity: slot > 3 ? 0 : slot === 0 ? 1 : reduce ? 0 : 0.65
                }}
                transition={{ type: 'spring', stiffness: 145, damping: 22 }}
              >
                <span data-part="index" className={c.index}>
                  {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <h3 data-part="title" className={c.title}>
                  {item.title}
                </h3>
                <div data-part="art" className={c.art} aria-hidden="true">
                  <span data-part="shape" className={c.shape} />
                  <span data-part="shape" className={c.shape} style={{ transform: 'rotate(60deg)' }} />
                </div>
                <div data-part="copy" className={c.copy}>
                  {item.content}
                </div>
              </motion.section>
            );
          })
        )}
      </div>
    </div>
  );
}
