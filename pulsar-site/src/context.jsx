import { createContext, useContext, useState, useSyncExternalStore } from 'react';
const Context = createContext(null);
const query = '(prefers-reduced-motion: reduce)';
const subscribe = listener => { const media = window.matchMedia(query); media.addEventListener('change', listener); return () => media.removeEventListener('change', listener); };
export function SiteProvider({ children }) {
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState('warm');
  const [note, setNote] = useState('让界面多一点想象。');
  const [clicks, setClicks] = useState(0);
  return <Context.Provider value={{ paused, setPaused, reduce, quiet: paused || reduce, theme, setTheme, note, setNote, clicks, setClicks }}>{children}</Context.Provider>;
}
export const useSite = () => useContext(Context);
