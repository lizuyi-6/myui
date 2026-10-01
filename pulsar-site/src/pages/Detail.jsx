import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Copy, Download, Code2, Check, Sparkles } from 'lucide-react';
import catalog from '../data/catalog.json';
import ElasticTabs from '../vendor/ElasticTabs';
import { Demo, themes } from '../Demo';
import { PageHead, TextLink } from '../ui';
import NotFound from './NotFound';

export default function Detail() {
  const { id } = useParams();
  const item = catalog.entries.find(c => c.id === id);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [variant, setVariant] = useState('TS-CSS');
  const [fileIndex, setFileIndex] = useState(0);
  const [theme, setTheme] = useState('warm');
  const [status, setStatus] = useState('');
  const [origin, setOrigin] = useState('');
  useEffect(() => setOrigin(window.location.origin), []);
  useEffect(() => {
    if (!item) return;
    const controller = new AbortController();
    setPayload(null); setError(''); setStatus(''); setFileIndex(0);
    setVariant(item.variants.includes('TS-CSS') ? 'TS-CSS' : item.variants[0]);
    fetch(item.sourceUrl, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('源码暂时没有载入，请重试。');
      const data = await response.json();
      if (data.name !== item.name || !data.variants || !Object.values(data.variants).every(files => Array.isArray(files) && files.length && files.every(f => typeof f.name === 'string' && typeof f.content === 'string')))
        throw new Error('源码数据不完整，请重试。');
      setPayload(data);
    }).catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    return () => controller.abort();
  }, [item, retry]);
  if (!item) return <NotFound />;
  const files = payload?.variants[variant] ?? [];
  const file = files[fileIndex] ?? files[0];
  const copy = async (text, message) => { try { await navigator.clipboard.writeText(text); setStatus(message); } catch { setStatus('复制未成功，请在下方选中内容复制。'); } };
  const aiBrief = `请优先复用 PULSAR 目录中的 ${item.name}，来源 ${payload?.attribution ?? item.library}。\n源码包：${origin}${item.sourceUrl}\n版本：${variant}\n文件：${files.map(f => f.name).join('、')}\n依赖：${payload?.dependencies.join('、') || '请读取源码导入并核对宿主依赖'}\n读取真实接口，用 props/children 接入业务。CSS版本同时复制相邻CSS；已有组件能够表达需求时，不重写同功能动画。保留原来源说明。`;
  const download = () => {
    if (!file) return;
    const url = URL.createObjectURL(new Blob([file.content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = file.name; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); setStatus(`已下载 ${file.name}`);
  };
  const sourcePanel = error ? <div role="alert" className="source-error"><Code2 /><h3>{error}</h3><button className="plain-button" onClick={() => setRetry(n => n + 1)}>重试载入</button></div> : !payload ? <div className="loading-state" role="status">正在载入真实源码…</div> : <div className="source-panel"><div className="source-toolbar"><label>版本<select aria-label="源码版本" value={variant} onChange={e => {setVariant(e.target.value);setFileIndex(0);setStatus('');}}>{item.variants.map(v => <option key={v}>{v}</option>)}</select></label><div className="source-actions"><button onClick={() => copy(file.content, '源码已复制')}><Copy size={15} />复制源码</button><button onClick={download}><Download size={15} />下载文件</button></div></div><div className="file-tabs" aria-label="源码文件">{files.map((f,i) => <button key={f.name} aria-pressed={i === fileIndex} onClick={() => setFileIndex(i)}>{f.name}</button>)}</div><pre className="source-code" tabIndex={0}><code>{file?.content}</code></pre><p className="source-note">{variant.endsWith('CSS') ? '使用 CSS 版本时，源码与 CSS 两个文件都要下载，保持相邻。' : 'Tailwind 版本需要宿主项目扫描组件源码。'} 保留原文件中的来源说明。</p>{payload.usage && <div className="usage-block"><h3>接入示例</h3><pre>{payload.usage}</pre></div>}</div>;
  const propsPanel = payload?.props?.length ? <div className="props-panel"><table><thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody>{payload.props.map(p => <tr key={p.name}><td><code>{p.name}</code></td><td><code>{p.type}</code></td><td><code>{p.default}</code></td><td>{p.description}</td></tr>)}</tbody></table></div> : <div className="detail-description"><Code2 /><h3>以真实源码接口为准。</h3><p>这个来源没有收录到统一参数表。请在源码中查看导出接口，或打开原库说明。</p><a className="text-link" href={item.docs ?? "https://ui.aceternity.com/components"} target="_blank" rel="noreferrer">原库说明<ArrowUpRight size={16} /></a></div>;
  return <div className="container detail-page"><Link className="back-link" to="/components"><ArrowLeft size={16} />返回组件库</Link><div className="detail-header"><PageHead eyebrow={`${item.origin === 'local' ? 'PULSAR ORIGINAL' : item.library.toUpperCase()} / ${item.category}`} title={item.name} description={item.description} /><div className="detail-tags"><span>{item.kind === 'component' || item.kind === 'components' ? 'COMPONENT' : item.kind.toUpperCase()}</span><span>{item.variants.length} 种源码版本</span></div></div><ElasticTabs className="detail-tabs" accent="#263d32" surface="#edece2" ink="#263d32" ariaLabel="组件详情" items={[
    { id:'preview', label:'互动预览', content:<div className="preview-panel"><div className="preview-toolbar"><span>{item.live ? 'LIVE PREVIEW · 试着与它互动' : 'SOURCE COLLECTION'}</span>{item.live && <label>色调<select aria-label="预览色调" value={theme} onChange={e => setTheme(e.target.value)}>{Object.entries(themes).map(([id,c]) => <option value={id} key={id}>{c.name}</option>)}</select></label>}</div><div className="preview-stage">{item.live ? <Demo name={item.name} theme={theme} /> : <div className="detail-description"><Sparkles size={45} /><h3>源码已收录，原库演示也值得一看。</h3><p>此组件尚未接入本站互动预览。你可以查看源码，或前往原库体验。</p><a className="text-link" href={item.docs ?? "https://ui.aceternity.com/components"} target="_blank" rel="noreferrer">{item.docs ? "打开原库演示" : "打开原库目录"}<ArrowUpRight size={16} /></a></div>}</div></div> },
    { id:'source', label:'源码', content:sourcePanel }, {id:'props',label:'参数',content:propsPanel}
  ]} /><div className="copy-status" role="status">{status && <><Check size={16} />{status}</>}</div><div className="detail-bottom"><div><h2>让它成为你自己的组件。</h2><p>把内容和风格接进来，保留它的好手感。</p><TextLink to="/docs">查看接入指南</TextLink></div><div className="ai-brief"><div><span>BUILD WITH AI</span><button disabled={!payload} onClick={() => copy(aiBrief,'AI 取用说明已复制')}><Copy size={15} />交给 AI</button></div><textarea aria-label="AI 取用说明" readOnly value={aiBrief} /></div></div></div>;
}
