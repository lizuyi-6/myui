async page => {
  await page.goto('http://127.0.0.1:5291/output/local-collection/r3/index.html');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:760,height:720});
  const names=['DepthLiftCard','PrismDeck','ApertureReveal','OrbitStage','ScrollTheater','BeamPath','KineticTiles','ConveyorGallery','LiquidAction','ShutterText'];
  const screenshots=[];
  for(const name of names){
    await page.mouse.move(1,1);
    await page.locator('#component').selectOption(name);await page.waitForTimeout(400);
    const root=page.locator('#specimen > div');const box=await root.boundingBox();
    if(name==='DepthLiftCard'){await page.mouse.move(box.x+box.width*0.85,box.y+box.height*0.32);}
    if(name==='PrismDeck'){await root.getByRole('tab').nth(1).click();}
    if(name==='ApertureReveal'){await root.hover();}
    if(name==='ScrollTheater'){await root.getByRole('button').last().click();}
    if(name==='KineticTiles'){await root.getByRole('button').nth(4).hover();}
    if(name==='LiquidAction'){await root.getByRole('button',{name:'Let’s make waves',exact:true}).hover();}
    await page.waitForTimeout(900);
    const path='output/local-collection/r3/'+name+'.png';await page.locator('#specimen').screenshot({path});screenshots.push(path);
    await page.waitForTimeout(name==='ShutterText'?3800:1600);
  }
  return {screenshots:screenshots.length,paths:screenshots,motion:'no-preference',source:'actual component DOM, pointer/tab/scroll actions, unmodified timing'};
}
