import { PageHead, Action } from '../ui';
export default function NotFound() { return <div className="container not-found"><PageHead eyebrow="404 / LOST IN SPACE" title="这个灵感，还不在这里。" description="地址可能写错了。回到组件库，继续找点有意思的。" /><Action to="/components">回到组件库</Action></div>; }
