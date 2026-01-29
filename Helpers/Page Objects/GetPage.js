import BaseElement from "../Elements/BaseElement";
import Button from "../Elements/Button";
import TextArea from "../Elements/TextArea";
import { BasePage } from "./BasePage";

const url = "/";

export class GetPage extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
  }

  get submitButton() {
    return new Button({ page: this.page, selector: '[id="query-btn"]' });
  }
  // get inputName() {
  //   return this._baseElement.getElement("#inputName");
  // }
  get inputEmail() {
    return new TextArea({ page: this.page, selector: "#inputEmail" });
  }
  get inputPassword() {
    return new TextArea({ page: this.page, selector: "#inputPassword" });
  }

  // get saveForm(){
  //   return new Button({ page: this.page, text: "Save Form" });
  // }

  async login(email, password) {
    await this.inputEmail.type(email);
    await this.inputPassword.type(password);
    await this.submitButton.click();
  }
}
