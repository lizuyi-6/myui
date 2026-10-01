'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'motion/react';
import './ToastStack.css';
const c = {
  root: 'lc-toast-stack-root',
  stack: 'lc-toast-stack-stack',
  toast: 'lc-toast-stack-toast',
  icon: 'lc-toast-stack-icon',
  copy: 'lc-toast-stack-copy',
  message: 'lc-toast-stack-message',
  close: 'lc-toast-stack-close',
  empty: 'lc-toast-stack-empty'
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
function ToastRow({ item, index, count, expanded, reduce, onDismiss, classes }) {
  const present = useIsPresent();
  return (
    <motion.div
      layout
      aria-hidden={!present}
      inert={!present}
      className={classes.toast}
      style={{ zIndex: count - index, transformOrigin: 'top center' }}
      initial={reduce ? false : { opacity: 0, y: -20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: expanded ? index * 94 : index * 12,
        scale: expanded ? 1 : Math.max(0.7, 1 - index * 0.06)
      }}
      exit={{ opacity: 0, x: reduce ? 0 : 60 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 26 }}
    >
      <span aria-hidden="true" className={classes.icon}>
        ✦
      </span>
      <div className={classes.copy}>
        <strong>{item.title}</strong>
        <p className={classes.message}>{item.message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label={'Dismiss ' + item.title}
          className={classes.close}
          onClick={(event) => {
            const stack = event.currentTarget.closest('[data-toast-stack]');
            const next = [...stack.querySelectorAll('div:not([inert]) > button')].find(
              (button) => button !== event.currentTarget
            );
            (next ?? stack).focus({ preventScroll: true });
            onDismiss(item.id);
          }}
        >
          ×
        </button>
      )}
    </motion.div>
  );
}
export default function ToastStack({
  items,
  onDismiss,
  emptyText = 'All caught up.',
  ariaLabel = 'Notifications',
  accent = '#098a73',
  surface = '#effaf5',
  ink = '#163d32',
  className = ''
}) {
  const reduce = useMotionPreference();
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      data-toast-stack
      tabIndex={-1}
      aria-label={ariaLabel}
      onPointerEnter={() => setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
    >
      <motion.div
        className={c.stack}
        animate={{ height: Math.max(94, expanded ? items.length * 94 : 94 + Math.max(0, items.length - 1) * 12) }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 28 }}
      >
        <AnimatePresence initial={false}>
          {items.map((item, index) => (
            <ToastRow
              key={item.id}
              item={item}
              index={index}
              count={items.length}
              expanded={expanded}
              reduce={reduce}
              onDismiss={onDismiss}
              classes={c}
            />
          ))}
        </AnimatePresence>
        {items.length === 0 && <p className={c.empty}>{emptyText}</p>}
      </motion.div>
    </div>
  );
}
