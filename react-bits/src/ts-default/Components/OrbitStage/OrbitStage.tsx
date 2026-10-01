'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
import type { MotionValue } from 'motion/react';
import './OrbitStage.css';
const c = {
  root: 'lc-orbit-stage-root',
  sky: 'lc-orbit-stage-sky',
  track: 'lc-orbit-stage-track',
  center: 'lc-orbit-stage-center',
  title: 'lc-orbit-stage-title',
  copy: 'lc-orbit-stage-copy',
  satellite: 'lc-orbit-stage-satellite',
  list: 'lc-orbit-stage-list',
  subject: 'lc-orbit-stage-subject',
  pause: 'lc-orbit-stage-pause'
};
export interface OrbitSubject {
  id: string;
  label: string;
  symbol: string;
  content: ReactNode;
}

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

function Satellite({
  item,
  index,
  count,
  seconds,
  rate,
  reduce,
  selected,
  onSelect
}: {
  item: OrbitSubject;
  index: number;
  count: number;
  seconds: MotionValue<number>;
  rate: number;
  reduce: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const angle = useTransform(seconds, (t) => (index / count) * Math.PI * 2 + (reduce ? 0 : t * rate * 0.18));
  const x = useTransform(angle, (t) => Math.cos(t) * 128);
  const y = useTransform(angle, (t) => Math.sin(t) * 108);
  return (
    <motion.button
      data-part="satellite"
      className={c.satellite}
      type="button"
      style={{ x, y }}
      aria-label={item.label}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span aria-hidden="true">{item.symbol}</span>
    </motion.button>
  );
}
export interface OrbitStageProps {
  items: OrbitSubject[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
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

export default function OrbitStage({
  items,
  value,
  defaultValue = '',
  onChange,
  paused = false,
  speed = 1,
  accent = '#ffb86b',
  surface = '#181411',
  ink = '#fff3e6',
  className = ''
}: OrbitStageProps) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
  const { seconds, active, reduce } = useSceneClock(ref, paused || userPaused || rate === 0 || focused);
  const [internal, setInternal] = useState(defaultValue);
  const subject = items.find((item) => item.id === (value ?? internal)) ?? items[0];
  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };
  return (
    <div
      ref={ref}
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      data-motion={active && !focused ? 'running' : 'paused'}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div data-part="sky" className={c.sky}>
        <span data-part="track" className={c.track} aria-hidden="true" />
        <span
          data-part="track"
          className={c.track}
          aria-hidden="true"
          style={{ transform: 'rotate(60deg)', opacity: 0.3 }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={subject?.id ?? 'empty'}
            data-part="center"
            className={c.center}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 1.2 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            <span data-part="title" className={c.title}>
              {subject?.label ?? 'No subjects'}
            </span>
            <div data-part="copy" className={c.copy}>
              {subject?.content ?? 'Add a subject to begin.'}
            </div>
          </motion.div>
        </AnimatePresence>
        {items.slice(0, 6).map((item, index) => (
          <Satellite
            key={item.id}
            item={item}
            index={index}
            count={Math.min(items.length, 6)}
            seconds={seconds}
            rate={rate}
            reduce={reduce}
            selected={subject?.id === item.id}
            onSelect={() => select(item.id)}
          />
        ))}
      </div>
      <div data-part="list" className={c.list} aria-label="Subjects">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            data-part="subject"
            className={c.subject}
            aria-pressed={subject?.id === item.id}
            onClick={() => select(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
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
