'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,420px)] [height:360px] [overflow:hidden] [border-radius:2px] [background:var(--lc-surface)]',
  cover: '[position:absolute] [inset:0] [padding:26px]',
  caption: '[font:10px_monospace] [letter-spacing:2px]',
  title:
    '[margin:36px_0_18px] [max-width:250px] [font-size:64px] [line-height:0.92] [letter-spacing:-5px] [font-weight:800]',
  subtitle: '[font-size:12px]',
  cross: '[position:absolute] [right:28px] [top:32px] [font-size:48px] [color:var(--lc-accent)]',
  reveal:
    '[position:absolute] [inset:0] [display:grid] [place-items:center] [padding:30px_30px_75px] [background:var(--lc-accent)] [color:#21211f]',
  orbit:
    '[position:absolute] [width:260px] [height:260px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#21211f40] [border-right-width:1px] [border-right-style:solid] [border-right-color:#21211f40] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#21211f40] [border-left-width:1px] [border-left-style:solid] [border-left-color:#21211f40] [border-radius:50%] [box-shadow:0_0_0_30px_#21211f0a,0_0_0_60px_#21211f08]',
  content: '[position:relative] [font:32px_Georgia,serif] [line-height:1.2] [text-align:center]',
  trigger:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:absolute] [bottom:18px] [left:24px] [right:24px] [display:flex] [align-items:center] [justify-content:space-between] [padding:12px_0] [border-top-width:1px] [border-top-style:solid] [border-top-color:currentColor] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font-size:12px] [z-index:2] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
};

export interface ApertureRevealProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
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

export default function ApertureReveal({
  title = 'LOOK INSIDE',
  subtitle = 'A different point of view.',
  children = 'Your content. Revealed.',
  open,
  defaultOpen = false,
  onChange,
  accent = '#ff603f',
  surface = '#ede7dc',
  ink = '#21211f',
  className = ''
}: ApertureRevealProps) {
  const reduce = useMotionPreference();
  const id = useId();
  const [internal, setInternal] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [point, setPoint] = useState({ x: 50, y: 50 });
  const pinned = open ?? internal;
  const showing = pinned || hover || focused;
  const toggle = () => {
    const next = !pinned;
    if (open === undefined) setInternal(next);
    onChange?.(next);
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
        setPoint({ x: 50, y: 50 });
      }}
      onPointerMove={(event) => {
        if (event.pointerType === 'touch' || reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPoint({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div data-part="cover" className={c.cover} aria-hidden={showing}>
        <span data-part="caption" className={c.caption}>
          FRAME / 01
        </span>
        <h3 data-part="title" className={c.title}>
          {title}
        </h3>
        <p data-part="subtitle" className={c.subtitle}>
          {subtitle}
        </p>
        <span data-part="cross" className={c.cross} aria-hidden="true">
          ⊕
        </span>
      </div>
      <motion.div
        id={id}
        data-part="reveal"
        className={c.reveal}
        aria-hidden={!showing}
        inert={!showing}
        animate={{ clipPath: 'circle(' + (showing ? 145 : 0) + '% at ' + point.x + '% ' + point.y + '%)' }}
        transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span data-part="orbit" className={c.orbit} aria-hidden="true" />
        <div data-part="content" className={c.content}>
          {children}
        </div>
      </motion.div>
      <button
        type="button"
        data-part="trigger"
        className={c.trigger}
        aria-controls={id}
        aria-expanded={showing}
        aria-pressed={pinned}
        onClick={toggle}
      >
        {pinned ? 'Close view' : 'Keep open'} <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
