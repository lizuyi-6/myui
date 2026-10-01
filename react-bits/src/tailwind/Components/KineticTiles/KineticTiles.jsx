'use client';
import { useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [width:min(100%,440px)] [padding:24px] [background:var(--lc-surface)] [border-top-width:2px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:2px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:2px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [box-shadow:7px_7px_0_var(--lc-ink)]',
  heading:
    '[display:flex] [justify-content:space-between] [margin-bottom:30px] [font-size:21px] [line-height:1] [letter-spacing:-1px] [font-weight:900]',
  arrow: '[font-size:40px]',
  grid: '[display:grid] [grid-template-columns:repeat(3,minmax(0,1fr))] [gap:10px] [perspective:600px]',
  tile: '[box-sizing:border-box] [min-height:102px] [font-family:inherit] [cursor:pointer] [color:var(--lc-ink)] [position:relative] [display:flex] [flex-direction:column] [justify-content:space-between] [align-items:flex-start] [min-width:0] [padding:12px] [border-top-width:2px] [border-top-style:solid] [border-top-color:var(--lc-ink)] [border-right-width:2px] [border-right-style:solid] [border-right-color:var(--lc-ink)] [border-bottom-width:2px] [border-bottom-style:solid] [border-bottom-color:var(--lc-ink)] [border-left-width:2px] [border-left-style:solid] [border-left-color:var(--lc-ink)] [border-radius:0] [box-shadow:3px_3px_0_var(--lc-ink)] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px]',
  symbol: '[font-size:29px] [line-height:1]',
  label: '[font:9px_monospace] [text-transform:uppercase] [letter-spacing:1px] [overflow-wrap:anywhere]',
  empty: '[grid-column:1/-1] [font-size:13px]'
};
function Tile({ item, index, px, py, reduce, strength, onSelect }) {
  const [focused, setFocused] = useState(false);
  const displacement = useTransform(() => {
    if (reduce) return 0;
    const dx = (index % 3) + 0.5 - px.get();
    const dy = Math.floor(index / 3) + 0.5 - py.get();
    return Math.max(0, 1 - Math.hypot(dx, dy) / 1.8) * strength;
  });
  const lift = useSpring(displacement, { stiffness: 220, damping: 16 });
  const y = useTransform(lift, (t) => -t);
  const rotate = useTransform(lift, (t) => t * (index % 2 ? 0.35 : -0.35));
  const scale = useTransform(lift, (t) => 1 + t / 180);
  return (
    <motion.button
      type="button"
      data-part="tile"
      className={c.tile}
      aria-label={item.label}
      style={{
        y: focused && !reduce ? -22 : y,
        rotate: focused && !reduce ? 8 : rotate,
        scale,
        background: item.color ?? 'var(--lc-accent)'
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={onSelect}
    >
      <span data-part="symbol" className={c.symbol} aria-hidden="true">
        {item.symbol}
      </span>
      <span data-part="label" className={c.label}>
        {item.label}
      </span>
    </motion.button>
  );
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
export default function KineticTiles({
  items,
  onSelect,
  strength = 28,
  accent = '#edff7a',
  surface = '#f3f0e8',
  ink = '#151515',
  className = ''
}) {
  const reduce = useMotionPreference();
  const px = useMotionValue(-100);
  const py = useMotionValue(-100);
  const amount = Number.isFinite(strength) ? Math.max(0, strength) : 28;
  const move = (event) => {
    if (event.pointerType === 'touch' || reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - box.left) / box.width) * 3);
    py.set(((event.clientY - box.top) / box.height) * Math.ceil(items.length / 3));
  };
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
    >
      <div data-part="heading" className={c.heading}>
        <span>
          MAKE A LITTLE
          <br />
          COMMOTION.
        </span>
        <span data-part="arrow" className={c.arrow} aria-hidden="true">
          ↙
        </span>
      </div>
      <div
        data-part="grid"
        className={c.grid}
        onPointerMove={move}
        onPointerLeave={() => {
          px.set(-100);
          py.set(-100);
        }}
      >
        {items.length ? (
          items.map((item, index) => (
            <Tile
              key={item.id}
              item={item}
              index={index}
              px={px}
              py={py}
              reduce={reduce}
              strength={amount}
              onSelect={() => onSelect?.(item)}
            />
          ))
        ) : (
          <p data-part="empty" className={c.empty}>
            No tiles yet.
          </p>
        )}
      </div>
    </div>
  );
}
