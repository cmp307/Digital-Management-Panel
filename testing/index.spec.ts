import { test, expect } from '@playwright/test';

test('can make connection to /index.html', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173');
  await expect(page).toHaveTitle('ScottishGlen - Asset & Employee Management Panel');
});

test('can nagivate to /assets.html', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173');
  await page.getByText('View & Manage Assets').click();
  const title = page.getByTestId('page-title');
  await expect(title).toContainText('Asset Management Panel')
});