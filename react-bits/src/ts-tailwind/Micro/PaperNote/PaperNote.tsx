'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,300px)] [padding:24px_24px_20px] [background:var(--lc-surface)] [box-shadow:4px_12px_22px_#48341326] [border-radius:2px]',
  tape: '[position:absolute] [width:92px] [height:26px] [top:-12px] [left:calc(50%_-_46px)] [transform:rotate(4deg)] [background:#ffffff88] [border-left-width:2px] [border-left-style:dotted] [border-left-color:#c8bb8980] [border-right-width:2px] [border-right-style:dotted] [border-right-color:#c8bb8980]',
  header: '[display:flex] [align-items:center] [justify-content:space-between] [font:italic_15px_Georgia,serif]',
  pin: '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-accent)] [width:44px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font-size:22px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  text: '[box-sizing:border-box] [display:block] [resize:vertical] [width:100%] [min-height:144px] [max-height:360px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [padding:4px_0] [margin-top:10px] [background:repeating-linear-gradient(transparent,transparent_31px,#b7a95355_31px,#b7a95355_32px)] [color:var(--lc-ink)] [font:italic_20px/32px_Georgia,serif] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  fold: '[position:absolute] [bottom:0] [right:0] [width:0] [height:0] [border-top-width:22px] [border-top-style:solid] [border-top-color:#d5bf67] [border-right-width:22px] [border-right-style:solid] [border-right-color:transparent]',
  footer: '[margin-top:16px] [font:10px_monospace] [color:var(--lc-accent)]'
};

export interface PaperNoteProps {
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  label?: string;
  defaultPinned?: boolean;
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
}: PaperNoteProps) {
  const id = useId();
  const reduce = useMotionPreference();
  const [draft, setDraft] = useState(defaultValue);
  const [pinned, setPinned] = useState(defaultPinned);
  return (
    <motion.div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
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
