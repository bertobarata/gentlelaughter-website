import { test, expect } from '@playwright/test';

const PAGES = ['/', '/agenciamento.html', '/formulario.html', '/casos.html', '/parceiros.html'];

test.skip(!!process.env.CI, 'Visual snapshots are baselined on darwin only; skip on CI linux.');

for (const path of PAGES) {
  test(`visual baseline ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    });
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.02 });
  });
}
