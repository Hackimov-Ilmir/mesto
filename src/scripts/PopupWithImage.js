import Popup from './Popup.js';
import { popupImageElement, popupImageDescription } from './constants.js';

export default class PopupWithImage extends Popup {
  #popupImageElement;
  #popupImageDescription;
  #name;
  #link;

  constructor(popupSelector, name, link) {
    super(popupSelector);
    this.#popupImageElement = popupImageElement;
    this.#popupImageDescription = popupImageDescription;
    this.#name = name;
    this.#link = link;
  }

  open() {
    super.open();
    this.#popupImageElement.src = this.#link;
    this.#popupImageElement.alt = this.#name;
    this.#popupImageDescription.textContent = this.#name;
  }
}
