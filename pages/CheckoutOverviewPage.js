import { ItemList } from '../components/ItemList';

const TAX_PERCENT = 0.08;

export class CheckoutOverviewPage extends ItemList {
  constructor(page) {
    super(page, page.locator('[data-test="cart-list"]'));

    this.container = page.locator('[data-test="checkout-summary-container"]');
    this.summaryInfoContainer = this.container.locator('.summary_info');
    this.paymentInfo = this.summaryInfoContainer.locator(
      '[data-test="payment-info-value"]',
    );
    this.shippingInfo = this.summaryInfoContainer.locator(
      '[data-test="shipping-info-value"]',
    );
    this.subTotal = this.summaryInfoContainer.locator(
      '[data-test="subtotal-label"]',
    );
    this.tax = this.summaryInfoContainer.locator('[data-test="tax-label"]');
    this.total = this.summaryInfoContainer.locator('[data-test="total-label"]');
    this.finishButton = this.summaryInfoContainer.locator(
      '[data-test="finish"]',
    );
    this.cancelButton = this.summaryInfoContainer.locator(
      '[data-test="cancel"]',
    );
  }

  async getPaymentInfoInSummary() {
    return await this.paymentInfo.innerText();
  }

  async getShippingInfoInSummary() {
    return await this.shippingInfo.innerText();
  }

  async getSubtotalInSummary() {
    const subtotalText = await this.subTotal.innerText();
    const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));

    return subtotal;
  }

  async getTaxInSummary() {
    const taxText = await this.tax.innerText();
    const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));

    return tax;
  }

  async getTotalInSummary() {
    const totalText = await this.total.innerText();
    const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

    return total;
  }

  async computeCartTotalBeforeTax() {
    const cartItems = await this.getAllProducts();
    let total = 0;

    for (const cartItem of cartItems) {
      total += cartItem.price;
    }

    return total;
  }

  async computeCartTotalAfterTax() {
    const cartTotalBeforeTax = await this.computeCartTotalBeforeTax();
    const tax = parseFloat((cartTotalBeforeTax * TAX_PERCENT).toFixed(2));

    return parseFloat((cartTotalBeforeTax + tax).toFixed(2));
  }

  async confirmCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
