'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,420px)] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#c9c9c9] [border-right-width:1px] [border-right-style:solid] [border-right-color:#c9c9c9] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#c9c9c9] [border-left-width:1px] [border-left-style:solid] [border-left-color:#c9c9c9] [border-radius:12px] [box-shadow:0_16px_35px_#00000012]',
  searchline:
    '[display:flex] [align-items:center] [gap:12px] [padding:12px_16px] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#dddddd] [font-size:24px]',
  input:
    '[box-sizing:border-box] [min-width:0] [flex:1] [min-height:44px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [color:var(--lc-ink)] [font-family:inherit] [font-size:14px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  kbd: '[flex-shrink:0] [padding:3px_5px] [font:10px_monospace] [border-top-width:1px] [border-top-style:solid] [border-top-color:#c9c9c9] [border-right-width:1px] [border-right-style:solid] [border-right-color:#c9c9c9] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#c9c9c9] [border-left-width:1px] [border-left-style:solid] [border-left-color:#c9c9c9] [border-radius:4px] [background:#eeeeee]',
  results: '[list-style:none] [margin:0] [padding:8px]',
  result:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [align-items:center] [justify-content:space-between] [gap:12px] [width:100%] [padding:12px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [border-radius:6px] [background:transparent] [text-align:left] [font-size:13px] hover:[background:#ededed] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] focus-visible:[background:#ededed]',
  empty: '[padding:12px_20px] [font-size:13px] [line-height:1.6]',
  footer:
    '[display:flex] [flex-wrap:wrap] [justify-content:space-between] [gap:8px] [padding:12px_16px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#dddddd] [font-size:9px]'
};
export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
}
export interface MonoCommandProps {
  items: CommandItem[];
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
  emptyText?: string;
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

export default function MonoCommand({
  items,
  onSelect,
  placeholder = 'Find a command…',
  emptyText = 'No commands found. Try another search.',
  accent = '#383838',
  surface = '#fafafa',
  ink = '#262626',
  className = ''
}: MonoCommandProps) {
  const id = useId();
  const reduce = useMotionPreference();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const search = useRef<HTMLInputElement>(null);
  const results = items.filter((item) => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Escape') {
      search.current?.focus();
      return;
    }
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? results.length - 1
          : (index + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
    refs.current[next]?.focus();
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
    >
      <div className={c.searchline}>
        <span aria-hidden="true">⌕</span>
        <input
          ref={search}
          className={c.input}
          type="search"
          aria-label={placeholder}
          aria-controls={id + '-results'}
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && results.length) {
              event.preventDefault();
              refs.current[0]?.focus();
            }
            if (event.key === 'Escape') setQuery('');
          }}
        />
        <kbd className={c.kbd}>ESC</kbd>
      </div>
      <ul id={id + '-results'} className={c.results}>
        {results.map((item, index) => (
          <motion.li
            key={item.id}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
          >
            <button
              type="button"
              className={c.result}
              ref={(el) => {
                refs.current[index] = el;
              }}
              onKeyDown={(event) => navigate(event, index)}
              onClick={() => {
                setSelected(item.label);
                onSelect?.(item);
              }}
            >
              <span>{item.label}</span>
              {item.shortcut && <kbd className={c.kbd}>{item.shortcut}</kbd>}
            </button>
          </motion.li>
        ))}
      </ul>
      {!results.length && <p className={c.empty}>{emptyText}</p>}
      <div className={c.footer}>
        <span>↑ ↓ Navigate / ↵ Select</span>
        <output aria-live="polite">{selected || 'READY'}</output>
      </div>
    </div>
  );
}
