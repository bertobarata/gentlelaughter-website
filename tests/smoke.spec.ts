import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/sobre.html',
  '/casos.html',
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
    const IGNORE = [
      /Permissions policy violation/i,
      /compute-pressure/i,
      /Button failed to load.*placard/i,
    ];
    const keep = (msg: string) => !IGNORE.some((re) => re.test(msg));
    page.on('pageerror', (e) => { if (keep(e.message)) errors.push(e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && keep(m.text())) errors.push(m.text()); });
    const resp = await page.goto(path);
    expect(resp?.status()).toBeLessThan(400);
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('footer.site-footer')).toBeVisible();
    expect(errors).toEqual([]);
  });
}
