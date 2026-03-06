export class ProductItem {
  constructor(page, itemNameOrLocator) {
    this.page = page;

    if (typeof itemNameOrLocator === 'string') {
      this.container = page
        .locator('[data-test="inventory-item"]')
        .filter({
          has: page.locator('[data-test="inventory-item-name"]'),
        })
        .filter({
          hasText: itemNameOrLocator,
        });
    } else {
      this.container = itemNameOrLocator;
    }

    this.nameLocator = this.container.locator(
      '[data-test="inventory-item-name"]',
    );
    this.descriptionLocator = this.container.locator(
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
    return await this.descriptionLocator.innerText();
  }

  async getImage() {
    const src = await this.imageLocator.getAttribute('src');

    // handle missing src attribute
    if (!src) {
      throw new Error('Product image src attribute is missing');
    }

    // handle absolute src
    return new URL(src, this.page.url()).href;
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
