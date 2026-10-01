'use client';
import { useState, useRef, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import './MonoCommand.css';
const c = {
  root: 'lc-mono-command-root',
  searchline: 'lc-mono-command-searchline',
  input: 'lc-mono-command-input',
  kbd: 'lc-mono-command-kbd',
  results: 'lc-mono-command-results',
  result: 'lc-mono-command-result',
  empty: 'lc-mono-command-empty',
  footer: 'lc-mono-command-footer'
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
