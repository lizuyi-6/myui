import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function RippleButton({ children, onClick, disabled = false, className = '', ...props }) {
  const reduce = usePrefersReducedMotion();
  const nextId = useRef(0);
  const [ripples, setRipples] = useState([]);
  const click = event => {
    if (!reduce) {
      const rect = event.currentTarget.getBoundingClientRect();
      const diameter = Math.hypot(rect.width, rect.height) * 2;
      const ripple = { id: nextId.current++, size: diameter,
        x: event.detail === 0 ? rect.width / 2 : event.clientX - rect.left,
        y: event.detail === 0 ? rect.height / 2 : event.clientY - rect.top };
      setRipples(previous => [...previous.slice(-5), ripple]);
    }
    onClick?.(event);
  };
  return (
    <motion.button {...props} type="button" disabled={disabled} onClick={click}
      whileHover={reduce || disabled ? undefined : { y: -3 }} whileTap={reduce || disabled ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={`relative isolate min-h-12 overflow-hidden rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] px-7 py-3 font-semibold text-[var(--ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {ripples.map(ripple => <motion.span key={ripple.id} aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-full bg-[var(--accent-hover)]"
        style={{ left: ripple.x - ripple.size / 2, top: ripple.y - ripple.size / 2, width: ripple.size, height: ripple.size }}
        initial={{ scale: 0, opacity: 1 }} animate={{ scale: 1, opacity: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }}
        onAnimationComplete={() => setRipples(previous => previous.filter(item => item.id !== ripple.id))} />)}
      {children}
    </motion.button>
  );
}
