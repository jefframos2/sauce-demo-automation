import { SidePanel } from './SidePanel';

export class PrimaryHeader {
  constructor(page) {
    this.page = page;
    this.container = page.locator('[data-test="primary-header"]');
    this.menuBtn = this.container.getByRole('button', { name: 'Open Menu' });
    this.headerTitle = this.container.locator('.app_logo');
    this.cartLocator = this.container.locator(
      '[data-test="shopping-cart-link"]',
    );
    this.cartBadgeLocator = this.cartLocator.locator(
      '[data-test="shopping-cart-badge"]',
    );
    this.sidePanel = new SidePanel(page);
  }

  async goToCart() {
    await this.cartLocator.click();
  }

  async getNumCartItems() {
    // handle no items in cart
    if ((await this.cartBadgeLocator.count()) === 0) {
      return 0;
    }
    return Number.parseInt(await this.cartBadgeLocator.innerText(), 10);
  }

  async openMenu() {
    await this.menuBtn.click();
    await this.sidePanel.waitUntilOpen();
  }
}
