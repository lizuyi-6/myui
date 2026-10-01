async (page) => {
  const names=['DepthLiftCard','PrismDeck','ApertureReveal','OrbitStage','ScrollTheater','BeamPath','KineticTiles','ConveyorGallery','LiquidAction','ShutterText'];
  const variants=[0,1,2,3];
  const continuous=['OrbitStage','BeamPath','ConveyorGallery','LiquidAction','ShutterText'];
  page.setDefaultTimeout(4000); const rows=[],assertions=[],errors=[],styles=[];
  page.on('pageerror',error=>errors.push(error.message));
  const check=(name,actual,expected)=>{const passed=JSON.stringify(actual)===JSON.stringify(expected);assertions.push({name,actual,expected,passed});if(!passed)throw new Error(name+': '+JSON.stringify(actual)+' != '+JSON.stringify(expected));};
  const specimen=page.locator('#specimen');
  const target={OrbitStage:'[data-part="satellite"]',BeamPath:'svg path[stroke="var(--lc-accent)"]',ConveyorGallery:'[data-part="strip"]',LiquidAction:'[data-part="drop"]',ShutterText:'div[role="img"]'};
  const sample=async name=>specimen.locator(target[name]).first().evaluate(el=>({transform:getComputedStyle(el).transform,offset:getComputedStyle(el).strokeDashoffset,word:el.getAttribute('aria-label')}));
  const pick=async(name,variant)=>{await page.mouse.move(1,1);await page.evaluate(()=>window.scrollTo(0,0));await page.locator('#component').selectOption(name);await page.locator('#variant').selectOption(String(variant));await page.waitForTimeout(200);};
  const run=async(label,fn)=>{const start=assertions.length;try{await fn();rows.push({name:label,passed:true,assertions:assertions.length-start});}catch(error){rows.push({name:label,passed:false,error:error.message,assertions:assertions.length-start});}};
  await page.goto('http://127.0.0.1:5291/output/local-collection/r3/index.html');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1000,height:850});
  for(const name of names)for(const variant of variants){
    await run(name+' variant '+variant+' motion and interaction',async()=>{
      await pick(name,variant);
      check('root exists',await specimen.locator(':scope > div').count(),1);
      const fields=['backgroundColor','color','borderTopColor','borderTopWidth','borderRadius','paddingTop','paddingBottom','fontFamily','fontSize','position','overflow','boxSizing'];
      const computed=await specimen.locator(':scope > div').evaluate((el,fields)=>{const css=getComputedStyle(el);return Object.fromEntries(fields.map(field=>[field,css[field]]));},fields);
      styles.push({name,variant,fields:computed});
      if(name==='DepthLiftCard'){
        const card=specimen.locator('[data-part="card"]');const before=await card.evaluate(el=>getComputedStyle(el).transform);
        const box=await specimen.locator(':scope > div').boundingBox();await page.mouse.move(box.x+box.width*0.85,box.y+box.height*0.3);await page.waitForTimeout(650);
        check('pointer changes perspective',await card.evaluate(el=>getComputedStyle(el).transform)!==before,true);
        const fg=specimen.locator('[data-part="foreground"]');check('foreground lifts in z',await fg.evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m43)>40,true);
        const btn=specimen.getByRole('button');await btn.click();check('tap holds depth',await btn.getAttribute('aria-pressed'),'true');await btn.press('Enter');check('keyboard releases depth',await btn.getAttribute('aria-pressed'),'false');
      }else if(name==='PrismDeck'){
        const tabs=specimen.getByRole('tab');const panel=specimen.locator('[role="tabpanel"]').nth(1);const before=await panel.evaluate(el=>getComputedStyle(el).transform);await tabs.nth(1).click();await page.waitForTimeout(650);
        check('panel depth changes',await panel.evaluate(el=>getComputedStyle(el).transform)!==before,true);check('selected id callback',await page.locator('#last').textContent(),'explore');check('selected aria',await tabs.nth(1).getAttribute('aria-selected'),'true');check('old content inert',await specimen.locator('[role="tabpanel"]').first().evaluate(el=>el.inert),true);
        await tabs.nth(1).press('ArrowRight');check('keyboard selects next',await tabs.nth(2).getAttribute('aria-selected'),'true');
      }else if(name==='ApertureReveal'){
        const reveal=specimen.locator('[data-part="reveal"]');check('closed content inert',await reveal.evaluate(el=>el.inert),true);const before=await reveal.evaluate(el=>getComputedStyle(el).clipPath);await specimen.hover();await page.waitForTimeout(750);check('aperture grows',await reveal.evaluate(el=>getComputedStyle(el).clipPath)!==before,true);check('revealed content accessible',await reveal.evaluate(el=>el.inert),false);
        await specimen.getByRole('button').click();check('toggle persistent reveal',await specimen.getByRole('button').getAttribute('aria-pressed'),'true');check('callback open',await page.locator('#last').textContent(),'true');
      }else if(name==='ScrollTheater'){
        const plane=specimen.locator('[data-part="poster"]');const before=await plane.evaluate(el=>getComputedStyle(el).transform);const buttons=specimen.getByRole('button');await buttons.last().click();await page.waitForTimeout(1000);check('scroll changes plane',await plane.evaluate(el=>getComputedStyle(el).transform)!==before,true);check('last scene callback',await page.locator('#last').textContent(),'play');check('last scene selected',await buttons.last().getAttribute('aria-pressed'),'true');
        await specimen.getByRole('region').press('Home');await specimen.getByRole('region').press('Control+Home');await page.waitForTimeout(650);check('native keyboard scroll first',await buttons.first().getAttribute('aria-pressed'),'true');
      }else if(name==='KineticTiles'){
        const tile=specimen.getByRole('button').nth(4);const before=await tile.evaluate(el=>getComputedStyle(el).transform);await tile.hover();await page.waitForTimeout(650);check('pointer ripples grid',await tile.evaluate(el=>getComputedStyle(el).transform)!==before,true);await tile.click();check('tile callback',await page.locator('#last').textContent(),'Think');await tile.press('Enter');check('keyboard callback count',await page.locator('#calls').textContent(),'2');
      }else{
        await page.mouse.move(1,1);const before=await sample(name);await page.waitForTimeout(name==='ShutterText'?3500:400);const after=await sample(name);check('clock changes rendered field',JSON.stringify(after)!==JSON.stringify(before),true);
        if(name==='OrbitStage'){await specimen.getByRole('button',{name:'Moon',exact:true}).last().click();await page.waitForTimeout(650);check('orbit selection content',await specimen.locator('[data-part="center"]').textContent(),'MoonA quieter point of view.');check('selection callback',await page.locator('#last').textContent(),'moon');}
        if(name==='ConveyorGallery'){await specimen.getByRole('button',{name:'Space',exact:true}).click();check('film callback',await page.locator('#last').textContent(),'space');check('copies are inert',await specimen.locator('[data-part="frame"]').evaluate(el=>el.inert),true);}
        if(name==='LiquidAction'){const btn=specimen.getByRole('button',{name:'Let’s make waves',exact:true});await btn.click();check('action callback count',await page.locator('#calls').textContent(),'1');await page.locator('#disabled').check();await btn.evaluate(el=>el.click());check('disabled action never calls',await page.locator('#calls').textContent(),'1');check('native disabled',await btn.isDisabled(),true);}
        if(name==='ShutterText'){await specimen.getByRole('button',{name:'MAKE.',exact:true}).click();check('direct word selection',await specimen.getByRole('img').getAttribute('aria-label'),'MAKE.');check('word callback',await page.locator('#last').textContent(),'MAKE.');}
      }
      await page.setViewportSize({width:390,height:850});await page.waitForTimeout(150);const box=await specimen.locator(':scope > div').boundingBox();check('390px root fits',box.x>=0&&box.x+box.width<=391,true);await page.setViewportSize({width:1000,height:850});
    });
    if(continuous.includes(name))await run(name+' variant '+variant+' lifecycle',async()=>{
      await pick(name,variant);await page.locator('#paused').check();await page.mouse.move(1,1);await page.waitForTimeout(200);const before=await sample(name);await page.waitForTimeout(400);check('external pause freezes actual field',await sample(name),before);check('paused state',await specimen.locator('[data-motion]').getAttribute('data-motion'),'paused');
      await page.locator('#paused').uncheck();await page.mouse.move(1,1);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(500);const reduced=await sample(name);await page.waitForTimeout(400);check('live reduced preference stops clock',await sample(name),reduced);check('reduced state',await specimen.locator('[data-motion]').getAttribute('data-motion'),'paused');
      await page.emulateMedia({reducedMotion:'no-preference'});await page.mouse.move(1,1);await page.locator('#bottom').scrollIntoViewIfNeeded();await page.waitForTimeout(250);const off=await sample(name);await page.waitForTimeout(400);check('offscreen actual field freezes',await sample(name),off);check('offscreen state',await specimen.locator('[data-motion]').getAttribute('data-motion'),'paused');await page.evaluate(()=>window.scrollTo(0,0));
    });
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const variant of variants)for(const name of ['PrismDeck','OrbitStage','ApertureReveal'])await run(name+' controlled reset '+variant,async()=>{
    await pick(name,variant);await page.locator('#controlled').check();
    if(name==='PrismDeck'){await specimen.getByRole('tab').nth(1).click();await page.locator('#reset').click();check('controlled panel reset',await specimen.getByRole('tab').first().getAttribute('aria-selected'),'true');}
    if(name==='OrbitStage'){await specimen.getByRole('button',{name:'Moon',exact:true}).last().click();await page.locator('#reset').click();check('controlled orbit reset',await specimen.getByRole('button',{name:'Sun',exact:true}).last().getAttribute('aria-pressed'),'true');}
    if(name==='ApertureReveal'){await specimen.getByRole('button').click();await page.locator('#reset').click();check('controlled aperture reset',await specimen.getByRole('button').getAttribute('aria-pressed'),'false');}
  });
  for(const variant of variants)for(const name of ['PrismDeck','OrbitStage','ScrollTheater','KineticTiles','ConveyorGallery','ShutterText'])await run(name+' empty and recovery '+variant,async()=>{
    await pick(name,variant);await page.locator('#empty').check();check('empty retains root',await specimen.locator(':scope > div').count(),1);if(name==='ShutterText')check('empty word',await specimen.getByRole('img').getAttribute('aria-label'),'…');else check('empty recovery text',await specimen.textContent().then(text=>/No panels|No subjects|No scenes|No tiles|No frames/.test(text)),true);await page.locator('#empty').uncheck();check('content restored',await specimen.textContent().then(text=>/No panels|No subjects|No scenes|No tiles|No frames/.test(text)),false);
  });
  for(const variant of variants)await run('LiquidAction unique filter ids '+variant,async()=>{await pick('LiquidAction',variant);await page.locator('#duplicate').check();const ids=await page.locator('#specimen filter, #duplicate-specimen filter').evaluateAll(nodes=>nodes.map(node=>node.id));check('two actual ids',ids.length,2);check('ids differ',ids[0]!==ids[1],true);});
  for(const variant of variants)for(const name of names)await run(name+' non-finite numeric props '+variant,async()=>{await pick(name,variant);await page.locator('#invalid').check();await page.waitForTimeout(200);check('no invalid CSS values',await specimen.evaluate(el=>!el.innerHTML.includes('NaN')&&!el.innerHTML.includes('Infinity')),true);});
  check('page error list',errors,[]);
  return {environment:'Windows Chromium, normal motion first; actual source variants; native user inputs; no production test hooks',variants,total:rows.length,passed:rows.filter(row=>row.passed).length,failed:rows.filter(row=>!row.passed).length,skipped:0,assertionCount:assertions.length,assertionResults:assertions,errors,styles,rows};
}
