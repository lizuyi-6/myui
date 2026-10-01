'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, MouseEvent } from 'react';
import { motion } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:inherit] [min-height:44px] [cursor:pointer] [position:relative] [isolation:isolate] [overflow:hidden] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--lc-accent)] [border-right-width:1px] [border-right-style:solid] [border-right-color:var(--lc-accent)] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--lc-accent)] [border-left-width:1px] [border-left-style:solid] [border-left-color:var(--lc-accent)] [border-radius:18px] [background:var(--lc-surface)] [padding:16px_28px] [font-size:15px] [font-weight:700] [box-shadow:0_5px_0_color-mix(in_srgb,var(--lc-accent)_35%,transparent)] focus-visible:[outline:2px_solid_var(--lc-accent)] focus-visible:[outline-offset:4px] disabled:[cursor:not-allowed] disabled:[opacity:0.45]',
  ripple: '[position:absolute] [z-index:-1] [pointer-events:none] [border-radius:50%] [background:var(--lc-accent)]',
  content: '[position:relative]'
};

export interface RippleButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel?: string;
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

export default function RippleButton({
  children = 'Make a ripple',
  onClick,
  disabled = false,
  ariaLabel,
  accent = '#ef7848',
  surface = '#fff0e6',
  ink = '#64331e',
  className = ''
}: RippleButtonProps) {
  const reduce = useMotionPreference();
  const nextId = useRef(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const click = (event: MouseEvent<HTMLButtonElement>) => {
    if (!reduce) {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.hypot(rect.width, rect.height) * 2;
      const ripple = {
        id: nextId.current++,
        size,
        x: event.detail === 0 ? rect.width / 2 : event.clientX - rect.left,
        y: event.detail === 0 ? rect.height / 2 : event.clientY - rect.top
      };
      setRipples((previous) => [...previous.slice(-5), ripple]);
    }
    onClick?.(event);
  };
  return (
    <motion.button
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={click}
      whileHover={reduce || disabled ? undefined : { y: -3 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className={c.ripple}
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.65 }}
          onAnimationComplete={() => setRipples((previous) => previous.filter((item) => item.id !== ripple.id))}
        />
      ))}
      <span className={c.content}>{children}</span>
    </motion.button>
  );
}
