'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';
import './ApertureReveal.css';
const c = {
  root: 'lc-aperture-reveal-root',
  cover: 'lc-aperture-reveal-cover',
  caption: 'lc-aperture-reveal-caption',
  title: 'lc-aperture-reveal-title',
  subtitle: 'lc-aperture-reveal-subtitle',
  cross: 'lc-aperture-reveal-cross',
  reveal: 'lc-aperture-reveal-reveal',
  orbit: 'lc-aperture-reveal-orbit',
  content: 'lc-aperture-reveal-content',
  trigger: 'lc-aperture-reveal-trigger'
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
