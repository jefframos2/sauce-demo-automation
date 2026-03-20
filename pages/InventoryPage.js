import { ItemList } from '../components/ItemList';

export class InventoryPage extends ItemList {
  constructor(page) {
    super(page, page.locator('[data-test="inventory-list"]'));
  }
}
