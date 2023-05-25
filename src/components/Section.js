export default class Section {
  #renderer;
  #container;

  constructor({ renderer }, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  renderInitialItems(items, userId) {
    items.reverse().forEach((item) => this.#renderer(item, userId));
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
