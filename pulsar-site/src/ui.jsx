import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import RippleButton from './vendor/RippleButton';

export function Brand({ footer = false }) { return <Link to="/" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="PULSAR 首页"><span className="brand-mark" aria-hidden="true">✳</span>PULSAR<span className="brand-period">UI</span></Link>; }
export function Action({ to, children, light = false, onClick, ariaLabel }) {
  const navigate = useNavigate();
  return <RippleButton className={`site-action ${light ? 'light-action' : ''}`} surface={light ? '#f8f7f1' : '#263d32'} ink={light ? '#263d32' : '#f8f7f1'} accent="#e3f59d" ariaLabel={ariaLabel} onClick={onClick ?? (() => navigate(to))}>{children}<ArrowUpRight size={17} /></RippleButton>;
}
export function TextLink({ to, children, className = '' }) { return <Link className={`text-link ${className}`} to={to}>{children}<ArrowRight size={17} /></Link>; }
export function Eyebrow({ children, number }) { return <div className="eyebrow">{number ? <span>{number} /</span> : <span className="status-dot" />} {children}</div>; }
export function SectionHead({ eyebrow, title, description, link, to }) { return <div className="section-head"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{description && <p>{description}</p>}</div>{to && <TextLink to={to}>{link}</TextLink>}</div>; }
export function PageHead({ eyebrow, title, description, children }) { return <div className="page-head"><Eyebrow>{eyebrow}</Eyebrow><h1 tabIndex={-1}>{title}</h1>{description && <p>{description}</p>}{children}</div>; }
export function Closing({ compact = false }) { return <section className={`closing ${compact ? 'closing-compact' : ''}`}><div className="closing-star" aria-hidden="true">✳</div><div><Eyebrow>MAKE SOMETHING YOURS</Eyebrow><h2>下一次，做点不一样的。</h2><p>从一个组件开始，把想象放进你的项目。</p></div><Action to="/components" light>探索组件库</Action></section>; }
export function EmptyIcon() { return <Sparkles size={42} strokeWidth={1.3} />; }
