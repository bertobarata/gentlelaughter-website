import { test, expect } from '@playwright/test';

const PAGES = ['/', '/agenciamento.html', '/formulario.html', '/livro.html', '/parceiros.html'];

for (const path of PAGES) {
  test(`${path} has no {{...}} placeholders`, async ({ page }) => {
    await page.goto(path);
    const html = await page.content();
    expect(html).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });
}
