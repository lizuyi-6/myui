// Replay with playwright-cli run-code --filename=scripts/verify-components.js.
// This exercises the built page through public controls, without React test hooks.
async page => {
  const checks = [];
  const errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  const check = (name, actual, expected) => {
    checks.push({ name, actual, expected, passed: JSON.stringify(actual) === JSON.stringify(expected) });
  };
  const settle = async () => {
    await page.waitForFunction(() => [...document.querySelectorAll('#components article')].every(element => Number(getComputedStyle(element).opacity) > 0.99));
  };
  const state = async () => ({
    tab: await page.locator('#components [role=tab][aria-selected=true]').textContent(),
    slider: await page.getByRole('slider', { name: '动效强度' }).inputValue(),
    ripple: await page.locator('#components article').nth(2).getByRole('status').textContent(),
    accordion: await page.locator('#components article').nth(3).locator('button[aria-expanded=true]').textContent(),
    flip: await page.locator('#components article').nth(5).locator('button').getAttribute('aria-pressed'),
    toasts: await page.locator('#components article').nth(4).getByRole('button', { name: /^关闭提示/ }).count()
  });
  try {
    await page.setViewportSize({ width: 1440, height: 1600 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('http://127.0.0.1:5288/');
    const gallery = page.locator('#components');
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#components').getBoundingClientRect().top + window.scrollY - 96, behavior: 'instant' }));
    await settle();
    check('six demos mounted', await gallery.locator('article').count(), 6);
    check('component navigation targets gallery', await page.getByRole('link', { name: '组件', exact: true }).getAttribute('href'), '#components');
    check('catalog total is 24 existing + 6 new', (await page.locator('header').textContent()).includes('30 个组件'), true);

    const tab = name => gallery.getByRole('tab', { name, exact: true });
    check('initial tab selected', await tab('手感').getAttribute('aria-selected'), 'true');
    await tab('色彩').click();
    check('tab click selects color', await tab('色彩').getAttribute('aria-selected'), 'true');
    check('inactive tab panel hidden', await gallery.locator('[role=tabpanel]').nth(0).getAttribute('hidden'), '');
    await tab('色彩').press('ArrowRight');
    check('tab arrow selects rhythm', await tab('节奏').getAttribute('aria-selected'), 'true');
    check('tab arrow transfers focus', await tab('节奏').evaluate(element => element === document.activeElement), true);
    await tab('节奏').press('Home');
    check('tab Home selects first', await tab('手感').getAttribute('aria-selected'), 'true');
    await tab('手感').press('ArrowLeft');
    check('tab arrow wraps to last', await tab('节奏').getAttribute('aria-selected'), 'true');

    const slider = gallery.getByRole('slider', { name: '动效强度' });
    await slider.focus();
    await slider.press('Home');
    check('slider Home reaches lower bound', await slider.inputValue(), '0');
    await slider.press('ArrowLeft');
    check('slider cannot go below lower bound', await slider.inputValue(), '0');
    await slider.press('ArrowRight');
    check('slider keyboard steps by one', await slider.inputValue(), '1');
    await slider.press('End');
    check('slider End reaches upper bound', await slider.inputValue(), '100');
    await slider.press('ArrowRight');
    check('slider cannot go above upper bound', await slider.inputValue(), '100');
    check('slider accessible value matches state', await slider.getAttribute('aria-valuetext'), '100%');

    const ripple = gallery.getByRole('button', { name: '点亮一圈涟漪' });
    await ripple.click();
    await ripple.click();
    await ripple.press('Enter');
    check('ripple mouse and keyboard count', await gallery.locator('article').nth(2).getByRole('status').textContent(), '回应了 3 次点击');
    await page.waitForFunction(() => document.querySelector('#components article:nth-child(3) button').querySelectorAll('span[style]').length === 0);
    check('ripple nodes cleaned after animation', await ripple.locator('span[style]').count(), 0);

    const accordion = gallery.locator('article').nth(3);
    const first = accordion.getByRole('button', { name: '为什么回弹让人想再点一次？' });
    const second = accordion.getByRole('button', { name: '换个主题会怎样？' });
    await second.click();
    check('accordion opens selected item', await second.getAttribute('aria-expanded'), 'true');
    check('accordion closes previous item', await first.getAttribute('aria-expanded'), 'false');
    check('collapsed accordion content is inert', await accordion.locator('[role=region]').nth(0).evaluate(element => element.inert), true);
    await second.click();
    check('accordion permits all collapsed', await accordion.locator('button[aria-expanded=true]').count(), 0);
    await second.press('Enter');
    check('accordion keyboard reopens item', await second.getAttribute('aria-expanded'), 'true');

    const flip = gallery.locator('article').nth(5);
    await flip.getByRole('button', { name: '翻到背面' }).click();
    check('flip state reflects reverse', await flip.locator('button').getAttribute('aria-pressed'), 'true');
    check('flip front hidden from assistive technology', await flip.locator('[aria-hidden=true][inert]').count(), 1);
    await flip.getByRole('button', { name: '翻到正面' }).press('Enter');
    check('flip keyboard returns to front', await flip.locator('button').getAttribute('aria-pressed'), 'false');

    const toast = gallery.locator('article').nth(4);
    for (let index = 0; index < 6; index++) await toast.getByRole('button', { name: '添加一条提示' }).click();
    check('toast bounded after repeated additions', await toast.getByRole('button', { name: /^关闭提示/ }).count(), 3);
    await toast.getByRole('button', { name: /^关闭提示/ }).first().focus();
    for (let index = 0; index < 3; index++) await toast.getByRole('button', { name: /^关闭提示/ }).first().click();
    check('toast dismissal removes all items', await toast.getByRole('button', { name: /^关闭提示/ }).count(), 0);
    check('toast empty stack retains keyboard focus', await toast.locator('[data-toast-stack]').evaluate(element => element === document.activeElement), true);
    check('toast empty state rendered', await toast.getByText('提示已清空，再添加一条试试。').isVisible(), true);
    await toast.getByRole('button', { name: '添加一条提示' }).click();
    check('toast can recover from empty state', await toast.getByRole('button', { name: /^关闭提示/ }).count(), 1);

    const before = await state();
    const themes = [
      ['暖阳', '#FFF8F0', 'rgb(255, 107, 74)', 'warm'],
      ['青柠汽水', '#F1FBF5', 'rgb(13, 191, 119)', 'mint'],
      ['蜜桃日落', '#1E1216', 'rgb(255, 122, 77)', 'peach'],
      ['经典深夜', '#030014', 'rgb(167, 139, 250)', 'midnight']
    ];
    for (const [name, background, accent, filename] of themes) {
      await page.getByRole('button', { name: `切换配色：${name}`, exact: true }).click();
      await page.waitForFunction(expected => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() === expected, background);
      check(`theme ${name} background`, await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()), background);
      check(`theme ${name} orbit inherits accent`, await gallery.locator('article').nth(1).locator('circle').nth(1).evaluate(element => getComputedStyle(element).stroke), accent);
      check(`theme ${name} retains all demo states`, await state(), before);
      await page.evaluate(() => window.scrollTo({ top: document.querySelector('#components').getBoundingClientRect().top + window.scrollY - 96, behavior: 'instant' }));
      await settle();
      await gallery.screenshot({ path: `output/playwright/components-${filename}.png`, animations: 'disabled' });
    }

    await gallery.getByRole('button', { name: '重置试玩' }).click();
    check('reset restores all six defaults', await state(), {
      tab: '手感', slider: '60', ripple: '从你按下的位置，轻轻扩散', accordion: '为什么回弹让人想再点一次？+', flip: 'false', toasts: 2
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await gallery.getByRole('button', { name: '重置试玩' }).scrollIntoViewIfNeeded();
    await settle();
    check('mobile document has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    const boxes = await gallery.locator('article').evaluateAll(elements => elements.map(element => ({ left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right })));
    check('mobile all demos fit viewport', boxes.every(box => box.left >= 0 && box.right <= 390), true);
    check('mobile gallery has one column', new Set(boxes.map(box => Math.round(box.left))).size, 1);
    await tab('色彩').click();
    check('mobile tabs remain interactive', await tab('色彩').getAttribute('aria-selected'), 'true');
    await page.screenshot({ path: 'output/playwright/components-mobile.png', animations: 'disabled' });

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gallery.getByRole('button', { name: '点亮一圈涟漪' }).click();
    check('reduced motion preference active', await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), true);
    check('reduced motion omits decorative ripple', await gallery.getByRole('button', { name: '点亮一圈涟漪' }).locator('span[style]').count(), 0);
    check('reduced motion keeps click response', await gallery.locator('article').nth(2).getByRole('status').textContent(), '回应了 1 次点击');
    check('live motion preference retains tab selection', await tab('色彩').getAttribute('aria-selected'), 'true');
    await gallery.getByRole('button', { name: '翻到背面' }).click();
    check('reduced motion keeps flip interaction', await gallery.locator('article').nth(5).locator('button').getAttribute('aria-pressed'), 'true');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await gallery.getByRole('button', { name: '点亮一圈涟漪' }).click();
    check('motion preference toggles live without losing state', await gallery.locator('article').nth(2).getByRole('status').textContent(), '回应了 2 次点击');
    check('motion preference restores decorative ripple', await gallery.getByRole('button', { name: '点亮一圈涟漪' }).locator('span[style]').count() > 0, true);
    check('browser runtime errors', errors, []);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 1600 });
    await page.goto('http://127.0.0.1:5288/');
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#components').getBoundingClientRect().top + window.scrollY - 96, behavior: 'instant' }));
    await settle();
    const failed = checks.filter(item => !item.passed);
    const result = { environment: 'Windows / Chrome / Vite production preview :5288', total: checks.length, passed: checks.length - failed.length, failed: failed.length, skipped: 0, checks };
    if (failed.length) throw new Error(JSON.stringify(result));
    return result;
  } finally {
    page.off('pageerror', onError);
  }
}
