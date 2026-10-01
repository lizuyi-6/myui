import { lazy, Suspense, useEffect, useState } from 'react';
import { useSite } from './context';
const names = ['DepthLiftCard','PrismDeck','ConveyorGallery','KineticTiles','LiquidAction','OrbitStage','BeamPath','ApertureReveal','ScrollTheater','RippleButton','SpringAccordion','ElasticTabs','PaperNote','ArcadeButton','RotatingText'];
const modules = import.meta.glob('./vendor/*.jsx');
const demos = Object.fromEntries(names.map(name => [name, lazy(modules[`./vendor/${name}.jsx`])]));
function DemoContent({ Component, componentProps }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <div className="demo-content" style={{ display: 'contents' }} data-ready={ready} inert={!ready}><Component {...componentProps} /></div>;
}
export const themes = {
  warm: { name: '暖色编辑', subtitle: '纸感 · 珊瑚橙 · 松弛排版', accent: '#f36b48', surface: '#fff8ed', ink: '#32392b', wash: '#f7eee0' },
  mint: { name: '薄荷产品', subtitle: '薄荷绿 · 清晰层次 · 轻触感', accent: '#8dddb5', surface: '#eef9f0', ink: '#203f34', wash: '#e0f0e5' },
  play: { name: '几何游乐', subtitle: '明黄 · 粗线条 · 大胆形状', accent: '#efc449', surface: '#fbf5dc', ink: '#2c312a', wash: '#f1e9c6' },
  night: { name: '深夜实验', subtitle: '墨绿 · 暖金 · 立体空间', accent: '#e8b26a', surface: '#243a32', ink: '#fff3de', wash: '#192e27' }
};
export function Demo({ name, theme = 'warm', compact = false }) {
  const { quiet, note, setNote, clicks, setClicks } = useSite();
  const Component = demos[name];
  if (!Component) return null;
  const colors = themes[theme];
  const items = [
    { id: 'design', label: '设计', title: '留一点想象', content: '先选一个方向，再让每个细节相互呼应。', symbol: '✳', color: colors.surface },
    { id: 'motion', label: '动态', title: '让变化可见', content: '有弹性，有层次，也有恰到好处的节奏。', symbol: '◉', color: colors.accent },
    { id: 'build', label: '构建', title: '成为你的作品', content: '复制源码，接入内容，从这里开始。', symbol: '↗', color: colors.wash }
  ];
  const onClick = () => setClicks(n => n + 1);
  const props = name === 'RotatingText' ? {} : { ...colors, paused: quiet };
  switch (name) {
    case 'DepthLiftCard': Object.assign(props, { title: '一个新的维度', eyebrow: 'PULSAR / DEPTH', children: '移动指针，感受每一层的距离。', depth: 75 }); break;
    case 'PrismDeck': Object.assign(props, { items }); break;
    case 'ConveyorGallery': Object.assign(props, { items: items.map((item, i) => ({ ...item, content: ['✳','↗','◉'][i] })), speed: 0.7 }); break;
    case 'KineticTiles': Object.assign(props, { items: ['灵感','探索','构建','动态','细节','表达'].map((label, i) => ({ id: String(i), label, symbol: ['✳','◉','↗','◈','⌁','◐'][i], color: i % 2 ? colors.accent : colors.wash })), strength: quiet ? 0 : 28 }); break;
    case 'LiquidAction': Object.assign(props, { label: '让灵感发生', onClick }); break;
    case 'OrbitStage': Object.assign(props, { items }); break;
    case 'BeamPath': Object.assign(props, { title: '让想象连接起来', labels: ['界面','动态','文字','布局','触感','风格'], children: '把各自独立的想法，组合成一个完整体验。' }); break;
    case 'ApertureReveal': Object.assign(props, { title: '好设计，值得发现。', children: <div className="reveal-message"><span>✳</span><h3>LOOK CLOSER.</h3><p>每一层，都藏着一点惊喜。</p></div> }); break;
    case 'ScrollTheater': Object.assign(props, { items, height: compact ? 310 : 420 }); break;
    case 'RippleButton': Object.assign(props, { children: `回应了 ${clicks} 次点击`, onClick }); break;
    case 'ArcadeButton': Object.assign(props, { label: `PLAY · ${clicks}`, onClick }); break;
    case 'SpringAccordion': Object.assign(props, { items: items.map(i => ({ ...i, title: `关于${i.label}` })) }); break;
    case 'ElasticTabs': Object.assign(props, { items }); break;
    case 'PaperNote': Object.assign(props, { label: '留一个小想法', value: note, onChange: setNote }); break;
    case 'RotatingText': Object.assign(props, { texts: ['把想象变成界面','让细节开始呼吸','做出你的不同'], auto: !quiet, rotationInterval: 2600, mainClassName: 'demo-rotating', staggerDuration: 0.025 }); break;
  }
  return <div className={`demo demo-${name} ${compact ? 'compact-demo' : ''}`}><Suspense fallback={<div className="loading-state">正在载入互动预览…</div>}><DemoContent Component={Component} componentProps={props} /></Suspense>{['LiquidAction','RippleButton','ArcadeButton'].includes(name) && <span className="demo-count" role="status">点击次数：{clicks}</span>}</div>;
}
