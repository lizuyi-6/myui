async page => {
  const routes=['/','/components','/styles','/docs','/docs/ai','/docs/motion','/docs/sources','/about','/components/react-bits-prism-deck','/components/aceternity-3d-card','/components/react-bits-liquid-action','/components/react-bits-orbit-stage','/components/react-bits-scroll-theater','/missing'];
  const results=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.setDefaultTimeout(5000);
  for(const width of [1440,1024,390]) {
    await page.setViewportSize({width,height:900});
    for(const route of routes) {
      await page.goto('http://127.0.0.1:5300'+route);
      await page.locator('h1').waitFor();
      await page.waitForTimeout(200);
      const layout=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,title:document.querySelector('h1').textContent,controls:[...document.querySelectorAll('button')].filter(e=>e.getBoundingClientRect().width>0&&!e.textContent.trim()&&!e.getAttribute('aria-label')).length}));
      results.push({route,width,...layout,passed:layout.scroll<=layout.client+1&&layout.controls===0});
      if(width===390&&['/','/components','/styles','/components/react-bits-prism-deck'].includes(route)) await page.screenshot({path:'output/playwright/mobile-'+(route==='/'?'home':route.split('/').filter(Boolean).join('-'))+'.png',fullPage:true});
    }
  }
  return {total:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,skipped:0,results,errors};
}
