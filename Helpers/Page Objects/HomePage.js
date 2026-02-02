import { BasePage } from "./BasePage";
import BaseElement from "../Elements/BaseElement";
import Button from "../Elements/Button";
import TextArea from "../Elements/TextArea";

const url = "/";

export class HomePage extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
  }

  get heading() {
    return new BaseElement({ page: this.page, selector: "h1" });
  }

  get signinEmail() {
    return new TextArea({ page: this.page, selector: "#signinEmail" });
  }

  get signinPassword() {
    return new TextArea({ page: this.page, selector: "#signinPassword" });
  }

  get loginSubmitButton() {
    return new Button({
      page: this.page,
      selector: '[class="btn btn-primary"]',
    });
  }

  listButton(text) {
    return new Button({ page: this.page, text: text });
  }

  async login(email, password) {
    await this.header.signInButton.click();
    await this.signinEmail.type(email);
    await this.signinPassword.type(password);
    await this.loginSubmitButton.click();
  }
}
