export default class {
  constructor({ page, selector, text }) {
    this.page = page;
    this._element = selector
      ? this.page.locator(selector)
      : this.page.getByText(text, { exact: true });
  }

  get locator() {
    return this._element;
  }
}
