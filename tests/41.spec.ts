import { test, expect } from '@playwright/test';

test('login with HTTP Auth and click navigation button', async ({ browser }) => {
  // Log in using HTTP Basic Auth
  const context = await browser.newContext({
    httpCredentials: {
      username: 'platforma',
      password: 'platforma99'
    }
  });

  const page = await context.newPage();
  const page1Promise = await context.newPage();

  await page.goto('https://www.ebay.com/', {
  });

  await page.getByRole('button', { name: 'Decline all privacy terms and' }).click();

  await page.getByRole('combobox', { name: 'Search for anything' }).click();
  await page.getByRole('combobox', { name: 'Search for anything' }).fill('gluee bladee');

  await page.getByRole('button', { name: 'Search', exact: true }).click();  

   await page.getByRole('link', { name: 'Gluee by Bladee (Record, 2023, 2nd Color Pressing) Opens in a new window or tab' }).click();
});
