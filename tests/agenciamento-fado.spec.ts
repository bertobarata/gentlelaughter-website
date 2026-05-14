import { test, expect } from '@playwright/test';

test('agenciamento page has no PALOP / international claims', async ({ page }) => {
  await page.goto('/agenciamento.html');
  const html = (await page.content()).toLowerCase();
  expect(html).not.toContain('palop');
  expect(html).not.toContain('internacionais');
  expect(html).not.toContain('internacional');
});

test('agenciamento page mentions Vanessa Alves and fado', async ({ page }) => {
  await page.goto('/agenciamento.html');
  const main = (await page.locator('main').innerText()).toLowerCase();
  expect(main).toContain('vanessa alves');
  expect(main).toContain('fado');
});
