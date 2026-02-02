import Button from "../Elements/Button";
import TextArea from "../Elements/TextArea";

export default class LoginModal {
  constructor(page) {
    this.page = page;
  }

  get emailInput() {
    return new TextArea({ page: this.page, selector: "#signinEmail" });
  }

  get passwordInput() {
    return new TextArea({ page: this.page, selector: "#signinPassword" });
  }

  get loginButton() {
    return new Button({
      page: this.page,
      selector: '[class="btn btn-primary"]',
    });
  }

  async login(email, password) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.loginButton.click();
  }
}
