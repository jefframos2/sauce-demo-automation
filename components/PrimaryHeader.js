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
    if ((await this.cartBadgeLocator.count()) === 0) {
      return 0;
    }
    return Number.parseInt(await this.cartBadgeLocator.innerText(), 10);
  }
}
