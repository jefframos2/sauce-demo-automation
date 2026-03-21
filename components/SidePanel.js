import { expect } from '@playwright/test';

export class SidePanel {
  constructor(page) {
    this.page = page;
    this.container = page.locator('.bm-menu-wrap');
    this.closeBtn = this.container.getByRole('button', { name: 'Close Menu' });
  }

  #getLink(name) {
    return this.container.locator(`[data-test="${name}-sidebar-link"]`);
  }

  async waitUntilOpen() {
    await expect(this.container).toBeInViewport();
  }

  async isMenuOpen() {
    const ariaHidden = await this.container.getAttribute('aria-hidden');
    return ariaHidden === 'false';
  }

  async closeMenu() {
    if (await this.isMenuOpen()) {
      await this.closeBtn.click();
      await expect(this.container).not.toBeInViewport();
    }
  }

  async logout() {
    await this.#getLink('logout').click();
  }

  async goToAllItems() {
    await this.#getLink('inventory').click();
  }

  async goToAbout() {
    await this.#getLink('about').click();
  }

  async resetAppState() {
    await this.#getLink('reset').click();
  }
}
