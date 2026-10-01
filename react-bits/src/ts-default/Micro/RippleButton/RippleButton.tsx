'use client';
import { useState, useRef, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode, MouseEvent } from 'react';
import { motion } from 'motion/react';
import './RippleButton.css';
const c = { root: 'lc-ripple-button-root', ripple: 'lc-ripple-button-ripple', content: 'lc-ripple-button-content' };

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
