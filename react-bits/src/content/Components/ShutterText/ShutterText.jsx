'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useAnimationFrame } from 'motion/react';
import './ShutterText.css';
const c = {
  root: 'lc-shutter-text-root',
  eyebrow: 'lc-shutter-text-eyebrow',
  word: 'lc-shutter-text-word',
  slice: 'lc-shutter-text-slice',
  letter: 'lc-shutter-text-letter',
  controls: 'lc-shutter-text-controls',
  option: 'lc-shutter-text-option',
  pause: 'lc-shutter-text-pause'
};
const visibleSnapshot = () => typeof document === 'undefined' || document.visibilityState !== 'hidden';
const visibleSubscribe = (listener) => {
  document.addEventListener('visibilitychange', listener);
  return () => document.removeEventListener('visibilitychange', listener);
};
function useSceneClock(ref, paused) {
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
export default function ShutterText({
  words = ['MOVE.', 'PLAY.', 'MAKE.'],
  interval = 3,
  onChange,
  paused = false,
  speed = 1,
  accent = '#f4ff76',
  surface = '#272846',
  ink = '#f8f6ee',
  className = ''
}) {
  const ref = useRef(null);
  const [userPaused, setUserPaused] = useState(false);
  const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1;
  const { seconds, active, reduce } = useSceneClock(ref, paused || userPaused || rate === 0);
  const [index, setIndex] = useState(0);
  const lastStep = useRef(0);
  const duration = Number.isFinite(interval) ? Math.max(1, interval) : 3;
  useAnimationFrame(() => {
    if (!active || words.length < 2) return;
    const step = Math.floor((seconds.get() * rate) / duration);
    if (step !== lastStep.current) {
      lastStep.current = step;
      setIndex((value) => (value + 1) % words.length);
    }
  });
  const current = words[Math.min(index, Math.max(0, words.length - 1))] ?? '…';
  const select = (i) => {
    setIndex(i);
    lastStep.current = Math.floor((seconds.get() * rate) / duration);
    onChange?.(words[i]);
  };
  return (
    <div
      ref={ref}
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      data-motion={active ? 'running' : 'paused'}
    >
      <span data-part="eyebrow" className={c.eyebrow}>
        WORDS IN MOTION / 04 SLICES
      </span>
      <div data-part="word" className={c.word} role="img" aria-label={current}>
        {Array.from({ length: 4 }, (_, row) => (
          <div key={row} data-part="slice" className={c.slice} aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                data-part="letter"
                className={c.letter}
                style={{ top: -row * 38 }}
                initial={{ rotateX: reduce ? 0 : row % 2 ? 90 : -90, y: reduce ? 0 : 35, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                exit={{ rotateX: reduce ? 0 : row % 2 ? -90 : 90, y: reduce ? 0 : -35, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : row * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div data-part="controls" className={c.controls}>
        {words.map((word, i) => (
          <button
            data-part="option"
            className={c.option}
            key={i}
            type="button"
            aria-pressed={current === word}
            onClick={() => select(i)}
          >
            {word}
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
