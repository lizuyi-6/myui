// Run with playwright-cli run-code --filename=scripts/verifyLocalCollection.cjs --raw.
// Tests the actual copied implementations through a normal React caller.
async (page) => {
  const names = ['ElasticTabs','OrbitSlider','RippleButton','SpringAccordion','ToastStack','PostcardFlip','ArcadeButton','PaperNote','BauhausStepper','NeonToggle','VinylDeck','BubbleChoice','MonoCommand','PixelMeter','OrigamiNav','TerminalStatus','RibbonBadge','BlueprintPanel'];
  const controlledNames = ['ElasticTabs','OrbitSlider','PaperNote','BauhausStepper','NeonToggle','BubbleChoice','PixelMeter','SpringAccordion','PostcardFlip','VinylDeck','OrigamiNav'];
  const rows = [], assertions = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1000, height: 850 });
  await page.goto('http://127.0.0.1:5291/output/local-collection/index.html');
  let current;
  const equal = (actual, expected, field) => {
    assertions.push({ ...current, field, actual, expected, passed: JSON.stringify(actual) === JSON.stringify(expected) });
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`${field}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const specimen = page.locator('#specimen');
  const callback = async () => JSON.parse(await page.locator('#callback').textContent());
  const select = async (name, variant, controlled=false) => {
    await page.locator('#controlled').setChecked(controlled);
    await page.locator('#component').selectOption(name);
    await page.locator('#variant').selectOption(String(variant));
    await page.waitForFunction(({name,variant}) => { const root=document.querySelector('#specimen'); return root?.dataset.name===name && root?.dataset.variant===String(variant) && root.children.length===1; }, {name,variant});
  };
  const attr = async (locator, name) => locator.getAttribute(name);
  const exercise = async name => {
    const buttons = specimen.getByRole('button');
    if (name==='ElasticTabs') {
      const tabs=specimen.getByRole('tab');
      equal(await attr(tabs.nth(0),'aria-selected'),'true','initial selected');
      await tabs.nth(1).click(); equal(await callback(),'motion','selection callback');
      equal(await attr(tabs.nth(1),'aria-selected'),'true','selected field');
      await tabs.nth(1).press('End'); equal(await attr(tabs.nth(2),'aria-selected'),'true','End selects last');
      await tabs.nth(2).press('ArrowRight'); equal(await attr(tabs.nth(0),'aria-selected'),'true','keyboard wraps');
      equal(await specimen.getByRole('tabpanel').count(),1,'one visible panel');
    } else if (['OrbitSlider','PixelMeter'].includes(name)) {
      const range=specimen.getByRole('slider');
      equal(await range.inputValue(),name==='OrbitSlider'?'60':'8','initial range');
      await range.press('Home'); equal(await range.inputValue(),'0','min bound');equal(await callback(),0,'min callback');
      if(name==='PixelMeter') equal(await specimen.locator('[data-lit="true"]').count(),0,'min lit cells');
      await range.press('End'); const max=name==='OrbitSlider'?100:16;
      equal(await range.inputValue(),String(max),'max bound'); equal(await callback(),max,'max callback');
      await range.press('ArrowRight'); equal(await range.inputValue(),String(max),'above max rejected by native range');
      if(name==='PixelMeter') equal(await specimen.locator('[data-lit="true"]').count(),32,'max lit cells');
    } else if (['RippleButton','ArcadeButton'].includes(name)) {
      await buttons.click(); equal(await page.locator('#calls').textContent(),'1','pointer activation');
      await buttons.press('Space');equal(await page.locator('#calls').textContent(),'2','keyboard activation');
      await page.locator('#disabled').check();equal(await buttons.isDisabled(),true,'disabled native field');
      await buttons.evaluate(el=>el.click());equal(await page.locator('#calls').textContent(),'2','disabled blocks callback');
    } else if (name==='SpringAccordion') {
      equal(await attr(buttons.nth(0),'aria-expanded'),'false','initial collapsed');
      await buttons.nth(0).click(); equal(await callback(),'first','first open callback');
      await buttons.nth(1).click(); equal(await attr(buttons.nth(0),'aria-expanded'),'false','one open only');
      equal(await attr(buttons.nth(1),'aria-expanded'),'true','second open');
      await buttons.nth(1).press('Enter');equal(await callback(),null,'close callback');
      equal(await specimen.locator('[role="region"][inert]').count(),2,'closed regions inert');
    } else if(name==='ToastStack') {
      equal(await buttons.count(),2,'caller items');
      await buttons.nth(0).focus();await buttons.nth(0).press('Enter');
      await page.waitForFunction(()=>document.querySelectorAll('#specimen button').length===1);
      equal(await callback(),'a','dismiss callback id');
      equal(await buttons.nth(0).evaluate(el=>el===document.activeElement),true,'dismiss preserves focus');
      await buttons.nth(0).press('Enter');
      await page.waitForFunction(()=>document.querySelectorAll('#specimen button').length===0);
      equal(await specimen.locator('[data-toast-stack]').evaluate(el=>el===document.activeElement),true,'empty stack focus');
      equal((await specimen.textContent()).includes('All caught up.'),true,'empty message');
      await page.locator('#restore').click();equal(await buttons.count(),1,'caller can restore items');
    } else if(name==='PostcardFlip') {
      equal(await attr(buttons,'aria-pressed'),'false','front initial');await buttons.click();
      equal(await attr(buttons,'aria-pressed'),'true','flipped field');equal(await callback(),true,'flip callback');
      equal(await specimen.locator('[inert]').count(),1,'one inert face');
      await buttons.press('Enter');equal(await attr(buttons,'aria-pressed'),'false','return front');
    } else if(name==='PaperNote') {
      const text=specimen.getByRole('textbox');await text.fill('Keep the draft');equal(await callback(),'Keep the draft','draft callback');
      await buttons.click();equal(await attr(buttons,'aria-pressed'),'true','pin field');
      equal(await text.inputValue(),'Keep the draft','pin retains draft');
      await buttons.click();equal(await attr(buttons,'aria-pressed'),'false','unpin field');
    } else if(name==='BauhausStepper') {
      await buttons.nth(2).click();equal(await attr(buttons.nth(2),'aria-current'),'step','freely select last');equal(await callback(),2,'step index callback');
      await buttons.nth(0).click();equal(await callback(),0,'return first');
    } else if(name==='NeonToggle') {
      const toggle=specimen.getByRole('switch');equal(await attr(toggle,'aria-checked'),'false','switch initial');
      await toggle.click();equal(await attr(toggle,'aria-checked'),'true','switch checked');equal(await callback(),true,'switch callback');
      await toggle.press('Space');equal(await attr(toggle,'aria-checked'),'false','keyboard switch');
      await page.locator('#disabled').check();await toggle.evaluate(el=>el.click());equal(await attr(toggle,'aria-checked'),'false','disabled retains state');
    } else if(name==='VinylDeck') {
      equal(await attr(buttons,'aria-pressed'),'false','rotation initially off');await buttons.click();
      equal(await attr(buttons,'aria-pressed'),'true','rotation on field');equal(await callback(),true,'rotation callback');
      equal(await specimen.locator('audio').count(),0,'visual deck does not play audio');
      await buttons.click();equal(await attr(buttons,'aria-pressed'),'false','rotation stopped');
    } else if(name==='BubbleChoice') {
      const radios=specimen.getByRole('radio');equal(await radios.nth(0).isChecked(),true,'initial Peach');
      await radios.nth(1).check();equal(await callback(),'Mint','radio callback');
      await radios.nth(1).press('ArrowRight');equal(await radios.nth(2).isChecked(),true,'native radio keyboard');
      equal(await callback(),'Lavender','keyboard radio callback');
    } else if(name==='MonoCommand') {
      const search=specimen.getByRole('searchbox');await search.fill('Archives');equal(await buttons.count(),1,'search matches one');
      await buttons.click();equal(await callback(),'archive','caller selection');
      await search.fill('zzzzz');equal(await buttons.count(),0,'empty result');
      equal((await specimen.textContent()).includes('No commands found.'),true,'empty recovery hint');
      await search.press('Escape');equal(await buttons.count(),3,'Escape clears query');
      await search.press('ArrowDown');equal(await buttons.nth(0).evaluate(el=>el===document.activeElement),true,'search to results focus');
      await buttons.nth(0).press('ArrowDown');equal(await buttons.nth(1).evaluate(el=>el===document.activeElement),true,'next result focus');
    } else if(name==='OrigamiNav') {
      equal(await specimen.getByRole('link').count(),0,'closed links hidden');await buttons.click();
      equal(await attr(buttons,'aria-expanded'),'true','nav expanded');equal(await specimen.getByRole('link').count(),3,'open links');
      equal(await callback(),true,'nav callback');await buttons.click();equal(await specimen.getByRole('link').count(),0,'closed links leave accessibility tree');
      equal(await specimen.locator('[inert]').count(),1,'closed fold inert');
    } else if(name==='TerminalStatus') {
      equal((await specimen.getByRole('status').textContent()).trim(),'IDLE','initial caller status');
      for(const status of ['running','success','error']) {await page.locator('#status').selectOption(status);equal((await specimen.getByRole('status').textContent()).trim(),status.toUpperCase(),'status '+status);}
      equal(await specimen.getByRole('status').locator('span').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 156, 134)','error indicator');
    } else if(['RibbonBadge','BlueprintPanel'].includes(name)) {
      equal(await attr(buttons,'aria-expanded'),'false','disclosure closed');await buttons.click();
      equal(await attr(buttons,'aria-expanded'),'true','disclosure open');equal(await callback(),true,'open callback');
      equal(await specimen.locator('[inert]').count(),0,'open content not inert');
      await buttons.press('Enter');equal(await attr(buttons,'aria-expanded'),'false','keyboard closes');equal(await specimen.locator('[inert]').count(),1,'closed content inert');
    }
  };
  const styles = {};
  for(const name of names) for(let variant=0;variant<4;variant++) {
    current={component:name,variant,controlled:false};
    try {
      await select(name,variant);
      await page.mouse.move(0, 0);
      await page.locator('#variant').focus();
      await page.waitForTimeout(80);
      const fingerprint = await specimen.evaluate(root=>[root.firstElementChild,...root.firstElementChild.querySelectorAll('*')].map(el=>{
        const css=getComputedStyle(el);return ['display','position','color','backgroundColor','fontFamily','fontSize','borderTopWidth','borderTopStyle','borderRadius','paddingTop','gap','backgroundImage'].map(key=>css[key]);
      }));
      if(variant===0)styles[name]=fingerprint;else {
        const offset=fingerprint.findIndex((value,index)=>JSON.stringify(value)!==JSON.stringify(styles[name][index]));
        equal(offset,-1,'computed styling mismatch element');
      }
      await exercise(name);
      await page.setViewportSize({width:390,height:850});
      const bounds=await specimen.locator(':scope > *').boundingBox();
      equal(bounds.x>=0 && bounds.x+bounds.width<=391,true,'390px root fits viewport');
      await page.setViewportSize({width:1000,height:850});
      rows.push({...current,passed:true});
    } catch(error) {rows.push({...current,passed:false,error:error.message});await page.setViewportSize({width:1000,height:850});}
  }
  for(const name of controlledNames) for(let variant=0;variant<4;variant++) {
    current={component:name,variant,controlled:true};
    try {
      await select(name,variant,true);await exercise(name);
      if(name==='ElasticTabs')await specimen.getByRole('tab').nth(2).click();
      if(name==='BauhausStepper')await specimen.getByRole('button').nth(2).click();
      if(['PostcardFlip','VinylDeck','OrigamiNav','SpringAccordion'].includes(name))await specimen.getByRole('button').nth(0).click();
      if(name==='NeonToggle'){await page.locator('#disabled').uncheck();await specimen.getByRole('switch').click();}
      await page.locator('#reset-model').click();
      if(name==='ElasticTabs')equal(await attr(specimen.getByRole('tab').nth(0),'aria-selected'),'true','external controlled reset');
      if(['OrbitSlider','PixelMeter'].includes(name))equal(await specimen.getByRole('slider').inputValue(),name==='OrbitSlider'?'60':'8','external controlled reset');
      if(name==='PaperNote')equal(await specimen.getByRole('textbox').inputValue(),'Make something worth keeping.','external controlled reset');
      if(name==='BubbleChoice')equal(await specimen.getByRole('radio').nth(0).isChecked(),true,'external controlled reset');
      if(name==='BauhausStepper')equal(await attr(specimen.getByRole('button').nth(0),'aria-current'),'step','external controlled reset');
      if(name==='NeonToggle')equal(await attr(specimen.getByRole('switch'),'aria-checked'),'false','external controlled reset');
      if(['PostcardFlip','VinylDeck'].includes(name))equal(await attr(specimen.getByRole('button'),'aria-pressed'),'false','external controlled reset');
      if(name==='OrigamiNav')equal(await attr(specimen.getByRole('button'),'aria-expanded'),'false','external controlled reset');
      if(name==='SpringAccordion')equal(await specimen.locator('[aria-expanded="true"]').count(),0,'external controlled reset');
      rows.push({...current,passed:true});
    }
    catch(error){rows.push({...current,passed:false,error:error.message});}
  }
  for(const name of ['ElasticTabs','SpringAccordion','ToastStack','MonoCommand','OrigamiNav','BauhausStepper','BubbleChoice']) for(let variant=0;variant<4;variant++) {
    current={component:name,variant,controlled:false,scenario:'empty and recovery'};
    try {
      await select(name,variant);await page.locator('#empty').check();
      if(name==='ElasticTabs')equal(await specimen.getByRole('tab').count(),0,'empty tabs');
      if(name==='SpringAccordion')equal(await specimen.getByRole('button').count(),0,'empty accordion');
      if(name==='ToastStack'){await page.waitForFunction(()=>document.querySelectorAll('#specimen button').length===0);equal((await specimen.textContent()).includes('All caught up.'),true,'empty notifications');}
      if(name==='MonoCommand')equal(await specimen.getByRole('button').count(),0,'empty commands');
      if(name==='OrigamiNav'){await specimen.getByRole('button').click();equal(await specimen.getByRole('link').count(),0,'empty open nav');}
      if(name==='BauhausStepper')equal((await specimen.textContent()).includes('No steps'),true,'empty steps');
      if(name==='BubbleChoice')equal(await specimen.getByRole('radio').count(),0,'empty radios');
      await page.locator('#empty').uncheck();
      const recovered=name==='ElasticTabs'?specimen.getByRole('tab'):name==='BubbleChoice'?specimen.getByRole('radio'):name==='OrigamiNav'?specimen.getByRole('link'):specimen.getByRole('button');
      equal((await recovered.count())>0,true,'data restored');rows.push({...current,passed:true});
    }catch(error){rows.push({...current,passed:false,error:error.message});}
  }
  for(const name of ['VinylDeck','TerminalStatus']) for(let variant=0;variant<4;variant++) {
    current={component:name,variant,controlled:false,scenario:'live reduced motion and offscreen'};
    try {
      await select(name,variant);await page.emulateMedia({reducedMotion:'no-preference'});
      if(name==='VinylDeck')await specimen.getByRole('button').click();else await page.locator('#status').selectOption('running');
      const target=name==='VinylDeck'?specimen.locator('div[aria-hidden="true"]').first():specimen.getByRole('status').locator('span');
      const field=name==='VinylDeck'?'transform':'opacity';
      const read=()=>target.evaluate((el,field)=>getComputedStyle(el)[field],field);
      await page.waitForTimeout(180);const first=await read();await page.waitForTimeout(220);equal((await read())!==first,true,'animation changes over time');
      await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);const stopped=await read();await page.waitForTimeout(160);equal(await read(),stopped,'live preference stops animation');
      if(name==='VinylDeck')equal(await attr(specimen.getByRole('button'),'aria-pressed'),'true','preference preserves rotation intent');else equal((await specimen.getByRole('status').textContent()).trim(),'RUNNING','preference preserves status');
      await page.emulateMedia({reducedMotion:'no-preference'});
      await specimen.evaluate(el=>el.style.marginTop='1400px');await page.waitForTimeout(100);const hidden=await read();await page.waitForTimeout(160);equal(await read(),hidden,'offscreen animation stopped');
      await specimen.evaluate(el=>el.style.marginTop='');await page.emulateMedia({reducedMotion:'reduce'});rows.push({...current,passed:true});
    }catch(error){rows.push({...current,passed:false,error:error.message});await specimen.evaluate(el=>el.style.marginTop='');await page.emulateMedia({reducedMotion:'reduce'});}
  }
  for(let variant=0;variant<4;variant++) {
    current={component:'RippleButton',variant,controlled:false,scenario:'bounded nodes and cleanup'};
    try {
      await select('RippleButton',variant);await page.emulateMedia({reducedMotion:'no-preference'});
      await specimen.getByRole('button').evaluate(el=>{for(let i=0;i<12;i++)el.click();});
      equal(await page.locator('#calls').textContent(),'12','rapid activation callbacks');
      const nodes=specimen.locator('span[aria-hidden="true"]');equal((await nodes.count())<=6,true,'ripple nodes bounded');
      await page.waitForFunction(()=>document.querySelectorAll('#specimen span[aria-hidden="true"]').length===0);
      equal(await nodes.count(),0,'animation nodes cleaned up');
      await page.emulateMedia({reducedMotion:'reduce'});await specimen.getByRole('button').click();equal(await nodes.count(),0,'reduced motion omits ripple');rows.push({...current,passed:true});
    }catch(error){rows.push({...current,passed:false,error:error.message});}
  }
  current={component:'global',variant:-1,controlled:false};
  equal(errors.length,0,'browser page errors');
  return {environment:'Windows Chromium, Vite dev caller :5291, real standalone files',total:rows.length,passed:rows.filter(row=>row.passed).length,failed:rows.filter(row=>!row.passed).length,skipped:0,assertions:assertions.length,assertionResults:assertions,assertionFailures:assertions.filter(row=>!row.passed),rows,errors};
}
