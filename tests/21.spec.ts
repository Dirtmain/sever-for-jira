import { test, expect } from '@playwright/test';

test('Check Bladee Gluee vinyl price', async ({ page }) => {
  await page.goto('https://www.ebay.com');

  await page.getByRole('button', { name: 'Decline all privacy terms and' }).click();
  await page.getByRole('combobox', { name: 'Search for anything' }).click();
  await page.getByRole('combobox', { name: 'Search for anything' }).fill('gluee bladee');

  // wait for results
  const firstPriceText = await page.locator('.s-item__price').first().innerText();

  // extract number
  const price = Number(firstPriceText.replace(/[^0-9.]/g, ''));

  if (price > 40) {
    throw new Error(`Too expensive! First result costs $${price}.`);
  }

  // or using expect:
  // expect(price, 'Too expensive!').toBeLessThanOrEqual(40);
});
