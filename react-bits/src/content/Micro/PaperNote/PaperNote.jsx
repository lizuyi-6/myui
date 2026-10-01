'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './PaperNote.css';
const c = {
  root: 'lc-paper-note-root',
  tape: 'lc-paper-note-tape',
  header: 'lc-paper-note-header',
  pin: 'lc-paper-note-pin',
  text: 'lc-paper-note-text',
  fold: 'lc-paper-note-fold',
  footer: 'lc-paper-note-footer'
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
export default function PaperNote({
  value,
  defaultValue = 'Make something worth keeping.',
  onChange,
  label = 'A small thought',
  defaultPinned = false,
  accent = '#cb6745',
  surface = '#fff0a5',
  ink = '#55452a',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [draft, setDraft] = useState(defaultValue);
  const [pinned, setPinned] = useState(defaultPinned);
  return (
    <motion.div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      animate={{ rotate: pinned || reduce ? 0 : -3 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 17 }}
    >
      <span aria-hidden="true" className={c.tape} />
      <div className={c.header}>
        <label htmlFor={id}>{label}</label>
        <button
          type="button"
          aria-pressed={pinned}
          aria-label={pinned ? 'Unpin note' : 'Pin note'}
          onClick={() => setPinned((previous) => !previous)}
          className={c.pin}
        >
          {pinned ? '●' : '○'}
        </button>
      </div>
      <textarea
        id={id}
        value={value ?? draft}
        onChange={(event) => {
          if (value === undefined) setDraft(event.target.value);
          onChange?.(event.target.value);
        }}
        className={c.text}
      />
      <span aria-hidden="true" className={c.fold} />
      <div className={c.footer}>a thought for later ↗</div>
    </motion.div>
  );
}
