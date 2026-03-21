export class CheckoutInfoPage {
  constructor(page) {
    this.page = page;
    this.container = page.locator('[data-test="checkout-info-container"]');
    this.checkoutForm = this.container.locator('form');
    this.firstNameField = this.checkoutForm.locator('[data-test="firstName"]');
    this.lastNameField = this.checkoutForm.locator('[data-test="lastName"]');
    this.zipCodeField = this.checkoutForm.locator('[data-test="postalCode"]');
    this.submitButton = this.container.locator('[data-test="continue"]');
    this.cancelButton = this.container.locator('[data-test="cancel"]');
  }

  async fillOutForm({ firstName, lastName, zipCode }) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.zipCodeField.fill(zipCode);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
