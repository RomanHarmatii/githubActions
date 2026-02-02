import Header from "./Header";
import Button from "../Elements/Button";
import BaseElement from "../Elements/BaseElement";

export default class AuthenticatedHeader extends Header {
  constructor(page) {
    super(page);
  }

  get signInButton() {
    return new Button({
      page: this.page,
      selector: '[class="btn btn-outline-white header_signin"]',
    });
  }

  get userNavDropdown() {
    return new Button({ page: this.page, selector: "#userNavDropdown" });
  }

  get profileMenuItem() {
    return new Button({
      page: this.page,
      selector: '[class^="dropdown-item"][href="/panel/profile"]',
    });
  }

  async openProfilePage() {
    await this.userNavDropdown.click();
    await this.profileMenuItem.click();
  }
}
