import { test, expect } from '../fixtures/index';
import { URLS } from '../constants/urls';
import { USERS } from '../constants/users';
import { ERROR_MESSAGES } from '../constants/messages';
import { APP_LABELS, PAGE_TITLES } from '../constants/labels';

test.describe('Login', () => {
  test('should redirect to inventory page when logging in with valid credentials', async ({
    page,
    loginPage,
    primaryHeader,
    secondaryHeader,
  }) => {
    await loginPage.goTo();

    await loginPage.login(USERS.STANDARD);

    await expect(page).toHaveURL(URLS.INVENTORY);

    await expect(primaryHeader.headerTitle).toHaveText(APP_LABELS.HEADER);
    await expect(secondaryHeader.pagTitle).toHaveText(PAGE_TITLES.INVENTORY);
  });

  test('should show error when logging in with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.goTo();

    await loginPage.login(USERS.INVALID);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  });

  test('should show error when logging in with locked out user', async ({
    loginPage,
  }) => {
    await loginPage.goTo();

    await loginPage.login(USERS.LOCKED_OUT);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.LOCKED_OUT_USER,
    );
  });
});

test.describe('Logout', () => {
  test('should redirect to login page after logging out', async ({
    page,
    loginPage,
    primaryHeader,
    sidePanel,
  }) => {
    await loginPage.goTo();

    await loginPage.login(USERS.STANDARD);
    await primaryHeader.openMenu();
    await sidePanel.logout();

    await expect(page).toHaveURL(URLS.LOGIN);
    await expect(loginPage.loginPageLogo).toHaveText(APP_LABELS.HEADER);
  });
});
