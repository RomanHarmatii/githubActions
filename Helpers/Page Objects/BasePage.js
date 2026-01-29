import Header from "../Components/Header";
import BaseElement from "../Elements/BaseElement";

export class BasePage {
  constructor(page, url) {
    this.url = url;
    this.page = page;
    this.header = new Header(this.page);
  }
  async navigate() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }
}
