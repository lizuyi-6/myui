'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
import type { MotionValue } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,400px)] [padding:22px_16px_72px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#ffb86b33] [border-right-width:1px] [border-right-style:solid] [border-right-color:#ffb86b33] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#ffb86b33] [border-left-width:1px] [border-left-style:solid] [border-left-color:#ffb86b33] [border-radius:26px] [background:radial-gradient(ellipse_at_50%_45%,#6b422c50,transparent_60%),var(--lc-surface)]',
  sky: '[position:relative] [height:310px] [display:grid] [place-items:center]',
  track:
    '[position:absolute] [width:258px] [height:218px] [border-top-width:1px] [border-top-style:solid] [border-top-color:#ffb86b55] [border-right-width:1px] [border-right-style:solid] [border-right-color:#ffb86b55] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#ffb86b55] [border-left-width:1px] [border-left-style:solid] [border-left-color:#ffb86b55] [border-radius:50%]',
  center: '[position:absolute] [width:152px] [text-align:center]',
  title: '[font:24px_Georgia,serif] [color:var(--lc-accent)]',
  copy: '[font-size:11px] [line-height:1.6] [margin-top:10px]',
  satellite:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:absolute] [display:grid] [place-items:center] [width:50px] [height:50px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-accent)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-accent)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-accent)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-accent)] [border-radius:50%] [background:var(--lc-surface)] [font-size:21px] [box-shadow:0_0_20px_#ffb86b30] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  list: '[display:flex] [justify-content:center] [gap:5px] [flex-wrap:wrap]',
  subject:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [padding:8px_10px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [border-radius:18px] [background:transparent] [font-size:10px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] [&[aria-pressed="true"]]:[background:var(--lc-accent)] [&[aria-pressed="true"]]:[color:#181411]',
  pause:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:absolute] [right:14px] [bottom:14px] [z-index:10] [width:44px] [border-top-width:1px] [border-top-style:solid] [border-top-color:currentColor] [border-right-width:1px] [border-right-style:solid] [border-right-color:currentColor] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:currentColor] [border-left-width:1px] [border-left-style:solid] [border-left-color:currentColor] [border-radius:50%] [background:var(--lc-surface)] [font-size:13px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
