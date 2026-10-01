'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import './PostcardFlip.css';
const c = {
  root: 'lc-postcard-flip-root',
  perspective: 'lc-postcard-flip-perspective',
  card: 'lc-postcard-flip-card',
  front: 'lc-postcard-flip-front',
  small: 'lc-postcard-flip-small',
  sun: 'lc-postcard-flip-sun',
  title: 'lc-postcard-flip-title',
  back: 'lc-postcard-flip-back',
  stamp: 'lc-postcard-flip-stamp',
  message: 'lc-postcard-flip-message',
  signature: 'lc-postcard-flip-signature',
  button: 'lc-postcard-flip-button'
};
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
export default function PostcardFlip({
  title = 'Somewhere sunny',
  message = 'A little hello from the other side.',
  from = 'With love, Studio',
  flipped,
  defaultFlipped = false,
  onChange,
  accent = '#ce5739',
  surface = '#fff3dc',
  ink = '#574534',
  className = ''
}) {
  const id = useId();
  const reduce = useMotionPreference();
  const [inner, setInner] = useState(defaultFlipped);
  const reverse = flipped ?? inner;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div className={c.perspective}>
        <motion.div
          id={id}
          className={c.card}
          animate={{ rotateY: reverse ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 22 }}
        >
          <div aria-hidden={reverse} inert={reverse} className={c.front}>
            <span className={c.small}>A POSTCARD FOR YOU</span>
            <span aria-hidden="true" className={c.sun}>
              ✺
            </span>
            <strong className={c.title}>{title}</strong>
            <span className={c.small}>GOOD DAYS / SLOW WAYS</span>
          </div>
          <div aria-hidden={!reverse} inert={!reverse} className={c.back}>
            <span className={c.stamp} aria-hidden="true">
              AIR
              <br />
              MAIL
            </span>
            <p className={c.message}>{message}</p>
            <p className={c.signature}>{from}</p>
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        aria-controls={id}
        aria-pressed={reverse}
        className={c.button}
        onClick={() => {
          const next = !reverse;
          if (flipped === undefined) setInner(next);
          onChange?.(next);
        }}
      >
        {reverse ? 'See the cover' : 'Read the postcard'} ↻
      </button>
    </div>
  );
}
