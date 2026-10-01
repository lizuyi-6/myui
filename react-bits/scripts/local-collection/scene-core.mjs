import { p, button, focus } from './core.mjs';

// Inlined into each scene: copied components never import this authoring module.
export const clock = `
const visibleSnapshot = () => typeof document === 'undefined' || document.visibilityState !== 'hidden';
const visibleSubscribe = (listener: () => void) => {
  document.addEventListener('visibilitychange', listener);
  return () => document.removeEventListener('visibilitychange', listener);
};
function useSceneClock(ref: RefObject<HTMLDivElement | null>, paused: boolean) {
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
`;
export const playbackProps = [
  p('paused', 'boolean', 'false', 'Externally pause decorative motion; the built-in pause control also remains available.'),
  p('speed', 'number', '1', 'Motion multiplier. Non-finite values fall back to 1; 0 freezes the scene.')
];
export const playbackSetup = `const ref = useRef<HTMLDivElement>(null); const [userPaused, setUserPaused] = useState(false); const rate = Number.isFinite(speed) ? Math.max(0, speed) : 1; const {seconds, active, reduce} = useSceneClock(ref, paused || userPaused || rate === 0);`;
export const playbackButton = `<button type="button" className={c.pause} aria-label={userPaused ? 'Resume animation' : 'Pause animation'} aria-pressed={userPaused} onClick={() => setUserPaused(value => !value)}>{userPaused ? '▶' : 'Ⅱ'}</button>`;
export const playbackCss = {
  pause: button + 'position:absolute;right:14px;bottom:14px;z-index:10;width:44px;border:1px solid currentColor;border-radius:50%;background:var(--lc-surface);font-size:13px;',
  'pause:focus-visible': focus
};
