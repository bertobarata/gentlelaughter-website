import { test, expect } from '@playwright/test';

const BANNED = [
  /\b24\/7\b/,
  /produção premium/i,
  /execução silenciosa/i,
  /sem ruído/i,
  /rigor gentle laughter/i,
  /\bPALOP\b/,
  /artistas internacionais/i,
  /Cliente 0\d/,
  /Festival Tejo/,
  /Galeria em breve/,
];

const PAGES = ['/', '/agenciamento.html', '/eventos.html', '/parceiros.html', '/livro.html', '/faq.html', '/casos.html', '/sobre.html'];

for (const path of PAGES) {
  test(`${path} has no banned phrases`, async ({ page }) => {
    await page.goto(path);
    const body = (await page.locator('main').innerText()).replace(/\s+/g, ' ');
    for (const re of BANNED) expect(body).not.toMatch(re);
  });
}
