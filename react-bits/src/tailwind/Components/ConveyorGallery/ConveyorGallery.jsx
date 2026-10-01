'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import { motion, useInView, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [position:relative] [width:min(100%,500px)] [padding-bottom:70px] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#e6a75b44] [border-right-width:1px] [border-right-style:solid] [border-right-color:#e6a75b44] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#e6a75b44] [border-left-width:1px] [border-left-style:solid] [border-left-color:#e6a75b44] [border-radius:12px] [overflow:hidden]',
  frame:
    '[position:relative] [height:265px] [overflow:hidden] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#e6a75b44]',
  strip:
    '[position:absolute] [display:flex] [gap:12px] [left:-55px] [top:38px] [transform-origin:0_50%] [padding:20px_8px] [background:repeating-linear-gradient(90deg,#20201e_0px,#20201e_6px,#dedac0_6px,#dedac0_12px,#20201e_12px,#20201e_24px)]',
  card: '[position:relative] [flex:0_0_160px] [height:180px] [padding:14px] [box-sizing:border-box] [border-top-width:5px] [border-top-style:solid] [border-top-color:#20201e] [border-right-width:5px] [border-right-style:solid] [border-right-color:#20201e] [border-bottom-width:5px] [border-bottom-style:solid] [border-bottom-color:#20201e] [border-left-width:5px] [border-left-style:solid] [border-left-color:#20201e] [color:#20201e] [display:flex] [flex-direction:column] [justify-content:space-between]',
  art: '[display:grid] [place-items:center] [flex:1] [overflow:hidden] [font:64px_Georgia,serif]',
  caption: '[font:8px_monospace] [letter-spacing:1px]',
  footer: '[display:flex] [gap:24px] [padding:24px]',
  label: '[font:10px_monospace] [line-height:1.7] [color:var(--lc-accent)]',
  list: '[display:flex] [flex-wrap:wrap] [gap:3px] [flex:1]',
  item: '[box-sizing:border-box] [min-height:44px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [padding:8px] [border-top-width:0] [border-top-style:undefined] [border-top-color:] [border-right-width:0] [border-right-style:undefined] [border-right-color:] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#e6a75b44] [border-left-width:0] [border-left-style:undefined] [border-left-color:] [background:transparent] [font:10px_monospace] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
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
export default function ConveyorGallery({
  items,
  onSelect,
  paused = false,
  speed = 1,
  accent = '#e6a75b',
  surface = '#20201e',
  ink = '#fff3de',
  className = ''
}) {
  const ref = useRef(null);
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
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
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
