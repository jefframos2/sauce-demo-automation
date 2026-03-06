import { ProductItem } from '../components/ProductItem';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
  }

  getProduct(itemNameOrLocator) {
    return new ProductItem(this.page, itemNameOrLocator);
  }

  async getAllProducts() {
    const itemsLocator = await this.inventoryList
      .locator('[data-test="inventory-item"]')
      .all();
    const items = [];

    for (const itemLocator of itemsLocator) {
      const productItem = this.getProduct(itemLocator);
      const itemName = await productItem.getName();
      const priceText = await productItem.getPrice();
      const priceNumber = parseFloat(priceText.replace('$', ''));

      if (isNaN(priceNumber)) {
        throw new Error(
          `Failed to parse price for product: ${itemName}, raw value: "${priceText}"`,
        );
      }

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
