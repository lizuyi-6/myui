'use client';
import { useState, useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,360px)]',
  perspective: '[perspective:1000px]',
  card: '[display:grid] [transform-style:preserve-3d]',
  front:
    '[grid-area:1/1] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [gap:18px] [min-height:220px] [padding:28px] [border-top-width:8px] [border-top-style:solid] [border-top-color:var(--lc-surface)] [border-right-width:8px] [border-right-style:solid] [border-right-color:var(--lc-surface)] [border-bottom-width:8px] [border-bottom-style:solid] [border-bottom-color:var(--lc-surface)] [border-left-width:8px] [border-left-style:solid] [border-left-color:var(--lc-surface)] [outline:1px_solid_#b79f84] [background:linear-gradient(145deg,var(--lc-surface),#f5d9a6)] [backface-visibility:hidden] [text-align:center]',
  small: '[font-size:10px] [letter-spacing:2px]',
  sun: '[font-size:64px] [line-height:1] [color:var(--lc-accent)]',
  title: '[font-size:25px] [font-family:Georgia,serif] [font-style:italic]',
  back: '[position:relative] [grid-area:1/1] [min-height:220px] [padding:40px_24px] [box-sizing:border-box] [outline:1px_solid_#b79f84] [background:var(--lc-surface)] [backface-visibility:hidden] [transform:rotateY(180deg)]',
  stamp:
    '[position:absolute] [top:12px] [right:12px] [border-top-width:2px] [border-top-style:dotted] [border-top-color:var(--lc-accent)] [border-right-width:2px] [border-right-style:dotted] [border-right-color:var(--lc-accent)] [border-bottom-width:2px] [border-bottom-style:dotted] [border-bottom-color:var(--lc-accent)] [border-left-width:2px] [border-left-style:dotted] [border-left-color:var(--lc-accent)] [padding:6px] [font:9px_monospace] [text-align:center] [color:var(--lc-accent)]',
  message: '[margin:28px_0_18px] [max-width:80%] [font:italic_20px/1.6_Georgia,serif]',
  signature:
    '[border-top-width:1px] [border-top-style:solid] [border-top-color:#b79f84] [padding-top:12px] [font-size:12px]',
  button:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:block] [margin:18px_auto_0] [padding:8px_16px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [border-radius:8px] [background:transparent] [font-size:13px] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
