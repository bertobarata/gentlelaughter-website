import { test, expect } from '@playwright/test';

test('every focusable shows visible focus ring on /formulario.html', async ({ page }) => {
  await page.goto('/formulario.html');
  const focusables = page.locator('a, button, input, select, textarea').filter({ hasNot: page.locator('[disabled]') });
  const n = await focusables.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < Math.min(n, 12); i++) {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const a = document.activeElement as HTMLElement | null;
      if (!a) return null;
      const s = getComputedStyle(a);
      return { width: s.outlineWidth, style: s.outlineStyle, color: s.outlineColor };
    });
    expect(outline, `Tab ${i + 1} has no active element`).not.toBeNull();
  }
});

test('mobile nav toggle navigates to /menu.html', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page).toHaveURL(/\/menu\.html$/);
  await expect(page.locator('.menu-nav')).toBeVisible();
});
