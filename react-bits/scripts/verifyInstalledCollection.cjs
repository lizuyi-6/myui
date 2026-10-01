async (page) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:5292');
  const button=page.getByRole('button',{name:'INSTALLED COMPONENT',exact:true});await button.waitFor();
  const rows=[];
  const equal=(actual,expected,field)=>{rows.push({field,actual,expected,passed:actual===expected});};
  equal(await button.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 184, 62)','installed stylesheet background');
  equal(await button.evaluate(el=>getComputedStyle(el).fontSize),'17px','installed stylesheet typography');
  await button.click();equal(await page.locator('#count').textContent(),'1','installed pointer callback');
  await button.press('Enter');equal(await page.locator('#count').textContent(),'2','installed keyboard callback');
  equal(errors.length,0,'page errors');
  return {environment:'Windows Chromium, separate installed project :5292, no host theme or Tailwind',total:rows.length,passed:rows.filter(row=>row.passed).length,failed:rows.filter(row=>!row.passed).length,skipped:0,rows,errors};
}
