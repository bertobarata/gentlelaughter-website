import { test, expect } from '@playwright/test';

test.use({ ...require('@playwright/test').devices['iPhone 14'] });

const PAGES = ['/', '/eventos.html', '/formulario.html'];

for (const path of PAGES) {
  test(`buttons on ${path} are ≥44px tall`, async ({ page }) => {
    await page.goto(path);
    const btns = await page.locator('.btn, button.cookie-btn, .nav-toggle').all();
    for (const b of btns) {
      if (!(await b.isVisible())) continue;
      const box = await b.boundingBox();
      if (!box) continue;
      expect(box.height, `button height on ${path}`).toBeGreaterThanOrEqual(44);
    }
  });
}
