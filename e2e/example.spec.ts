import { test, expect } from '@playwright/test';

test('render page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const text = page.getByRole('heading', { name: 'Hello World' });

  await expect(text).toBeTruthy();
});
