import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/agenciamento.html', '/formulario.html', '/livro.html'];

for (const path of PAGES) {
  test(`${path} passes axe (wcag2a + wcag2aa)`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}
