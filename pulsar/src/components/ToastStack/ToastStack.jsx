import { useState } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

function ToastItem({ item, index, count, expanded, reduce, onDismiss }) {
  const present = useIsPresent();
  return <motion.div layout aria-hidden={!present} inert={!present}
    className="absolute inset-x-0 top-0 flex min-h-20 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-4 pr-2 shadow-sm"
    style={{ zIndex: count - index, transformOrigin: 'top center' }}
    initial={reduce ? false : { opacity: 0, y: -24, scale: 0.9 }}
    animate={{ opacity: 1, y: expanded ? index * 94 : index * 12, scale: expanded ? 1 : 1 - index * 0.06 }}
    exit={{ opacity: 0, x: reduce ? 0 : 60 }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 26 }}>
    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">✦</span>
    <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p><p className="mt-1 text-xs text-[var(--muted)]">{item.message}</p></div>
    <button type="button" aria-label={`关闭提示：${item.title}`} onClick={event => {
      const stack = event.currentTarget.closest('[data-toast-stack]');
      const siblings = [...stack.querySelectorAll('div:not([inert]) > button')].filter(button => button !== event.currentTarget);
      // Keep keyboard focus in the stack, or on its stable container when empty.
      (siblings[0] ?? stack).focus({ preventScroll: true });
      onDismiss?.(item.id);
    }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-[var(--muted)] outline-none hover:bg-[var(--wash)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">×</button>
  </motion.div>;
}

export default function ToastStack({ items, onDismiss, className = '' }) {
  const reduce = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);
  return (
    <div data-toast-stack tabIndex={-1} aria-label="演示提示" className={`relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`} onPointerEnter={() => setExpanded(true)} onPointerLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}>
      <motion.div className="relative" animate={{ height: Math.max(94, expanded ? items.length * 94 : 94 + Math.max(0, items.length - 1) * 12) }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 28 }}>
        <AnimatePresence initial={false}>
          {items.map((item, index) => <ToastItem key={item.id} item={item} index={index} count={items.length} expanded={expanded} reduce={reduce} onDismiss={onDismiss} />)}
        </AnimatePresence>
        {items.length === 0 && <p className="py-6 text-center text-sm text-[var(--muted)]">提示已清空，再添加一条试试。</p>}
      </motion.div>
    </div>
  );
}
