'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './BlueprintPanel.css';
const c = {
  root: 'lc-blueprint-panel-root',
  header: 'lc-blueprint-panel-header',
  tag: 'lc-blueprint-panel-tag',
  drawing: 'lc-blueprint-panel-drawing',
  width: 'lc-blueprint-panel-width',
  object: 'lc-blueprint-panel-object',
  center: 'lc-blueprint-panel-center',
  corner: 'lc-blueprint-panel-corner',
  height: 'lc-blueprint-panel-height',
  button: 'lc-blueprint-panel-button',
  clip: 'lc-blueprint-panel-clip',
  details: 'lc-blueprint-panel-details'
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
export default function BlueprintPanel({
  title = 'Object / 004',
  widthLabel = '240 mm',
  heightLabel = '160 mm',
  children = 'Material: imagination. Finish: considered.',
  defaultOpen = false,
  onChange,
  accent = '#ffbe77',
  surface = '#0c355d',
  ink = '#d8e9f8',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div className={c.header}>
        <span>{title}</span>
        <span className={c.tag}>FIG. 01</span>
      </div>
      <div className={c.drawing} aria-hidden="true">
        <div className={c.width}>← {widthLabel} →</div>
        <div className={c.object}>
          <span className={c.center}>+</span>
          <span className={c.corner}>⌜</span>
        </div>
        <span className={c.height}>{heightLabel}</span>
      </div>
      <button
        type="button"
        className={c.button}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((previous) => !previous);
          onChange?.(!open);
        }}
      >
        <span>{open ? 'Close specifications' : 'View specifications'}</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div id={id} aria-hidden={!open} inert={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className={c.clip}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <div className={c.details}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
