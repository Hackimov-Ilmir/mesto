export default class Section {
  #items;
  #renderer;
  #container;

  constructor({ items, renderer }, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  renderInitialItems() {
    this.#items.reverse().forEach((item) => this.#renderer(item));
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
