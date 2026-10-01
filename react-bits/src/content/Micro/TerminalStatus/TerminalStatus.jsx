'use client';
import { useRef, useSyncExternalStore } from 'react';
import { motion, useInView } from 'motion/react';
import './TerminalStatus.css';
const c = {
  root: 'lc-terminal-status-root',
  window: 'lc-terminal-status-window',
  line: 'lc-terminal-status-line',
  prompt: 'lc-terminal-status-prompt',
  state: 'lc-terminal-status-state',
  led: 'lc-terminal-status-led',
  detail: 'lc-terminal-status-detail',
  rule: 'lc-terminal-status-rule'
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
export default function TerminalStatus({
  status = 'idle',
  label = 'BUILD PIPELINE',
  detail = 'Awaiting your next move.',
  accent = '#80e0a2',
  surface = '#10241a',
  ink = '#b3e8c5',
  className = ''
}) {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const near = useInView(ref);
  const color = status === 'error' ? '#ff9c86' : accent;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink }}
      ref={ref}
    >
      <div className={c.window}>
        <span aria-hidden="true">● ● ●</span>
        <span>STATUS / STDOUT</span>
      </div>
      <div className={c.line}>
        <span className={c.prompt} aria-hidden="true">
          $
        </span>
        <span>{label}</span>
      </div>
      <div className={c.state} role="status">
        <motion.span
          aria-hidden="true"
          className={c.led}
          style={{ background: color }}
          animate={{ opacity: status === 'running' && !reduce && near ? [0.3, 1, 0.3] : 1 }}
          transition={status === 'running' && !reduce && near ? { duration: 1.2, repeat: Infinity } : { duration: 0 }}
        />
        <strong style={{ color }}>{status.toUpperCase()}</strong>
      </div>
      <p className={c.detail}>{detail}</p>
      <div className={c.rule} aria-hidden="true">
        ────────────────────
      </div>
    </div>
  );
}
