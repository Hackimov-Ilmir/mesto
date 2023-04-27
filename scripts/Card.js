import {
  openPopup,
  popupImage,
  popupImageElement,
  popupImageDescription,
} from './index.js';

class Card {
  #name;
  #link;
  #template = document.querySelector('.card-template').content.cloneNode(true);
  #card;

  constructor(name, link) {
    this.#name = name;
    this.#link = link;
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
    this.#card.querySelector('.card__image').src = this.#link;
    this.#card.querySelector('.card__image').alt = this.#name;
    this.#card.querySelector('.card__description').textContent = this.#name;

    this.#setListeners();
  }

  getCard() {
    this.#createCard();

    return this.#card;
  }
}

export default Card;
