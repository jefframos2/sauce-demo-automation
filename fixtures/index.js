import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PrimaryHeader } from '../components/PrimaryHeader';
import { SecondaryHeader } from '../components/SecondaryHeader';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  primaryHeader: async ({ page }, use) => {
    await use(new PrimaryHeader(page));
  },

  secondaryHeader: async ({ page }, use) => {
    await use(new SecondaryHeader(page));
  },
});

export { expect } from '@playwright/test';
