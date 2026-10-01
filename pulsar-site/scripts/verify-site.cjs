async page => {
  page.setDefaultTimeout(5000);
  const rows=[],assertions=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const check=(name,actual,expected)=>{const passed=JSON.stringify(actual)===JSON.stringify(expected);assertions.push({name,actual,expected,passed});if(!passed)throw new Error(`${name}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);};
  const run=async(name,fn)=>{const first=assertions.length;try{await fn();rows.push({name,passed:true,assertions:assertions.length-first});}catch(e){rows.push({name,passed:false,error:e.message,assertions:assertions.length-first});}};
  const go=async path=>{await page.goto('http://127.0.0.1:5300'+path);await page.locator('h1').waitFor();await page.waitForFunction(()=>[...document.querySelectorAll('.demo-content')].every(e=>e.dataset.ready==='true')&&!document.querySelector('.demo .loading-state'));};
  const nav=page.getByRole('navigation',{name:'主要导航',exact:true});
  await page.setViewportSize({width:1440,height:900});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await go('/');
  await run('homepage 3D pointer interaction',async()=>{
    const card=page.locator('.hero-art-inner');const box=await card.boundingBox();
    await page.mouse.move(box.x+box.width*.72,box.y+box.height*.25);await page.waitForTimeout(300);
    check('card has perspective transform',await card.evaluate(e=>getComputedStyle(e).transform!=='none'),true);
    check('foreground lifts in Z',await page.locator('.art-word').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m43>50),true);
  });
  await run('homepage rotating content',async()=>{
    const label=page.locator('.art-rotating .text-rotate-sr-only');const before=await label.textContent();
    await page.waitForTimeout(3100);check('word really changes',await label.textContent()!==before,true);
  });
  await run('global motion pause keeps card and content still',async()=>{
    await page.getByRole('button',{name:'暂停动效',exact:true}).click();
    check('pause is pressed',await page.getByRole('button',{name:'恢复动效',exact:true}).getAttribute('aria-pressed'),'true');
    const label=page.locator('.art-rotating .text-rotate-sr-only');const word=await label.textContent();
    await page.waitForTimeout(3000);check('word frozen',await label.textContent(),word);
    check('pointer card transform removed',await page.locator('.hero-art-inner').evaluate(e=>getComputedStyle(e).transform),'none');
    await page.getByRole('button',{name:'恢复动效',exact:true}).click();
  });
  await run('live reduced-motion preference',async()=>{
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);
    check('system preference applied',await page.locator('.site').evaluate(e=>e.classList.contains('quiet-motion')),true);
    check('pointer depth disabled',await page.locator('.art-word').evaluate(e=>getComputedStyle(e).transform),'none');
    await page.emulateMedia({reducedMotion:'no-preference'});
  });
  await run('PrismDeck content selection and keyboard',async()=>{
    const demo=page.locator('.stage-demo'); await demo.getByRole('tab',{name:'动态',exact:true}).click();
    check('selected panel aria state',await demo.getByRole('tab',{name:'动态',exact:true}).getAttribute('aria-selected'),'true');
    await demo.getByRole('tab',{name:'动态',exact:true}).press('ArrowRight');
    check('keyboard selects build',await demo.getByRole('tab',{name:'构建',exact:true}).getAttribute('aria-selected'),'true');
    check('inactive panels inert',await demo.locator('[role="tabpanel"][inert]').count(),2);
  });
  await run('ConveyorGallery real continuous movement and pause',async()=>{
    const conveyor=page.locator('.home-conveyor');await conveyor.scrollIntoViewIfNeeded();await page.mouse.move(1,1);await page.waitForTimeout(200);
    const strip=conveyor.locator('[data-part="strip"]');const before=await strip.evaluate(e=>getComputedStyle(e).transform);
    await page.waitForTimeout(400);check('strip transform changes',await strip.evaluate(e=>getComputedStyle(e).transform)!==before,true);
    await conveyor.getByRole('button',{name:'Pause animation',exact:true}).click();await page.mouse.move(1,1);await page.waitForTimeout(100);
    const frozen=await strip.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(350);
    check('internal pause freezes transform',await strip.evaluate(e=>getComputedStyle(e).transform),frozen);
    check('pause control square',await conveyor.locator('[data-part="pause"]').evaluate(e=>{const r=e.getBoundingClientRect();return Math.abs(r.width-r.height)<1;}),true);
  });
  await run('FAQ opens and routes to guide',async()=>{
    const faq=page.locator('.site-faq');await faq.getByRole('button',{name:/从哪里开始/}).click();
    check('FAQ expanded',await faq.getByRole('button',{name:/从哪里开始/}).getAttribute('aria-expanded'),'true');
    await faq.getByRole('link',{name:'组件库',exact:true}).click();check('FAQ link goes to separate route',await page.evaluate(() => location.pathname),'/components');
  });
  await run('catalog source filters',async()=>{
    check('all entries count',await page.locator('[data-result-count]').getAttribute('data-result-count'),'361');
    await page.getByRole('button',{name:'本地原创',exact:true}).click();check('local count',await page.locator('[data-result-count]').getAttribute('data-result-count'),'28');
    await page.getByRole('button',{name:'Aceternity',exact:true}).click();check('Aceternity count',await page.locator('[data-result-count]').getAttribute('data-result-count'),'122');
    await page.getByRole('button',{name:'React Bits',exact:true}).click();check('React Bits count',await page.locator('[data-result-count]').getAttribute('data-result-count'),'239');
    await page.getByRole('button',{name:'全部来源',exact:true}).click();
  });
  await run('catalog search, zero results and recovery',async()=>{
    const search=page.getByRole('textbox',{name:'搜索组件'});await search.fill('no-component-xyz-999');
    check('zero results',await page.locator('[data-result-count]').getAttribute('data-result-count'),'0');
    check('no result cards',await page.locator('.component-card').count(),0);
    await page.getByRole('button',{name:'清除所有筛选'}).click();check('reset recovers all',await page.locator('[data-result-count]').getAttribute('data-result-count'),'361');
    await search.fill('PrismDeck');check('specific search yields one',await page.locator('.component-card').count(),1);
    check('specific route',await page.locator('.component-card').getAttribute('href'),'/components/react-bits-prism-deck');
    await page.getByRole('button',{name:'清除搜索'}).click();
  });
  await run('catalog pagination and category',async()=>{
    const before=await page.locator('.component-card').first().getAttribute('href');await page.getByRole('button',{name:'下一页',exact:true}).click();
    check('pagination changes items',await page.locator('.component-card').first().getAttribute('href')!==before,true);
    check('page in URL',await page.evaluate(() => new URL(location.href).searchParams.get('page')),'2');
    await page.locator('.catalog-sidebar').getByRole('button',{name:/微交互/}).click();
    check('category count',await page.locator('[data-result-count]').getAttribute('data-result-count'),'47');
    check('category resets page',await page.evaluate(() => new URL(location.href).searchParams.get('page')),null);
  });
  await run('search survives component navigation and browser back',async()=>{
    await go('/components?q=PrismDeck');await page.locator('.component-card').click();check('detail pathname',await page.evaluate(() => location.pathname),'/components/react-bits-prism-deck');
    await page.goBack();check('search preserved',await page.getByRole('textbox',{name:'搜索组件'}).inputValue(),'PrismDeck');
  });
  await page.context().grantPermissions(['clipboard-read','clipboard-write']);
  await go('/components/react-bits-prism-deck');
  await run('real source tabs variants and CSS pairing',async()=>{
    await page.getByRole('tab',{name:'源码',exact:true}).click();await page.getByLabel('源码版本').waitFor();
    check('default typed CSS version',await page.getByLabel('源码版本').inputValue(),'TS-CSS');
    check('two source files',await page.locator('.file-tabs button').allTextContents(),['PrismDeck.tsx','PrismDeck.css']);
    await page.getByLabel('源码版本').selectOption('JS-TW');
    check('Tailwind single source',await page.locator('.file-tabs button').allTextContents(),['PrismDeck.jsx']);
    check('source code present',await page.locator('.source-code').textContent().then(s=>s.includes('export default function PrismDeck')),true);
    await page.getByLabel('源码版本').selectOption('TS-CSS');
  });
  await run('clipboard contains actual selected source',async()=>{
    const payload=await (await page.request.get('http://127.0.0.1:5300/source/react-bits-prism-deck.json')).json();
    const text=payload.variants['TS-CSS'][0].content;await page.getByRole('button',{name:'复制源码',exact:true}).click();
    check('clipboard equals real code after Windows line ending normalization',(await page.evaluate(()=>navigator.clipboard.readText())).replaceAll('\r\n','\n'),text.replaceAll('\r\n','\n'));
  });
  await run('downloaded CSS equals served source',async()=>{
    await page.locator('.file-tabs button').getByText('PrismDeck.css',{exact:true}).click();
    const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'下载文件',exact:true}).click()]);
    check('actual download filename',download.suggestedFilename(),'PrismDeck.css');
    const stream=await download.createReadStream();let text='';for await(const chunk of stream)text+=chunk.toString();
    const payload=await (await page.request.get('http://127.0.0.1:5300/source/react-bits-prism-deck.json')).json();
    check('actual file content equals source',text,payload.variants['TS-CSS'][1].content);
  });
  await run('AI brief contains selected files and real endpoint',async()=>{
    await page.getByRole('button',{name:'交给 AI',exact:true}).click();const copied=await page.evaluate(()=>navigator.clipboard.readText());
    check('AI brief points to source',copied.includes('/source/react-bits-prism-deck.json'),true);
    check('AI brief contains CSS pair',copied.includes('PrismDeck.tsx、PrismDeck.css'),true);
  });
  await run('local props are actual metadata',async()=>{
    await page.getByRole('tab',{name:'参数',exact:true}).click();check('PrismDeck table props',await page.locator('.props-panel tbody tr').count(),8);
    check('onChange type present',await page.locator('.props-panel').textContent().then(s=>s.includes('(id:string)=>void')),true);
  });
  await run('source load failure retains page and retries',async()=>{
    await page.route('**/source/react-bits-prism-deck.json',route=>route.fulfill({status:503,body:'unavailable'}));
    await go('/components/react-bits-prism-deck');await page.getByRole('tab',{name:'源码',exact:true}).click();
    await page.getByRole('alert').waitFor();check('failure is exposed',await page.getByRole('alert').textContent().then(s=>s.includes('请重试')),true);
    check('AI copy disabled while unavailable',await page.getByRole('button',{name:'交给 AI',exact:true}).isDisabled(),true);
    check('detail title retained',await page.locator('h1').textContent(),'PrismDeck');
    await page.unroute('**/source/react-bits-prism-deck.json');await page.getByRole('button',{name:'重试载入'}).click();
    await page.getByLabel('源码版本').waitFor();check('source returns after retry',await page.locator('.file-tabs button').count(),2);
  });
  await run('source-only upstream entry has honest preview and real code',async()=>{
    await go('/components/aceternity-3d-card');check('source-only notice',await page.locator('.preview-stage').textContent().then(s=>s.includes('尚未接入本站互动预览')),true);
    await page.getByRole('tab',{name:'源码',exact:true}).click();await page.getByLabel('源码版本').waitFor();
    check('actual downloaded filename',await page.locator('.file-tabs button').allTextContents(),['3d-card.tsx']);
    check('downloaded 3D source present',await page.locator('.source-code').textContent().then(s=>s.includes('export const CardContainer')),true);
  });
  await run('styles preserve draft through theme and route changes',async()=>{
    let blocked=0;
    await page.route('**/assets/*.js',route=>{blocked++;return route.abort();});
    try {
      await page.goto('http://127.0.0.1:5300/styles');
      const cold=page.locator('.lab-note textarea');
      await cold.waitFor({state:'attached'});
      await cold.evaluate(e=>e.focus());
      check('missing client script was actually triggered',blocked>0,true);
      check('SSR input stays inert before hydration',await cold.evaluate(e=>e.closest('.demo-content').inert),true);
      check('SSR input cannot receive early keyboard focus',await cold.evaluate(e=>document.activeElement===e),false);
    } finally { await page.unroute('**/assets/*.js'); }
    await go('/styles');const textarea=page.locator('.lab-note textarea');await textarea.fill('这份想法需要保留');
    check('typed draft contains only new input',await textarea.inputValue(),'这份想法需要保留');
    await page.getByRole('button',{name:/薄荷产品/}).click();check('draft survives theme change',await textarea.inputValue(),'这份想法需要保留');
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.lab-sheet')).backgroundColor==='rgb(238, 249, 240)');
    check('mint sheet color',await page.locator('.lab-sheet').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(238, 249, 240)');
    await nav.getByRole('link',{name:'使用指南',exact:true}).click();await nav.getByRole('link',{name:'风格灵感',exact:true}).click();
    check('draft survives navigation',await page.locator('.lab-note textarea').inputValue(),'这份想法需要保留');
    check('theme survives navigation',await page.getByRole('button',{name:/薄荷产品/}).getAttribute('aria-pressed'),'true');
  });
  await run('style button native pointer and keyboard counts',async()=>{
    const action=page.locator('.lab-action .lc-ripple-button-root');await action.click();await action.press('Enter');
    check('two callback actions',await page.locator('.lab-action .demo-count').textContent(),'点击次数：2');
    await page.getByRole('button',{name:/几何游乐/}).click();check('Arcade style retains action count',await page.locator('.lab-action .demo-count').textContent(),'点击次数：2');
    await page.locator('.lab-action .lc-arcade-button-key').click();check('Arcade callback increments',await page.locator('.lab-action .demo-count').textContent(),'点击次数：3');
  });
  await run('guide pages have separate paths and content',async()=>{
    await go('/docs');await page.locator('.docs-sidebar').getByRole('link',{name:'和 AI 一起构建',exact:true}).click();
    check('AI guide path',await page.evaluate(() => location.pathname),'/docs/ai');check('AI guide article',await page.locator('.doc-article>h2').textContent(),'和 AI 一起构建');
    await page.locator('.docs-sidebar').getByRole('link',{name:'组件来源',exact:true}).click();check('sources article entries',await page.locator('.origin-list>div').count(),3);
  });
  await run('catalog JSON download contains all entries',async()=>{
    const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.docs-sidebar').getByRole('link',{name:'下载目录 JSON',exact:true}).click()]);
    check('catalog filename',download.suggestedFilename(),'pulsar-catalog.json');const stream=await download.createReadStream();let text='';for await(const chunk of stream)text+=chunk.toString();
    check('downloaded catalog entry count',JSON.parse(text).entries.length,361);
  });
  await run('404 unknown page and unknown component recover',async()=>{
    for(const route of ['/unlisted-page','/components/nonexistent-component']){await go(route);check(`${route} 404 message`,await page.locator('h1').textContent(),'这个灵感，还不在这里。');await page.getByRole('button',{name:'回到组件库',exact:true}).click();check(`${route} recovery path`,await page.evaluate(() => location.pathname),'/components');}
  });
  await run('mobile menu routes and Escape focus',async()=>{
    await page.setViewportSize({width:390,height:900});await go('/');await page.getByRole('button',{name:'打开导航'}).click();
    check('mobile menu is open',await page.getByRole('button',{name:'关闭导航'}).getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');check('menu closed by Escape',await page.locator('#mobile-nav').count(),0);
    check('focus returns to menu button',await page.getByRole('button',{name:'打开导航'}).evaluate(e=>document.activeElement===e),true);
    await page.getByRole('button',{name:'打开导航'}).click();await page.locator('#mobile-nav').getByRole('link',{name:'组件库',exact:true}).click();
    check('mobile separate route',await page.evaluate(() => location.pathname),'/components');check('mobile menu closes on route',await page.locator('#mobile-nav').count(),0);
  });
  await run('no runtime exceptions in tested workflows',async()=>check('pageerrors',errors,[]));
  return {total:rows.length,passed:rows.filter(r=>r.passed).length,failed:rows.filter(r=>!r.passed).length,skipped:0,assertionCount:assertions.length,rows,assertions,errors};
}

