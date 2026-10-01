'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,340px)] [padding:24px] [background-color:var(--lc-surface)] [background-image:linear-gradient(#d8e9f814_1px,transparent_1px),linear-gradient(90deg,#d8e9f814_1px,transparent_1px)] [background-size:20px_20px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#a9ccea80] [border-right-width:1px] [border-right-style:solid] [border-right-color:#a9ccea80] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#a9ccea80] [border-left-width:1px] [border-left-style:solid] [border-left-color:#a9ccea80]',
  header: '[display:flex] [justify-content:space-between] [gap:12px] [font-size:12px]',
  tag: '[font-size:9px] [color:var(--lc-accent)]',
  drawing: '[position:relative] [margin:22px_24px_22px_8px] [padding-top:20px]',
  width: '[position:absolute] [left:0] [right:0] [top:0] [text-align:center] [font-size:10px] [color:var(--lc-accent)]',
  object:
    '[position:relative] [display:flex] [align-items:center] [justify-content:center] [height:110px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [border-radius:18px_18px_4px_4px] [outline:1px_dashed_#a9ccea80] [outline-offset:8px]',
  center: '[font-size:26px] [color:#a9ccea80]',
  corner: '[position:absolute] [top:-12px] [left:-12px] [color:var(--lc-accent)] [font-size:20px]',
  height:
    '[position:absolute] [right:-28px] [top:50%] [font-size:9px] [color:var(--lc-accent)] [writing-mode:vertical-rl]',
  button:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [align-items:center] [justify-content:space-between] [gap:12px] [width:100%] [padding:12px_0] [border-top-width:1px] [border-top-style:dashed] [border-top-color:#a9ccea80] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font-size:11px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  clip: '[overflow:hidden]',
  details: '[padding:12px_0_4px] [font-size:12px] [line-height:1.8] [color:var(--lc-accent)]'
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
