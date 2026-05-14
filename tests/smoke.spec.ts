import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/eventos.html',
  '/agenciamento.html',
  '/prestacao.html',
  '/efeitos-especiais.html',
  '/producao.html',
  '/aluguer.html',
  '/roulote.html',
  '/parceiros.html',
  '/livro.html',
  '/faq.html',
  '/formulario.html',
];

for (const path of PAGES) {
  test(`loads ${path} with no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    const resp = await page.goto(path);
    expect(resp?.status()).toBeLessThan(400);
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('footer.site-footer')).toBeVisible();
    expect(errors).toEqual([]);
  });
}
