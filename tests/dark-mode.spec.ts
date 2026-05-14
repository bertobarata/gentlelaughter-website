import { test, expect } from '@playwright/test';

test.use({ colorScheme: 'dark' });

test('home renders dark with parchment ink on near-black paper', async ({ page }) => {
  await page.goto('/');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // Expect a dark-ish color (RGB sum < 200)
  const m = bg.match(/\d+/g)!.map(Number);
  expect(m[0] + m[1] + m[2]).toBeLessThan(200);
});

test('theme-color meta has dark variant', async ({ page }) => {
  await page.goto('/');
  const dark = await page.locator('meta[name="theme-color"][media*="dark"]').getAttribute('content');
  expect(dark).toBe('#1c1916');
});
