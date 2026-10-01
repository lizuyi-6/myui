async page => {
  const images=[];
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:1000});
  for(const [route,name,ready] of [['/','home','.stage-demo [role=tab]'],['/components','catalog','.component-card'],['/styles','styles','.lab-note textarea'],['/docs/ai','docs','.doc-article'],['/about','about','.about-page'],['/components/react-bits-prism-deck','detail','.demo-PrismDeck [role=tab]']]) {
    await page.goto('http://127.0.0.1:5300'+route);
    await page.locator(ready).first().waitFor();
    await page.waitForTimeout(350);
    await page.screenshot({path:`output/playwright/${name}-desktop.png`,fullPage:true});
    if(route==='/') await page.screenshot({path:'output/playwright/home-hero.png'});
    images.push({route,width:1440,path:`output/playwright/${name}-desktop.png`});
  }
  await page.setViewportSize({width:390,height:844});
  for(const [route,name,ready] of [['/','home','.stage-demo [role=tab]'],['/styles','styles','.lab-note textarea']]) {
    await page.goto('http://127.0.0.1:5300'+route);
    await page.locator(ready).first().waitFor();
    await page.waitForTimeout(350);
    await page.screenshot({path:`output/playwright/${name}-mobile.png`,fullPage:true});
    images.push({route,width:390,path:`output/playwright/${name}-mobile.png`});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:5300/');
  return {images,scope:'Rendered UI only; screenshots do not prove callbacks or data integrity.'};
}
