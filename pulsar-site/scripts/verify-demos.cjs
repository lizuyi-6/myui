async page => {
  page.setDefaultTimeout(7000);
  const names = ['DepthLiftCard','PrismDeck','ConveyorGallery','KineticTiles','LiquidAction','OrbitStage','BeamPath','ApertureReveal','ScrollTheater','RippleButton','SpringAccordion','ElasticTabs','PaperNote','ArcadeButton','RotatingText'];
  const rows=[], assertions=[], errors=[];
  page.on('pageerror', e => errors.push(e.message));
  const check=(name,actual,expected)=>{const passed=JSON.stringify(actual)===JSON.stringify(expected);assertions.push({name,actual,expected,passed});if(!passed)throw Error(`${name}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);};
  await page.setViewportSize({width:1440,height:900});
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const name of names) {
    const first=assertions.length;
    try {
      const id=name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
      await page.goto(`http://127.0.0.1:5300/components/react-bits-${id}`);
      const demo=page.locator(`.demo-${name}`);
      await demo.waitFor();
      await demo.locator('.loading-state').waitFor({state:'detached'});
      await demo.locator('.demo-content[data-ready=true]').waitFor();
      await demo.scrollIntoViewIfNeeded();
      check(`${name} renders a real component child`,await demo.locator('.demo-content').evaluate(e=>!!e.firstElementChild && e.firstElementChild.getBoundingClientRect().width>0),true);
      check(`${name} visible area > 0`,await demo.evaluate(e=>e.getBoundingClientRect().height>0),true);
      check(`${name} interactive subtree hydrated`,await demo.locator('.demo-content').evaluate(e=>e.dataset.ready==='true'&&!e.inert),true);
      if(name==='DepthLiftCard') {
        await demo.locator('[data-part=trigger]').click();
        check('DepthLiftCard held',await demo.locator('[data-part=trigger]').getAttribute('aria-pressed'),'true');
        await page.waitForFunction(()=>new DOMMatrix(getComputedStyle(document.querySelector('.demo-DepthLiftCard [data-part=foreground]')).transform).m43>70);
        check('DepthLiftCard actual Z > 70',await demo.locator('[data-part=foreground]').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m43>70),true);
      }
      if(name==='ApertureReveal') {
        await demo.locator('[data-part=trigger]').click();
        check('ApertureReveal pinned',await demo.locator('[data-part=trigger]').getAttribute('aria-pressed'),'true');
        check('ApertureReveal accessible content',await demo.locator('[data-part=reveal]').evaluate(e=>({hidden:e.getAttribute('aria-hidden'),inert:e.inert})),{hidden:'false',inert:false});
      }
      if(name==='OrbitStage') {
        await demo.locator('[data-part=subject]').nth(1).click();
        await demo.locator('[data-part=center] [data-part=title]').filter({hasText:'动态'}).waitFor();
        check('OrbitStage selected subject',await demo.locator('[data-part=subject]').nth(1).getAttribute('aria-pressed'),'true');
        check('OrbitStage content actually switches',await demo.locator('[data-part=center] [data-part=copy]').textContent(),'有弹性，有层次，也有恰到好处的节奏。');
        check('OrbitStage satellites have symbols',await demo.locator('[data-part=satellite] span').allTextContents(),['✳','◉','↗']);
      }
      if(name==='ScrollTheater') {
        const poster=demo.locator('[data-part=poster]');
        const before=await poster.evaluate(e=>getComputedStyle(e).transform);
        await demo.locator('[data-part=scene]').nth(2).click();
        await page.waitForFunction(()=>document.querySelector('.demo-ScrollTheater [data-part=number]').textContent==='03 / 03');
        check('ScrollTheater last scene selected',await demo.locator('[data-part=scene]').nth(2).getAttribute('aria-pressed'),'true');
        check('ScrollTheater scroll changes real transform',await poster.evaluate(e=>getComputedStyle(e).transform)!==before,true);
        check('ScrollTheater last scene content',await demo.locator('[data-part=title]').textContent(),'成为你的作品');
      }
      if(name==='BeamPath') {
        const packet=demo.locator('path[stroke="var(--lc-accent)"]').first();
        await page.mouse.move(20,20);
        await page.waitForTimeout(100);
        const before=await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset);
        await page.waitForTimeout(400);
        check('BeamPath path moves',await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset)!==before,true);
        await demo.locator('[data-part=pause]').click();
        await page.waitForTimeout(100);
        const stopped=await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset);
        await page.waitForTimeout(300);
        check('BeamPath internal pause freezes path',await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset),stopped);
      }
      if(name==='KineticTiles') {
        const tile=demo.locator('[data-part=tile]').first();
        await tile.focus();
        await page.waitForTimeout(400);
        check('KineticTiles keyboard focus has transform',await tile.evaluate(e=>getComputedStyle(e).transform!=='none'),true);
        check('KineticTiles six choices',await demo.locator('[data-part=tile]').count(),6);
      }
      rows.push({name,passed:true,assertions:assertions.length-first});
    } catch(error) { rows.push({name,passed:false,error:error.message,assertions:assertions.length-first}); }
  }
  check('demo runtime errors',errors,[]);
  return {total:rows.length,passed:rows.filter(r=>r.passed).length,failed:rows.filter(r=>!r.passed).length,skipped:0,rows,assertions,errors};
}
