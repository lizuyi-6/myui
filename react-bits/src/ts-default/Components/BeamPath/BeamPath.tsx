'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { motion, useInView, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
import type { MotionValue } from 'motion/react';
import './BeamPath.css';
const c = {
  root: 'lc-beam-path-root',
  svg: 'lc-beam-path-svg',
  labels: 'lc-beam-path-labels',
  endpoint: 'lc-beam-path-endpoint',
  hub: 'lc-beam-path-hub',
  content: 'lc-beam-path-content',
  title: 'lc-beam-path-title',
  copy: 'lc-beam-path-copy',
  pause: 'lc-beam-path-pause'
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

function Packet({ seconds, index, rate }: { seconds: MotionValue<number>; index: number; rate: number }) {
  const offset = useTransform(seconds, (t) => -(((t * rate) / 3 + index * 0.23) % 1));
  return (
    <motion.path
      d={
        [
          'M 12 50 C 180 50 155 175 240 175',
          'M 12 175 C 135 175 150 175 240 175',
          'M 12 300 C 180 300 155 175 240 175',
          'M 468 50 C 300 50 325 175 240 175',
          'M 468 175 C 335 175 330 175 240 175',
          'M 468 300 C 300 300 325 175 240 175'
        ][index]
      }
      fill="none"
      stroke="var(--lc-accent)"
      strokeWidth="3"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="0.14 0.86"
      style={{ strokeDashoffset: offset, filter: 'drop-shadow(0 0 7px var(--lc-accent))' }}
    />
  );
}
export interface BeamPathProps {
  title?: string;
  labels?: string[];
  children?: ReactNode;
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

export default function BeamPath({
  title = 'All paths connect.',
  labels = ['Ideas', 'Design', 'Motion', 'Build', 'Share', 'Ship'],
  children = 'Bring your own workflow.',
  paused = false,
  speed = 1,
  accent = '#54e7b0',
  surface = '#0d1917',
  ink = '#eefbf5',
  className = ''
}: BeamPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
  const { seconds, active } = useSceneClock(ref, paused || userPaused || rate === 0);
  const pulse = useTransform(seconds, (t) => 1 + Math.sin(t * rate * 2) * 0.1);
  return (
    <div
      ref={ref}
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      data-motion={active ? 'running' : 'paused'}
    >
      <svg data-part="svg" className={c.svg} viewBox="0 0 480 350" aria-hidden="true">
        {[
          'M 12 50 C 180 50 155 175 240 175',
          'M 12 175 H 240',
          'M 12 300 C 180 300 155 175 240 175',
          'M 468 50 C 300 50 325 175 240 175',
          'M 468 175 H 240',
          'M 468 300 C 300 300 325 175 240 175'
        ].map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="currentColor" opacity="0.18" />
            <Packet seconds={seconds} index={index} rate={rate} />
          </g>
        ))}
        <motion.circle
          cx="240"
          cy="175"
          r="48"
          fill="var(--lc-surface)"
          stroke="var(--lc-accent)"
          style={{ scale: pulse, transformOrigin: '240px 175px' }}
        />
      </svg>
      <div data-part="labels" className={c.labels}>
        {labels.slice(0, 6).map((label, index) => (
          <span
            key={index}
            data-part="endpoint"
            className={c.endpoint}
            style={{
              top: [12, 48, 84, 12, 48, 84][index] + '%',
              left: index < 3 ? '3%' : undefined,
              right: index >= 3 ? '3%' : undefined
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div data-part="hub" className={c.hub} aria-hidden="true">
        ✳
      </div>
      <div data-part="content" className={c.content}>
        <h3 data-part="title" className={c.title}>
          {title}
        </h3>
        <div data-part="copy" className={c.copy}>
          {children}
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
