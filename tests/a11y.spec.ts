import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/agenciamento.html', '/formulario.html', '/livro.html'];

for (const path of PAGES) {
  test(`${path} passes axe (wcag2a + wcag2aa)`, async ({ page }) => {
    await page.goto(path);
    await page.addStyleTag({ content: '.reveal { transition: none !important; opacity: 1 !important; transform: none !important; }' });
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    });
    await page.waitForTimeout(100);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('iframe')
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
