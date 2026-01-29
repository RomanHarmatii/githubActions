import BaseElement from "./BaseElement";
import { expect } from "@playwright/test";

export default class extends BaseElement {
  constructor({ page, selector, text }) {
    super({ page, selector, text });
  }

  async click() {
    await this._element.click();
  }
}
