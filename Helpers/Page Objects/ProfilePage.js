import { BasePage } from "./BasePage";
import BaseElement from "../Elements/BaseElement";

const url = "/panel/profile";

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
  }

  get profileName() {
    return new BaseElement({
      page: this.page,
      selector: "[class^='profile_name']",
    });
  }
}
