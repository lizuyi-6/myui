import { Link, useNavigate } from 'react-router-dom';
import { MoveUpRight, Layers, Code2, MousePointer2 } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '../vendor/3d-card';
import { PointerHighlight } from '../vendor/pointer-highlight';
import { BentoGrid, BentoGridItem } from '../vendor/bento-grid';
import RotatingText from '../vendor/RotatingText';
import LiquidAction from '../vendor/LiquidAction';
import ConveyorGallery from '../vendor/ConveyorGallery';
import SpringAccordion from '../vendor/SpringAccordion';
import { Action, Closing, Eyebrow, SectionHead, TextLink } from '../ui';
import { Demo } from '../Demo';
import { useSite } from '../context';
import catalog from '../data/catalog.json';

const faq = [
  { id: 'start', title: '从哪里开始？', content: <>先在<Link to="/components">组件库</Link>找到你喜欢的效果，进入详情试玩，再打开源码。使用指南会带你把它放进自己的项目。</> },
  { id: 'adapt', title: '可以改成自己的风格吗？', content: '可以通过组件参数接入颜色、内容和回调，再按产品需求调整尺寸与细节。取用时保留来源，并遵循原项目的使用说明。' },
  { id: 'ai', title: '怎么让 AI 使用这些组件？', content: <>把组件详情里的“交给 AI”说明复制给它。说明包含来源、文件、依赖和取用顺序；更多做法见<Link to="/docs/ai">AI 使用指南</Link>。</> },
  { id: 'origins', title: '这些组件都来自哪里？', content: <>这里汇集 React Bits、Aceternity UI 和 28 个本地原创组件。每个详情都保留来源入口，使用时按原项目说明处理归属与条款。<Link to="/docs/sources">查看来源说明</Link>。</> }
];
function HeroArt() {
  const { quiet } = useSite();
  const navigate = useNavigate();
  return <div className="hero-art"><div className="art-back-card" aria-hidden="true"><span>LESS TEMPLATE.<br />MORE YOU.</span></div><CardContainer containerClassName="hero-art-wrap" className="hero-art-inner"><CardBody className="hero-card">
    <CardItem translateZ={30} className="art-topline" data-layer><span>INTERACTION SPECIMEN</span><span>01 — 361</span></CardItem>
    <CardItem translateZ={65} className="art-word" data-layer><RotatingText texts={['FEEL.','PLAY.','BUILD.']} auto={!quiet} rotationInterval={2800} staggerDuration={0.04} mainClassName="art-rotating" /></CardItem>
    <CardItem translateZ={95} rotateZ={12} className="art-sculpture" data-layer><span className="sculpture-ring ring-a" /><span className="sculpture-ring ring-b" /><span className="sculpture-star">✳</span><span className="sculpture-orb" /></CardItem>
    <CardItem translateZ={50} className="art-bottomline" data-layer><span>GOOD UI.<br />GREAT FEEL.</span><span>MOVE CLOSER <MousePointer2 size={14} /></span></CardItem>
    <CardItem translateZ={110} rotateZ={-8} className="art-liquid" data-layer><LiquidAction label="MAKE IT MOVE" accent="#f37047" surface="#f5efd8" ink="#263d32" paused={quiet} onClick={() => navigate('/styles')} /></CardItem>
  </CardBody></CardContainer><span className="art-note"><MousePointer2 size={15} /> 移动指针，感受层次</span></div>;
}
export default function Home() {
  const { quiet } = useSite();
  const navigate = useNavigate();
  return <>
    <section className="home-hero container"><div className="hero-copy"><Eyebrow>一套有个性的动态组件集合</Eyebrow><h1 tabIndex={-1}>让界面，<br /><PointerHighlight rectangleClassName="hero-pointer-box" pointerClassName="hero-pointer" containerClassName="hero-highlight"><span className="orange-text">有点意思。</span></PointerHighlight></h1><p className="hero-description">把动态、触感和想象，放进你的下一件作品。<br />挑一个喜欢的组件，接下来，让它成为你的。</p><div className="hero-actions"><Action to="/components">探索组件库</Action><TextLink to="/docs">从这里开始</TextLink></div><div className="hero-footnote"><span>React</span><i /> <span>Motion</span><i /> <span>你的创意</span><span className="hero-footnote-arrow">↗</span></div></div><HeroArt /></section>
    <div className="library-strip container"><span className="strip-intro">一个灵感库，<br />很多种可能。</span><div><strong>{catalog.totals.entries}<small>项</small></strong><span>组件 / 区块 / Hook</span></div><div><strong>{catalog.totals.local}<small>款</small></strong><span>本地原创组件</span></div><div><strong>04<small>种</small></strong><span>React Bits 源码版本</span></div><span className="strip-note">从已有的好设计，<br />走向你自己的表达。<MoveUpRight size={25} /></span></div>
    <section className="section container"><SectionHead eyebrow="BUILT TO BE FELT" title={<>不止好看。<br />还要让人想碰一下。</>} description="切换、按压、靠近。每一个动作，都值得有一点回应。" to="/components?source=local" link="试玩原创组件" /><div className="featured-stage"><div className="stage-copy"><span className="index-label">01 / PRISM DECK</span><h3>换一个想法，<br />换一种视角。</h3><p>标签不只改变文字。让整组内容换位，给切换一点空间感。</p><TextLink to="/components/react-bits-prism-deck">探索这个组件</TextLink><div className="stage-chips"><span>立体卡组</span><span>弹簧过渡</span><span>键盘切换</span></div></div><div className="stage-demo"><Demo name="PrismDeck" theme="mint" /></div></div></section>
    <section className="style-section"><div className="container"><SectionHead eyebrow="MANY MOODS. ONE LIBRARY." title="风格，没必要只有一种。" description="温暖一点，大胆一点，或是换个维度。找到适合你的那一种。" to="/styles" link="打开风格实验室" /><ConveyorGallery className="home-conveyor" paused={quiet} speed={0.75} accent="#cbe6bd" surface="#f0eddf" ink="#263d32" items={[{ id:'warm', title:'暖色编辑', color:'#f3ab83', content:<span className="frame-type">Aa<br /><small>EDITORIAL</small></span> },{ id:'mint', title:'薄荷产品', color:'#b6d9c1', content:<span className="frame-shape">✳</span> },{ id:'play', title:'几何游乐', color:'#f2cf63', content:<span className="frame-shape">◉</span> },{ id:'night', title:'深夜实验', color:'#263d32', content:<span className="frame-night">↗</span> }]} onSelect={item => navigate(`/styles?theme=${item.id}`)} /></div></section>
    <section className="section container"><SectionHead eyebrow="FROM IDEA TO INTERFACE" title="给你积木，也给你自由。" description="把时间留给设计判断，让已有组件承担那些重复的工作。" /><BentoGrid className="benefit-grid"><BentoGridItem className="benefit benefit-wide" header={<div className="benefit-code"><span><i />interface.tsx</span><pre><span className="code-muted">{'// 从一个好想法开始'}</span>{'\n'}{'<PrismDeck'}{'\n'}{'  items={yourIdeas}'}{'\n'}{'  accent="#8dddb5"'}{'\n'}{'/>'}</pre></div>} title="源码在手，风格由你。" description="选择语言与样式版本，复制、调整，然后放进自己的项目。" icon={<Code2 size={23} />} /><BentoGridItem className="benefit benefit-green" header={<div className="benefit-motif">✳<span>MAKE IT<br />YOUR OWN.</span></div>} title="让 AI 从这里取用。" description="给它具体组件和来源，让下一次生成从已有资产开始。" icon={<Layers size={23} />} /></BentoGrid><div className="benefit-bottom"><p>选组件 → 接入内容 → 调整风格 → 做成自己的作品</p><TextLink to="/docs/ai">和 AI 一起构建</TextLink></div></section>
    <section className="faq-section container"><div><Eyebrow>A FEW GOOD QUESTIONS</Eyebrow><h2>开始之前，<br />你可能想知道。</h2><p>不需要把一切想清楚。<br />先找到一个想用的组件。</p></div><SpringAccordion items={faq} accent="#f37047" surface="#f7f6f0" ink="#263d32" className="site-faq" /></section>
    <div className="container"><Closing /></div>
  </>;
}
