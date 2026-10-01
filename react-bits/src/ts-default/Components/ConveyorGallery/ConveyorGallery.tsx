'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { motion, useInView, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
import './ConveyorGallery.css';
const c = {
  root: 'lc-conveyor-gallery-root',
  frame: 'lc-conveyor-gallery-frame',
  strip: 'lc-conveyor-gallery-strip',
  card: 'lc-conveyor-gallery-card',
  art: 'lc-conveyor-gallery-art',
  caption: 'lc-conveyor-gallery-caption',
  footer: 'lc-conveyor-gallery-footer',
  label: 'lc-conveyor-gallery-label',
  list: 'lc-conveyor-gallery-list',
  item: 'lc-conveyor-gallery-item',
  pause: 'lc-conveyor-gallery-pause'
};
export interface ConveyorItem {
  id: string;
  title: string;
  content: ReactNode;
  color?: string;
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

export interface ConveyorGalleryProps {
  items: ConveyorItem[];
  onSelect?: (item: ConveyorItem) => void;
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

export default function ConveyorGallery({
  items,
  onSelect,
  paused = false,
  speed = 1,
  accent = '#e6a75b',
  surface = '#20201e',
  ink = '#fff3de',
  className = ''
}: ConveyorGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const { seconds, active, reduce } = useSceneClock(
    ref,
    paused || userPaused || engaged || (Number.isFinite(speed) && speed <= 0)
  );
  const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
  const x = useTransform(seconds, (t) => (items.length ? -((t * rate * 35) % (items.length * 172)) : 0));
  return (
    <div
      ref={ref}
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      data-motion={active ? 'running' : 'paused'}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false);
      }}
    >
      <div data-part="frame" className={c.frame} aria-hidden="true" inert>
        <motion.div data-part="strip" className={c.strip} style={{ x: reduce ? 0 : x, rotate: -12 }}>
          {[0, 1, 2].flatMap((copy) =>
            items.map((item, index) => (
              <div
                data-part="card"
                className={c.card}
                key={copy + '-' + item.id}
                style={{ background: item.color ?? 'var(--lc-accent)' }}
              >
                <span data-part="art" className={c.art}>
                  {item.content}
                </span>
                <span data-part="caption" className={c.caption}>
                  {String(index + 1).padStart(2, '0')} / {item.title}
                </span>
              </div>
            ))
          )}
        </motion.div>
      </div>
      <div data-part="footer" className={c.footer}>
        <span data-part="label" className={c.label}>
          A FEW FRAMES
          <br />
          WORTH KEEPING.
        </span>
        <div data-part="list" className={c.list}>
          {items.length ? (
            items.map((item) => (
              <button type="button" data-part="item" className={c.item} key={item.id} onClick={() => onSelect?.(item)}>
                {item.title}
              </button>
            ))
          ) : (
            <span>No frames yet.</span>
          )}
        </div>
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
