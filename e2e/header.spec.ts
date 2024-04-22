import { test, expect } from '@playwright/test';

test('should render header', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const text = page.getByRole('heading', { name: 'Build-A-Body' });

  expect(text).toBeTruthy();
});

test('should navigate', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const exerciseLink = page.getByTestId('link-Exercise');
  await exerciseLink.click();

  await page.waitForURL('**/exercise');

  expect(page.url()).toBe('http://localhost:3000/exercise');

  const mealLink = page.getByTestId('link-Meal');
  await mealLink.click();

  await page.waitForURL('**/meal');

  expect(page.url()).toBe('http://localhost:3000/meal');
});

test('should go to clerk auth', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const signInButton = page.getByRole('button', { name: 'Sign In' });
  await signInButton.click();

  expect(
    page.url().includes('https://enabling-firefly-24.accounts.dev/')
  ).toBeTruthy();
});
