import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { themes, Demo } from '../Demo';
import { useSite } from '../context';
import { Closing, PageHead, TextLink } from '../ui';

export default function Styles() {
  const { theme, setTheme } = useSite();
  const [params, setParams] = useSearchParams();
  useEffect(() => { const value = params.get('theme'); if (themes[value]) setTheme(value); }, [params, setTheme]);
  const colors = themes[theme];
  return <div className="container styles-page"><PageHead eyebrow="THE STYLE LAB" title={<>同一个组件，<br />很多种表情。</>} description="选一个色调，碰一下组件。看看你的想法，会是什么样子。" /><div className="theme-picker" aria-label="选择风格">{Object.entries(themes).map(([id,c]) => <button key={id} aria-pressed={theme === id} onClick={() => { setTheme(id); setParams({theme:id}); }}><span className="theme-dot" style={{background:c.accent,borderColor:c.ink}} /><span>{c.name}<small>{c.subtitle}</small></span><span className="theme-check">{theme === id ? '↗' : '○'}</span></button>)}</div><div className="lab-sheet" style={{'--lab-surface':colors.surface,'--lab-ink':colors.ink,'--lab-accent':colors.accent,'--lab-wash':colors.wash}}><div className="lab-topline"><span>LIVE SPECIMENS / {colors.name}</span><span>TOUCH. CLICK. EXPLORE.</span></div><div className="lab-layout"><article className="lab-main"><span className="specimen-label">01 · LAYERS</span><Demo name="PrismDeck" theme={theme} /><TextLink to="/components/react-bits-prism-deck">Prism Deck</TextLink></article><article className="lab-note"><span className="specimen-label">02 · A SMALL THOUGHT</span><Demo name="PaperNote" theme={theme} /><p>写下你的想法，切换风格也会保留。</p></article><article className="lab-action"><span className="specimen-label">03 · A LITTLE RESPONSE</span><Demo name={theme === 'play' ? 'ArcadeButton' : 'RippleButton'} theme={theme} /><span className="lab-caption">每一次点击，都有回应。<ArrowUpRight size={18} /></span></article></div></div><section className="styles-bottom"><div><span className="index-label">04 / MORE EXPRESSION</span><h2>给灵感一点空间。</h2><p>用指针靠近这些形状，<br />它们会用自己的节奏回应。</p><TextLink to="/components/react-bits-kinetic-tiles">探索 Kinetic Tiles</TextLink></div><Demo name="KineticTiles" theme={theme} /></section><Closing compact /></div>;
}
