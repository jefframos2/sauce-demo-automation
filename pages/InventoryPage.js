import { ProductItem } from '../components/ProductItem';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
  }

  getProduct(itemName) {
    return new ProductItem(this.page, itemName);
  }

  async getAllProducts() {
    const itemsLocator = await this.inventoryList
      .locator('[data-test="inventory-item"]')
      .all();
    const items = [];

    for (const itemLocator of itemsLocator) {
      const itemName = await itemLocator
        .locator('[data-test="inventory-item-name"]')
        .innerText();
      const productItem = this.getProduct(itemName);
      const price = await productItem.getPrice();
      const priceNumber = parseFloat(price.replace('$', ''));
      const description = await productItem.getDescription();

      items.push({
        name: itemName,
        description,
        price: priceNumber,
      });
    }

    return items;
  }
}
