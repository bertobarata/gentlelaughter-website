import { test, expect } from '@playwright/test';

test('robots.txt exists', async ({ request }) => {
  const r = await request.get('/robots.txt');
  expect(r.status()).toBe(200);
  expect(await r.text()).toContain('Sitemap:');
});

test('sitemap.xml lists key pages', async ({ request }) => {
  const r = await request.get('/sitemap.xml');
  expect(r.status()).toBe(200);
  const body = await r.text();
  for (const p of ['/', 'agenciamento.html', 'livro.html', 'formulario.html']) {
    expect(body).toContain(p);
  }
});

test('home has LocalBusiness JSON-LD', async ({ page }) => {
  await page.goto('/');
  const jsonld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(jsonld).toContain('LocalBusiness');
  expect(jsonld).toContain('Gentle Laughter');
});

test('livro has Book JSON-LD', async ({ page }) => {
  await page.goto('/livro.html');
  const jsonld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(jsonld).toContain('"Book"');
});
