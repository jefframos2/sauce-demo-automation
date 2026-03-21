import { URLS } from '../constants/urls';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginPageLogo = this.page.locator('.login_logo');
    this.container = this.page.locator('[data-test="login-container"]');
    this.loginForm = this.container.locator('div.login-box form');
    this.usernameField = this.loginForm.locator('[data-test="username"]');
    this.passwordField = this.loginForm.locator('[data-test="password"]');
    this.loginButton = this.loginForm.locator('[data-test="login-button"]');

    this.usernameFieldErrorIcon = this.loginForm.locator(
      '[data-test="username"] + svg',
    );
    this.passwordFieldErrorIcon = this.loginForm.locator(
      '[data-test="password"] + svg',
    );

    this.errorMessageContainer = this.loginForm.locator(
      '.error-message-container',
    );
    this.errorMessage = this.errorMessageContainer.locator(
      '[data-test="error"]',
    );
    this.clearErrorMessageButton = this.errorMessage.locator(
      '[data-test="error-button"]',
    );
  }

  async goTo() {
    await this.page.goto(URLS.LOGIN);
  }

  async login({ username, password }) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async clearErrorMessage() {
    await this.clearErrorMessageButton.click();
  }
}
