'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [isolation:isolate] [width:min(100%,320px)] [padding:18px] [background:var(--lc-surface)] [text-align:center]',
  ribbon:
    '[box-sizing:border-box] [min-height:58px] [font-family:inherit] [cursor:pointer] [color:#fff8e9] [position:relative] [display:flex] [align-items:center] [justify-content:space-around] [gap:12px] [width:100%] [padding:12px] [border-top-width:1px] [border-top-style:dashed] [border-top-color:#ffffff88] [border-right-width:1px] [border-right-style:dashed] [border-right-color:#ffffff88] [border-bottom-width:1px] [border-bottom-style:dashed] [border-bottom-color:#ffffff88] [border-left-width:1px] [border-left-style:dashed] [border-left-color:#ffffff88] [background:var(--lc-accent)] [outline:5px_solid_var(--lc-accent)] [font:700_12px_Georgia,serif] [letter-spacing:1px] focus-visible:[outline:3px_solid_var(--lc-ink)] focus-visible:[outline-offset:8px]',
  tailleft:
    '[position:absolute] [z-index:-1] [top:33px] [left:0] [width:40px] [height:52px] [background:color-mix(in_srgb,var(--lc-accent)_70%,#281c14)] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,22%_50%)]',
  tailright:
    '[position:absolute] [z-index:-1] [top:33px] [right:0] [width:40px] [height:52px] [background:color-mix(in_srgb,var(--lc-accent)_70%,#281c14)] [clip-path:polygon(0_0,100%_0,78%_50%,100%_100%,0_100%)]',
  detail: '[overflow:hidden]',
  inner: '[padding:28px_12px_6px] [font:italic_17px/1.7_Georgia,serif]'
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
export default function RibbonBadge({
  label = 'A LITTLE EXTRA',
  detail = 'Made with care. Kept with love.',
  defaultOpen = false,
  onChange,
  accent = '#ad473e',
  surface = '#fff3e7',
  ink = '#603b32',
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
      <span aria-hidden="true" className={c.tailleft} />
      <span aria-hidden="true" className={c.tailright} />
      <button
        type="button"
        className={c.ribbon}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((previous) => !previous);
          onChange?.(!open);
        }}
      >
        <span aria-hidden="true">✷</span>
        {label}
        <span aria-hidden="true">✷</span>
      </button>
      <div id={id} aria-hidden={!open} inert={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className={c.detail}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28 }}
            >
              <div className={c.inner}>{detail}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
