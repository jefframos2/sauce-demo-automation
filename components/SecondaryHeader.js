import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

export class SecondaryHeader {
  constructor(page) {
    this.page = page;
    this.container = page.locator('[data-test="secondary-header"]');
    this.pagTitle = this.container.locator('[data-test="title"]');
    this.productSortContainer = this.container.locator(
      '[data-test="product-sort-container"]',
    );
    this.inventoryPage = new InventoryPage(this.page);
  }

  async sortBy(option) {
    await this.productSortContainer.selectOption({ label: option });
  }

  async #getAllProductNames() {
    const items = await this.inventoryPage.getAllProducts();
    const names = items.map((item) => item.name);

    return names;
  }

  async sortByNameAsc() {
    await this.sortBy('Name (A to Z)');

    const names = await this.#getAllProductNames();
    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);
  }

  async sortByNameDesc() {
    await this.sortBy('Name (Z to A)');

    const names = await this.#getAllProductNames();
    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
  }

  async #getAllProductPrices() {
    const items = await this.inventoryPage.getAllProducts();
    const prices = items.map((item) => item.price);

    return prices;
  }

  async sortByPriceAsc() {
    await this.sortBy('Price (low to high)');

    const prices = await this.#getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }

  async sortByPriceDesc() {
    await this.sortBy('Price (high to low)');

    const prices = await this.#getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  }
}
