import { ItemList } from '../components/ItemList';

export class CartPage extends ItemList {
  constructor(page) {
    super(page, page.locator('[data-test="cart-list"]'));
    this.page = page;
    this.container = page.locator('[data-test="cart-contents-container"]');
    this.continueShoppingButton = this.container.locator(
      '[data-test="continue-shopping"]',
    );
    this.checkoutButton = this.container.locator('[data-test="checkout"]');
  }

  async removeItemFromCart(itemNameOrLocator) {
    await this.getProduct(itemNameOrLocator).removeFromCart();
  }

  async removeAllItemsFromCart() {
    const cartItems = await this.getAllProducts();
    console.log(cartItems);

    for (const cartItem of cartItems) {
      await this.removeItemFromCart(cartItem.name);
    }
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
