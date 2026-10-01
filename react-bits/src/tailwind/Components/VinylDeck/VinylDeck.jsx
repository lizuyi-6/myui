'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, useInView } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,320px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#a79c8d] [border-right-width:1px] [border-right-style:solid] [border-right-color:#a79c8d] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#a79c8d] [border-left-width:1px] [border-left-style:solid] [border-left-color:#a79c8d] [border-radius:12px] [box-shadow:0_8px_0_#afa18f]',
  title:
    '[display:flex] [flex-direction:column] [gap:5px] [margin-bottom:20px] [font-size:17px] [font-family:Georgia,serif]',
  platter: '[position:relative] [padding:12px_20px_12px_0]',
  record:
    '[display:flex] [align-items:center] [justify-content:center] [width:220px] [max-width:100%] [aspect-ratio:1] [border-radius:50%] [background:repeating-radial-gradient(circle,#111111_0px,#111111_2px,#292929_3px,#111111_4px)] [box-shadow:3px_8px_14px_#00000035]',
  recordlabel:
    '[position:relative] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [gap:6px] [width:78px] [height:78px] [border-radius:50%] [background:var(--lc-accent)] [font:10px_monospace] [color:#211b14]',
  hole: '[width:8px] [height:8px] [background:#26211a] [border-radius:50%]',
  arm: '[position:absolute] [right:18px] [top:0] [width:8px] [height:155px] [background:linear-gradient(90deg,#988d7f,#f0ece3,#9c9183)] [border-radius:6px] [transform-origin:top] [transform:rotate(-12deg)] [box-shadow:2px_3px_4px_#00000030]',
  head: '[position:absolute] [bottom:-8px] [left:-7px] [width:22px] [height:34px] [background:#4b443b] [border-radius:4px]',
  control:
    '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [display:flex] [justify-content:space-between] [align-items:center] [width:100%] [margin-top:20px] [padding:8px_0] [border-top-width:1px] [border-top-style:solid] [border-top-color:#afa393] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:0] [border-bottom-style:undefined] [border-bottom-color:] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font:12px_monospace] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]'
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
export default function VinylDeck({
  title = 'Slow Sunday',
  artist = 'Side A / Studio Sessions',
  spinning,
  defaultSpinning = false,
  onChange,
  rpm = 33,
  accent = '#e67846',
  surface = '#e6dfd3',
  ink = '#302a24',
  className = ''
}) {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const near = useInView(ref);
  const [inner, setInner] = useState(defaultSpinning);
  const on = spinning ?? inner;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      ref={ref}
    >
      <div className={c.title}>
        <strong>{title}</strong>
        <span>{artist}</span>
      </div>
      <div className={c.platter}>
        <motion.div
          className={c.record}
          aria-hidden="true"
          animate={{ rotate: on && !reduce && near ? 360 : 0 }}
          transition={
            on && !reduce && near
              ? { duration: 60 / Math.max(1, rpm), repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
        >
          <span className={c.recordlabel}>
            <span>SIDE A</span>
            <strong>LP / 33</strong>
            <i className={c.hole} />
          </span>
        </motion.div>
        <motion.div
          aria-hidden="true"
          className={c.arm}
          animate={{ rotate: on ? 20 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 18 }}
        >
          <span className={c.head} />
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={on}
        className={c.control}
        onClick={() => {
          if (spinning === undefined) setInner(!on);
          onChange?.(!on);
        }}
      >
        {on ? 'Stop rotation' : 'Spin the record'}
        <span aria-hidden="true">{on ? 'Ⅱ' : '▶'}</span>
      </button>
    </div>
  );
}
