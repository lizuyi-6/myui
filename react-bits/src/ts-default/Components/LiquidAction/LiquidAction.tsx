'use client';
import { useState, useRef, useId, useSyncExternalStore, useEffect } from 'react';
import type { CSSProperties, PointerEvent, RefObject } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';
import type { MotionValue } from 'motion/react';
import './LiquidAction.css';
const c = {
  root: 'lc-liquid-action-root',
  filter: 'lc-liquid-action-filter',
  pool: 'lc-liquid-action-pool',
  blob: 'lc-liquid-action-blob',
  drop: 'lc-liquid-action-drop',
  action: 'lc-liquid-action-action',
  pause: 'lc-liquid-action-pause'
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
