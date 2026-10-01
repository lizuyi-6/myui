import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Menu, X, Pause, Play, ArrowUpRight } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { SiteProvider, useSite } from './context';
import { Brand } from './ui';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/Detail';
import Styles from './pages/Styles';
import Docs from './pages/Docs';
import About from './pages/About';
import NotFound from './pages/NotFound';

const nav = [['/components','组件库'], ['/styles','风格灵感'], ['/docs','使用指南'], ['/about','关于 PULSAR']];
function Shell() {
  const { pathname } = useLocation();
  const { paused, setPaused, quiet, reduce } = useSite();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const heading = document.querySelector('main h1');
    heading?.focus({ preventScroll: true });
    document.title = `${heading?.textContent ?? '让界面有点意思'} | PULSAR`;
  }, [pathname]);
  useEffect(() => {
    const handle = event => { if (event.key === 'Escape' && menu) { setMenu(false); document.querySelector('.menu-toggle')?.focus(); } };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [menu]);
  return <MotionConfig reducedMotion={quiet ? 'always' : 'user'}><div className={`site ${quiet ? 'quiet-motion' : ''}`}>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header"><div className="header-inner"><Brand /><nav aria-label="主要导航" className="desktop-nav">{nav.map(([to,label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav><div className="header-actions"><button className="motion-switch" type="button" aria-label={paused ? '恢复动效' : '暂停动效'} aria-pressed={paused} onClick={() => setPaused(v => !v)} title={reduce ? '系统已启用减少动态' : '控制动态效果'}>{quiet ? <Play size={16} /> : <Pause size={16} />}</button><Link className="header-cta" to="/components">开始探索<ArrowUpRight size={15} /></Link><button className="menu-toggle" aria-label={menu ? '关闭导航' : '打开导航'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(v => !v)}>{menu ? <X /> : <Menu />}</button></div></div>
      {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航">{nav.map(([to,label]) => <NavLink key={to} to={to}>{label}<ArrowUpRight size={18} /></NavLink>)}</nav>}
    </header>
    <main id="main"><Routes><Route path="/" element={<Home />} /><Route path="/components" element={<Catalog />} /><Route path="/components/:id" element={<Detail />} /><Route path="/styles" element={<Styles />} /><Route path="/docs" element={<Docs />} /><Route path="/docs/:section" element={<Docs />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <footer className="site-footer"><div className="footer-top"><div><Brand footer /><p>让好想法，拥有好界面。</p></div><div className="footer-links"><div><span>探索</span><Link to="/components">组件库</Link><Link to="/styles">风格灵感</Link></div><div><span>构建</span><Link to="/docs">开始使用</Link><Link to="/docs/ai">交给 AI</Link></div><div><span>关于</span><Link to="/about">我们的想法</Link><Link to="/docs/sources">来源说明</Link></div></div></div><div className="footer-bottom"><span>© 2026 PULSAR · MADE TO FEEL DIFFERENT.</span><span><span className="status-dot" />好界面，从一个细节开始。</span></div></footer>
  </div></MotionConfig>;
}
export default function App() { return <SiteProvider><Shell /></SiteProvider>; }
