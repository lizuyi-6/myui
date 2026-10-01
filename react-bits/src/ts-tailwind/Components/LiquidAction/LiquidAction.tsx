'use client';
import { useState, useRef, useId, useSyncExternalStore, useEffect } from 'react';
import type { CSSProperties, PointerEvent, RefObject } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';
import type { MotionValue } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,400px)] [height:290px] [display:grid] [place-items:center] [border-radius:36px] [background:var(--lc-surface)] [overflow:hidden]',
  filter: '[position:absolute] [width:0] [height:0]',
  pool: '[position:absolute] [inset:0] [display:grid] [place-items:center] [pointer-events:none]',
  blob: '[position:absolute] [width:190px] [height:80px] [border-radius:45%] [background:var(--lc-accent)]',
  drop: '[position:absolute] [width:46px] [height:46px] [border-radius:50%] [background:var(--lc-accent)]',
  action:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:relative] [display:flex] [gap:14px] [align-items:center] [padding:20px_24px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [border-radius:40px] [background:transparent] [font-size:15px] [font-weight:700] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] disabled:[cursor:not-allowed] disabled:[opacity:0.45]',
  pause:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:absolute] [right:14px] [bottom:14px] [z-index:10] [width:44px] [border-top-width:1px] [border-top-style:solid] [border-top-color:currentColor] [border-right-width:1px] [border-right-style:solid] [border-right-color:currentColor] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:currentColor] [border-left-width:1px] [border-left-style:solid] [border-left-color:currentColor] [border-radius:50%] [background:var(--lc-surface)] [font-size:13px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
};

const visibleSnapshot = () => typeof document === 'undefined' || document.visibilityState !== 'hidden';
const visibleSubscribe = (listener: () => void) => {
  document.addEventListener('visibilitychange', listener);
  return () => document.removeEventListener('visibilitychange', listener);
};
function useSceneClock(ref: RefObject<HTMLDivElement | null>, paused: boolean) {
  const reduce = useMotionPreference();
  const inView = useInView(ref, { amount: 0.1 });
  const pageVisible = useSyncExternalStore(visibleSubscribe, visibleSnapshot, () => true);
  const active = !paused && !reduce && inView && pageVisible;
  const seconds = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (active) seconds.set(seconds.get() + Math.min(delta, 64) / 1000);
  });
  return { seconds, active, reduce };
}

function Droplet({
  index,
  seconds,
  rate,
  merged,
  reduce
}: {
  index: number;
  seconds: MotionValue<number>;
  rate: number;
  merged: boolean;
  reduce: boolean;
}) {
  const x = useTransform(seconds, (t) =>
    reduce
      ? Math.cos((index * Math.PI * 2) / 5) * 62
      : Math.cos(t * rate * 0.8 + (index * Math.PI * 2) / 5) * (merged ? 72 : 100)
  );
  const y = useTransform(seconds, (t) =>
    reduce
      ? Math.sin((index * Math.PI * 2) / 5) * 30
      : Math.sin(t * rate * 0.8 + (index * Math.PI * 2) / 5) * (merged ? 20 : 55)
  );
  return (
    <motion.span
      data-part="drop"
      className={c.drop}
      style={{ x, y }}
      animate={{ scale: merged ? 1.5 : 1 }}
      transition={{ duration: reduce ? 0 : 0.45 }}
    />
  );
}
export interface LiquidActionProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  paused?: boolean;
  speed?: number;
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

export default function LiquidAction({
  label = 'Let’s make waves',
  onClick,
  disabled = false,
  paused = false,
  speed = 1,
  accent = '#d283fb',
  surface = '#fff2f8',
  ink = '#49215b',
  className = ''
}: LiquidActionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
  const { seconds, active, reduce } = useSceneClock(ref, paused || userPaused || rate === 0);
  const uid = useId().replace(/:/g, '');
  const [merged, setMerged] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 15 });
  const y = useSpring(my, { stiffness: 180, damping: 15 });
  useEffect(() => {
    if (reduce || disabled) {
      mx.set(0);
      my.set(0);
    }
  }, [reduce, disabled, mx, my]);
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled || reduce || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    my.set((event.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const reset = () => {
    setMerged(false);
    mx.set(0);
    my.set(0);
  };
  return (
    <div
      ref={ref}
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      data-motion={active ? 'running' : 'paused'}
    >
      <svg data-part="filter" className={c.filter} aria-hidden="true">
        <defs>
          <filter id={uid}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
            <feBlend in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <div data-part="pool" className={c.pool} aria-hidden="true" style={{ filter: 'url(#' + uid + ')' }}>
        <span data-part="blob" className={c.blob} />
        {Array.from({ length: 5 }, (_, index) => (
          <Droplet key={index} index={index} seconds={seconds} rate={rate} merged={merged} reduce={reduce} />
        ))}
      </div>
      <motion.button
        type="button"
        disabled={disabled}
        data-part="action"
        className={c.action}
        style={{ x, y }}
        onPointerMove={move}
        onPointerEnter={() => setMerged(!disabled)}
        onPointerLeave={reset}
        onFocus={() => setMerged(!disabled)}
        onBlur={reset}
        onClick={onClick}
        whileTap={reduce || disabled ? {} : { scale: 0.92 }}
      >
        {label}
        <span aria-hidden="true">↗</span>
      </motion.button>
      <button
        type="button"
        data-part="pause"
        className={c.pause}
        aria-label={userPaused ? 'Resume animation' : 'Pause animation'}
        aria-pressed={userPaused}
        onClick={() => setUserPaused((value) => !value)}
      >
        {userPaused ? '▶' : 'Ⅱ'}
      </button>
    </div>
  );
}
