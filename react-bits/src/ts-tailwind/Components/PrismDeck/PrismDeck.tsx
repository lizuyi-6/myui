'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, KeyboardEvent } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,440px)]',
  tabs: '[display:flex] [gap:4px] [flex-wrap:wrap] [margin-bottom:65px]',
  tab: '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [padding:10px_18px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#b9a4ff44] [border-right-width:1px] [border-right-style:solid] [border-right-color:#b9a4ff44] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#b9a4ff44] [border-left-width:1px] [border-left-style:solid] [border-left-color:#b9a4ff44] [border-radius:24px] [background:var(--lc-surface)] [font-size:12px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] [&[aria-selected="true"]]:[background:var(--lc-accent)] [&[aria-selected="true"]]:[color:#171320]',
  stage: '[position:relative] [height:345px] [margin-right:48px] [perspective:1000px]',
  panel:
    '[position:absolute] [inset:0] [border-top-width:1px] [border-top-style:solid] [border-top-color:#b9a4ff66] [border-right-width:1px] [border-right-style:solid] [border-right-color:#b9a4ff66] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#b9a4ff66] [border-left-width:1px] [border-left-style:solid] [border-left-color:#b9a4ff66] [border-radius:22px] [padding:24px] [transform-origin:50%_100%] [overflow:hidden] [box-shadow:0_22px_45px_#00000035]',
  index: '[font:10px_monospace] [letter-spacing:2px] [opacity:0.65]',
  title: '[font:30px_Georgia,serif] [line-height:1.05] [margin:16px_0]',
  art: '[position:relative] [height:125px] [display:grid] [place-items:center]',
  shape:
    '[position:absolute] [width:150px] [height:88px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-accent)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-accent)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-accent)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-accent)] [border-radius:50%] [box-shadow:inset_0_0_28px_#b9a4ff30]',
  copy: '[position:relative] [font-size:13px] [line-height:1.6]',
  empty: '[padding:24px] [text-align:center]'
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
