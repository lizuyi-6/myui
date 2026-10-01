// Authoring source for the four synchronized copyable variants.
export const p = (name, type, initial, description) => ({ name, type, initial, description });
export const colors = (accent, surface, ink) => [
  p('accent', 'string', JSON.stringify(accent), 'Accent color; independent of the host theme.'),
  p('surface', 'string', JSON.stringify(surface), 'Component surface color.'),
  p('ink', 'string', JSON.stringify(ink), 'Primary text color.'),
  p('className', 'string', "''", 'Optional class on the component root.')
];
export const rootStyle = `style={{ '--lc-accent': accent, '--lc-surface': surface, '--lc-ink': ink } as CSSProperties}`;
export const rootClass = `className={[c.root, className].filter(Boolean).join(' ')}`;
export const base = 'box-sizing:border-box;min-width:0;max-width:100%;color:var(--lc-ink);font-family:inherit;';
export const button = 'box-sizing:border-box;min-height:44px;font-family:inherit;cursor:pointer;color:var(--lc-ink);';
export const focus = 'outline:2px solid var(--lc-accent);outline-offset:4px;';
export const liveMotion = `
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
`;
