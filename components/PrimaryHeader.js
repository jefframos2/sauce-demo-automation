export class PrimaryHeader {
  constructor(page) {
    this.page = page;
    this.container = page.locator('[data-test="primary-header"]');
    this.cartLocator = this.container.locator(
      '[data-test="shopping-cart-link"]',
    );
    this.cartBadgeLocator = this.cartLocator.locator(
      '[data-test="shopping-cart-badge"]',
    );
  }

  async goToCart() {
    await this.cartLocator.click();
  }

  async getNumCartItems() {
    return await this.cartBadgeLocator.innerText();
  }
}
