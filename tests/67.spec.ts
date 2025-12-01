import { test, expect } from '@playwright/test';

test('login with HTTP Auth and verify liczba usług', async ({ browser }) => {
  // --- CONFIG VARIABLE ---
  const MIN_USLUGI = 255;   // ← change this anytime

  const context = await browser.newContext({
    httpCredentials: {
      username: 'platforma',
      password: 'platforma99'
    }
  });

  const page = await context.newPage();

  await page.goto('https://pm.bydgoszcz.pl/', { waitUntil: 'networkidle' });

  // Accept cookies
  await page.getByRole('button', { name: 'Akceptuj cookies' }).click();

  // Open menu
 await page.locator('button').filter({ hasText: /^Menu$/ }).click();

  // Go to Katalog usług
  await page.getByRole('link', { name: 'Katalog usług', exact: true }).click();

  // --- GET LICZBA USŁUG ---
  const text = await page.locator('text=Liczba usług').innerText();  
  const value = Number(text.replace(/\D+/g, ''));

  // --- ASSERTION WITH VARIABLE ---
  expect(value, `Liczba usług jest za mała! Spodziewana ilość ≥ ${MIN_USLUGI}, otrzymana ilość: ${value}`)
    .toBeGreaterThanOrEqual(MIN_USLUGI);
});
