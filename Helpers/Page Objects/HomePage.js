import { BasePage } from "./BasePage";
import BaseElement from "../Elements/BaseElement";
import Button from "../Elements/Button";

const url = "/";

export class HomePage extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
  }

  get heading() {
    return new BaseElement({ page: this.page, selector: "h1" });
  }

  listButton(text) {
    return new Button({ page: this.page, text: text });
  }
}
