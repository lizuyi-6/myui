async page => {
  const fields=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
  const check=(name,actual,expected)=>{fields.push({name,actual,expected,passed:JSON.stringify(actual)===JSON.stringify(expected)});};
  await page.goto('http://127.0.0.1:5292/motion-index.html');await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1200,height:850});await page.mouse.move(1,1);await page.waitForTimeout(400);
  check('both installed components render',await page.locator('[data-motion]').count(),2);
  check('installed CSS background',await page.locator('#beam > div').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(13, 25, 23)');
  const packet=page.locator('#beam svg path[stroke="var(--lc-accent)"]').first();const before=await packet.evaluate(el=>getComputedStyle(el).strokeDashoffset);await page.waitForTimeout(500);check('installed beam packet moves',await packet.evaluate(el=>getComputedStyle(el).strokeDashoffset)!==before,true);
  const button=page.getByRole('button',{name:'Installed action',exact:true});await button.click();check('installed pointer callback',await page.locator('#count').textContent(),'1');await button.press('Enter');check('installed keyboard callback',await page.locator('#count').textContent(),'2');
  await page.locator('#beam button[aria-label="Pause animation"]').click();await page.waitForTimeout(200);const stopped=await packet.evaluate(el=>getComputedStyle(el).strokeDashoffset);await page.waitForTimeout(400);check('installed pause stops actual packet',await packet.evaluate(el=>getComputedStyle(el).strokeDashoffset),stopped);
  check('page errors',errors,[]);
  return {environment:'Windows Chromium :5292; real jsrepo-installed TS-CSS; React/Motion dependencies from independent install project; no host theme',total:fields.length,passed:fields.filter(field=>field.passed).length,failed:fields.filter(field=>!field.passed).length,skipped:0,fields,errors};
}
