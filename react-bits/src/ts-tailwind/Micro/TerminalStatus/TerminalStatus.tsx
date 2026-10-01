'use client';
import { useRef, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion, useInView } from 'motion/react';

const c = {
  root: '[box-sizing:border-box] [min-width:0] [max-width:100%] [color:var(--lc-ink)] [font-family:monospace] [width:min(100%,340px)] [padding:20px] [background:var(--lc-surface)] [border-top-width:1px] [border-top-style:solid] [border-top-color:#3d6850] [border-right-width:1px] [border-right-style:solid] [border-right-color:#3d6850] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#3d6850] [border-left-width:1px] [border-left-style:solid] [border-left-color:#3d6850] [border-radius:6px] [box-shadow:inset_0_0_32px_#00000045]',
  window:
    '[display:flex] [justify-content:space-between] [gap:12px] [margin-bottom:24px] [padding-bottom:12px] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:#3d6850] [font-size:9px] [color:#668e74] [letter-spacing:1px]',
  line: '[display:flex] [gap:10px] [font-size:11px] [letter-spacing:1px]',
  prompt: '[color:var(--lc-accent)]',
  state: '[display:flex] [align-items:center] [gap:10px] [margin-top:16px] [font-size:20px] [letter-spacing:2px]',
  led: '[display:block] [width:8px] [height:8px] [box-shadow:0_0_10px_var(--lc-accent)]',
  detail: '[margin:14px_0_0] [font-size:12px] [line-height:1.7]',
  rule: '[margin-top:16px] [overflow:hidden] [color:#3d6850] [white-space:nowrap]'
};

export interface TerminalStatusProps {
  status?: 'idle' | 'running' | 'success' | 'error';
  label?: string;
  detail?: string;
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

export default function TerminalStatus({
  status = 'idle',
  label = 'BUILD PIPELINE',
  detail = 'Awaiting your next move.',
  accent = '#80e0a2',
  surface = '#10241a',
  ink = '#b3e8c5',
  className = ''
}: TerminalStatusProps) {
  const reduce = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref);
  const color = status === 'error' ? '#ff9c86' : accent;
  return (
    <div
      className={[c.root, className].filter(Boolean).join(' ')}
      style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}
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
