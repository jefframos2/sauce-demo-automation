export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.container = page.locator('[data-test="checkout-complete-container"]');
    this.orderCompleteHeader = this.container.locator(
      '[data-test="complete-header"]',
    );
    this.orderCompleteText = this.container.locator(
      '[data-test="complete-text"]',
    );
    this.backToHomeButton = this.container.locator(
      '[data-test="back-to-products"]',
    );
  }

  async getOrderCompleteHeader() {
    return await this.orderCompleteHeader.innerText();
  }

  async getOrderCompleteText() {
    return await this.orderCompleteText.innerText();
  }

  async goBackToHome() {
    await this.backToHomeButton.click();
  }
}
