'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,380px)] [border-radius:20px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  stack: '[position:relative]',
  toast:
    '[position:absolute] [inset:0_0_auto] [display:flex] [align-items:center] [gap:12px] [min-height:80px] [box-sizing:border-box] [padding:14px_8px_14px_18px] [border-radius:20px] [border-top-width:1px] [border-top-style:solid] [border-top-color:color-mix(in_srgb,var(--lc-ink)_15%,transparent)] [border-right-width:1px] [border-right-style:solid] [border-right-color:color-mix(in_srgb,var(--lc-ink)_15%,transparent)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:color-mix(in_srgb,var(--lc-ink)_15%,transparent)] [border-left-width:1px] [border-left-style:solid] [border-left-color:color-mix(in_srgb,var(--lc-ink)_15%,transparent)] [background:color-mix(in_srgb,var(--lc-surface)_88%,transparent)] [backdrop-filter:blur(20px)] [box-shadow:0_12px_32px_#06372312]',
  icon: '[display:flex] [align-items:center] [justify-content:center] [flex-shrink:0] [width:36px] [height:36px] [border-radius:50%] [background:color-mix(in_srgb,var(--lc-accent)_12%,transparent)] [color:var(--lc-accent)]',
  copy: '[min-width:0] [flex:1] [font-size:14px]',
  message: '[margin:5px_0_0] [font-size:12px] [line-height:1.4] [overflow-wrap:anywhere]',
  close:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [width:44px] [flex-shrink:0] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [border-radius:12px] [background:transparent] [font-size:22px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  empty: '[padding:24px] [text-align:center] [font-size:14px]'
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
