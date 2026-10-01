async (page) => {
  const names=['ElasticTabs','OrbitSlider','RippleButton','SpringAccordion','ToastStack','PostcardFlip','ArcadeButton','PaperNote','BauhausStepper','NeonToggle','VinylDeck','BubbleChoice','MonoCommand','PixelMeter','OrigamiNav','TerminalStatus','RibbonBadge','BlueprintPanel'];
  const category=name=>['BauhausStepper','VinylDeck','MonoCommand','OrigamiNav','BlueprintPanel'].includes(name)?'components':'micro';
  const slug=name=>name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
  const rows=[],errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const name of names) {
    try {
      await page.goto(`http://127.0.0.1:5290/${category(name)}/${slug(name)}`);
      const marker=page.locator(`[data-local-component="${name}"]`);
      await marker.waitFor({state:'visible'});
      const childCount=await marker.locator(':scope > *').count();
      if(childCount<1)throw new Error('preview component missing');
      const props=(await page.locator('table').allTextContents()).join(' ');
      if(!props.includes('accent') || !props.includes('className'))throw new Error('props table missing common API');
      await page.locator('[data-scope="tabs"][data-part="trigger"][data-value="code"]').click();
      const code=page.locator('pre');await code.first().waitFor();
      const content=(await code.allTextContents()).join('\n');
      if(!content.includes(`export default function ${name}`))throw new Error('actual component source missing');
      if(!content.includes(`import ${name}`))throw new Error('usage import missing');
      const item=await page.evaluate(async name=>await(await fetch(`/r/${name}-TS-CSS.json`)).json(),name);
      if(item.name!==name+'-TS-CSS'||item.files.length!==2||item.meta?.origin!=='local')throw new Error('installed registry endpoint shape mismatch');
      rows.push({component:name,passed:true,checks:['production preview rendered','props table','actual source','usage import','registry endpoint local provenance']});
    }catch(error){rows.push({component:name,passed:false,error:error.message});}
  }
  return {environment:'Windows Chromium, production Vite preview :5290',total:rows.length,passed:rows.filter(row=>row.passed).length,failed:rows.filter(row=>!row.passed).length,skipped:0,errors,rows};
}
