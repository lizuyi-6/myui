'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useAnimationFrame } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,480px)] [padding:30px_20px_75px] [overflow:hidden] [background:var(--lc-surface)] [border-radius:6px]',
  eyebrow: '[font:9px_monospace] [letter-spacing:2px] [opacity:0.7]',
  word: '[margin:40px_0_28px] [height:152px] [color:var(--lc-accent)]',
  slice: '[position:relative] [height:38px] [perspective:450px] [overflow:hidden]',
  letter:
    '[position:absolute] [left:0] [right:0] [display:block] [height:152px] [line-height:152px] [font-size:clamp(54px,16vw,116px)] [font-weight:900] [letter-spacing:-5px] [white-space:nowrap] [text-align:center] [transform-origin:center]',
  controls: '[display:flex] [justify-content:center] [gap:8px] [flex-wrap:wrap]',
  option:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [padding:10px_14px] [background:transparent] [border-top-width:1px] [border-top-style:solid] [border-top-color:#f8f6ee30] [border-right-width:1px] [border-right-style:solid] [border-right-color:#f8f6ee30] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#f8f6ee30] [border-left-width:1px] [border-left-style:solid] [border-left-color:#f8f6ee30] [border-radius:24px] [font:10px_monospace] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] [&[aria-pressed="true"]]:[color:var(--lc-surface)] [&[aria-pressed="true"]]:[background:var(--lc-accent)]',
  pause:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:absolute] [right:14px] [bottom:14px] [z-index:10] [width:44px] [border-top-width:1px] [border-top-style:solid] [border-top-color:currentColor] [border-right-width:1px] [border-right-style:solid] [border-right-color:currentColor] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:currentColor] [border-left-width:1px] [border-left-style:solid] [border-left-color:currentColor] [border-radius:50%] [background:var(--lc-surface)] [font-size:13px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
