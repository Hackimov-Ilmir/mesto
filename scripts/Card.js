import {
  popupImage,
  popupImageElement,
  popupImageDescription,
} from './constants.js';
import { openPopup } from './utils.js';

class Card {
  #name;
  #link;
  #template;
  #card;
  #cardImage;

  constructor(name, link, templateSelector) {
    this.#name = name;
    this.#link = link;
    this.#template = document
      .querySelector(`.${templateSelector}`)
      .content.cloneNode(true);
    this.#cardImage = this.#template.children[0].querySelector('.card__image');
  }

  #likeCard() {
    this.#template
      .querySelector('.card__button')
      .addEventListener('click', (event) => {
        event.target.classList.toggle('card__button_active');
      });
  }

  #deleteCard() {
    this.#template
      .querySelector('.card__delete-button')
      .addEventListener('click', (event) => {
        event.target.closest('.card');
        this.#card.remove();
      });
  }

  #openImagePopup() {
    this.#card.querySelector('.card__image').addEventListener('click', () => {
      openPopup(popupImage);

      popupImageElement.src = this.#link;
      popupImageElement.alt = this.#name;
      popupImageDescription.textContent = this.#name;
    });
  }

  #setListeners() {
    this.#likeCard();
    this.#deleteCard();
    this.#openImagePopup();
  }

  #createCard() {
    this.#card = this.#template.children[0];
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#card.querySelector('.card__description').textContent = this.#name;

    this.#setListeners();
  }

  getCard() {
    this.#createCard();

    return this.#card;
  }
}

export default Card;
