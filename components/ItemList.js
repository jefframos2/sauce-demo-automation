import { ProductItem } from '../components/ProductItem';

export class ItemList {
  constructor(page, listLocator) {
    this.page = page;
    this.listLocator = listLocator;
  }

  getProduct(itemNameOrLocator) {
    return new ProductItem(this.page, itemNameOrLocator, this.listLocator);
  }

  async getAllProducts() {
    const itemsLocator = await this.listLocator
      .locator('[data-test="inventory-item"]')
      .all();
    const items = [];

    for (const itemLocator of itemsLocator) {
      const productItem = this.getProduct(itemLocator);
      const itemName = await productItem.getName();
      const priceText = await productItem.getPrice();
      const match = /^\$(\d+(?:\.\d{2})?)$/.exec(priceText.trim());

      if (!match) {
        throw new Error(
          `Failed to parse price for product: ${itemName}, raw value: "${priceText}"`,
        );
      }

      const priceNumber = Number(match[1]);

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
