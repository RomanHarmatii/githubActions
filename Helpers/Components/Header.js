import Button from "../Elements/Button";

export default class {
  constructor(page) {
    this.page = page;
  }
  get brand() {
    return new Button(this.page, '[class="navbar-brand"]');
  }

  get signInButton() {
    return new Button({
      page: this.page,
      selector: '[class="btn btn-outline-white header_signin"]',
    });
  }
}
