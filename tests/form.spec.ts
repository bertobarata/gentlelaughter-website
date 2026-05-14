import { test, expect } from '@playwright/test';

test('contact form has 4+1 fields (linha, mensagem, nome, contacto, rgpd)', async ({ page }) => {
  await page.goto('/formulario.html');
  await expect(page.locator('select#f-assunto')).toBeVisible();
  await expect(page.locator('textarea#f-msg')).toBeVisible();
  await expect(page.locator('input#f-nome')).toBeVisible();
  await expect(page.locator('input#f-contacto')).toBeVisible();
  await expect(page.locator('input[name="rgpd"]')).toHaveAttribute('type', 'checkbox');
  await expect(page.locator('input[name="apelido"]')).toHaveCount(0);
  await expect(page.locator('input[name="telefone"]')).toHaveCount(0);
  await expect(page.locator('input[name="email"]')).toHaveCount(0);
  await expect(page.locator('input[name="preferencia"]')).toHaveCount(0);
});

test('intent=guide pre-fills linha + mensagem', async ({ page }) => {
  await page.goto('/formulario.html?intent=guide');
  await expect(page.locator('select#f-assunto')).toHaveValue(/Guia de planeamento/);
  const msg = await page.locator('textarea#f-msg').inputValue();
  expect(msg.toLowerCase()).toContain('guia');
});

test('intent=vanessa-alves pre-fills agenciamento + reserva', async ({ page }) => {
  await page.goto('/formulario.html?intent=vanessa-alves');
  await expect(page.locator('select#f-assunto option:checked')).toContainText('Agenciamento');
  const msg = await page.locator('textarea#f-msg').inputValue();
  expect(msg.toLowerCase()).toContain('vanessa');
});
