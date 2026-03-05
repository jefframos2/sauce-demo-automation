export class SidePanel {
  constructor(page) {
    this.page = page;
    this.container = page.locator('.bm-menu-wrap');
    this.closeBtn = this.container.getByRole('button', { name: 'Close Menu' });
  }

  getLink(name) {
    return this.container.locator(`[data-test="${name}-sidebar-link"]`);
  }

  async waitUntilOpen() {
    await this.container.waitFor({ state: 'visible' });
  }

  async isMenuOpen() {
    return await this.container.isVisible();
  }

  async closeMenu() {
    if (await this.isMenuOpen()) {
      await this.closeBtn.click();
    }
  }

  async logout() {
    await this.getLink('logout').click();
  }

  async goToAllItems() {
    await this.getLink('inventory').click();
  }

  async goToAbout() {
    await this.getLink('about').click();
  }

  async resetAppState() {
    await this.getLink('reset').click();
  }
}
