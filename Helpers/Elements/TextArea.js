import { expect } from "@playwright/test";
import Button from "./Button";

export default class extends Button {
  constructor({ page, selector, text }) {
    super({ page, selector, text });
  }

  async type(text) {
    expect(this._element).toBeVisible();
    await this._element.fill(text);
  }

  async hasValue(value) {
    await expect(this._element).toHaveValue(value);
  }
}
