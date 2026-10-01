async page => {
  const names=['DepthLiftCard','PrismDeck','ApertureReveal','OrbitStage','ScrollTheater','BeamPath','KineticTiles','ConveyorGallery','LiquidAction','ShutterText'];
  const rows=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const name of names){try{
    const slug=name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
    await page.goto('http://127.0.0.1:5290/components/'+slug);
    const marker=page.locator('[data-local-component="'+name+'"]');await marker.waitFor({state:'visible'});
    const parts=await marker.locator('[data-part]').count();if(parts<2)throw new Error('actual component parts missing');
    const tables=(await page.locator('table').allTextContents()).join(' ');if(!tables.includes('accent')||!tables.includes('className'))throw new Error('props table missing');
    await page.locator('[data-scope="tabs"][data-part="trigger"][data-value="code"]').click();
    const source=(await page.locator('pre').allTextContents()).join('\n');if(!source.includes('export default function '+name)||!source.includes('import '+name))throw new Error('code/usage missing');
    const registry=await page.evaluate(async name=>await(await fetch('/r/'+name+'-TS-CSS.json')).json(),name);
    if(registry.name!==name+'-TS-CSS'||registry.meta?.origin!=='local'||registry.files.length!==2)throw new Error('registry fields mismatch');
    rows.push({component:name,passed:true,fields:{previewParts:parts,propTable:true,codeAndUsage:true,registryName:registry.name,origin:registry.meta.origin,files:registry.files.length}});
  }catch(error){rows.push({component:name,passed:false,error:error.message});}}
  return {environment:'Windows Chromium, production Vite preview :5290, normal motion',total:rows.length,passed:rows.filter(row=>row.passed).length,failed:rows.filter(row=>!row.passed).length,skipped:0,errors,rows};
}
