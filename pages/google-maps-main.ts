import { type Locator, type Page } from '@playwright/test';

export class GoogleMapsMain {
  readonly page: Page;
  readonly acceptTcButton: Locator;
  readonly searchboxInput: Locator;
  readonly searchboxSubmitButton: Locator;
  readonly tocList: Locator;
  readonly directionsButton: Locator;
  readonly directionsOmnibox: Locator;
  readonly directionsSearchboxTo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptTcButton = page.getByRole('button', { name: 'Accept all' });
    this.searchboxInput = page.locator('//*[@id="searchboxinput"]');
    this.searchboxSubmitButton = page.locator('//*[@id="searchbox-searchbutton"]');
    this.tocList = page.locator('article div.markdown ul > li > a');
    this.directionsButton = page.locator('//*[@data-value="Directions"]');
    this.directionsOmnibox = page.locator('//*[@id="omnibox-directions"]')
    this.directionsSearchboxTo = page.locator('//*[@id="directions-searchbox-1"]//input')
  }

  async goto() {
    await this.page.goto('https://www.google.com/maps?hl=en');
  }

  async acceptTnC() {
    const isTcVisible = await this.acceptTcButton.isVisible();
    if(isTcVisible){
        await this.acceptTcButton.click();
    }
  }

  async search(text: string) {
    await this.searchboxInput.fill(text);
    await this.searchboxSubmitButton.click();
  }

  async getResultHeading(text: string): Promise<Locator> {
    return this.page.getByRole('heading', { name: text, exact: true });
  }
}