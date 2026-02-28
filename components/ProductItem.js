export class ProductItem {
  constructor(page, itemName) {
    this.page = page;
    this.container = page
      .locator('[data-test="inventory-item"]')
      .filter({
        has: page.locator('[data-test="inventory-item-name"]'),
      })
      .filter({
        hasText: itemName,
      });
    this.nameLocator = this.container.locator(
      '[data-test="inventory-item-name"]',
    );
    this.descripLocator = this.container.locator(
      '[data-test="inventory-item-desc"]',
    );
    this.imageLocator = this.container.locator('img.inventory_item_img');
    this.priceLocator = this.container.locator(
      '[data-test="inventory-item-price"]',
    );
    this.addToCartBtnLocator = this.container.getByRole('button', {
      name: 'Add to cart',
      exact: true,
    });
    this.removeFromCartBtnLocator = this.container.getByRole('button', {
      name: 'Remove',
      exact: true,
    });
  }

  async getName() {
    return await this.nameLocator.innerText();
  }

  async getDescription() {
    return await this.descripLocator.innerText();
  }

  async getImage() {
    const baseUrl = new URL(this.page.url()).origin;
    return `${baseUrl}${await this.imageLocator.getAttribute('src')}`;
  }

  async getPrice() {
    return await this.priceLocator.innerText();
  }

  async view() {
    await this.nameLocator.click();
  }

  async addToCart() {
    if (!(await this.isAddedToCart())) {
      await this.addToCartBtnLocator.click();
    }
  }

  async removeFromCart() {
    if (await this.isAddedToCart()) {
      await this.removeFromCartBtnLocator.click();
    }
  }

  async isAddedToCart() {
    return await this.removeFromCartBtnLocator.isVisible();
  }
}
