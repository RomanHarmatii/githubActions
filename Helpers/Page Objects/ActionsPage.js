import BaseElement from "../Elements/BaseElement";
import ButtonElement from "../Elements/Button";
import TextArea from "../Elements/TextArea";
import { BasePage } from "./BasePage";

const url = "/commands/actions";

export default class extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
  }
  get couponCode() {
    return new TextArea(this.page, "#couponCode1");
  }

  get submitButton() {
    return new ButtonElement(this.page, '[type="submit"]');
  }

  get bigRedButton() {
    return new ButtonElement(
      this.page,
      '[class="btn btn-lg btn-danger action-btn"]',
    );
  }

  // get actionsForm() {
  //   return this._baseElement.getElement(".action-form");
  // }

  // get checkBox1() {
  //   return this._baseElement.getElement(
  //     `.action-checkboxes [value='checkbox1']`
  //   );
  // }

  message(text) {
    return this._baseElement.getByText(text);
  }
}
