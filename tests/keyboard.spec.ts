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

test('mobile nav toggle opens in-place overlay (menu.html stays as no-JS fallback)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  // Overlay opens in place — URL unchanged, body.nav-open set, menu-nav visible inside overlay.
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('body.nav-open')).toBeVisible();
  await expect(page.locator('.nav-overlay .menu-nav')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  // Second tap closes.
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
