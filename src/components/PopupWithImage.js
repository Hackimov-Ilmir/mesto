import Popup from './Popup.js';
import {
  popupImageElement,
  popupImageDescription,
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  #popupImageElement;
  #popupImageDescription;
  #name;
  #link;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImageElement = popupImageElement;
    this.#popupImageDescription = popupImageDescription;
  }

  open(name, link) {
    this.#popupImageElement.src = link;
    this.#popupImageElement.alt = name;
    this.#popupImageDescription.textContent = name;
    super.open();
  }
}
