import Header from "../Components/Header";
import UserMenu from "../Components/UserMenu";
import BaseElement from "../Elements/BaseElement";

export class BasePage {
  constructor(page, url) {
    this.url = url;
    this.page = page;
    this.header = new Header(this.page);
    this.userMenu = new UserMenu(this.page);
  }

  get profileName() {
    return new BaseElement({
      page: this.page,
      selector: "[class^='profile_name']",
    });
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }
}
