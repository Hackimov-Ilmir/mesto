class Card {
  #name;
  #link;
  #template;
  #card;
  #cardImage;
  #handleCardClick;

  constructor(name, link, templateSelector, handleCardClick) {
    this.#name = name;
    this.#link = link;
    this.#template = document
      .querySelector(`.${templateSelector}`)
      .content.cloneNode(true);
    this.#cardImage = this.#template.children[0].querySelector('.card__image');
    this.#handleCardClick = handleCardClick;
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
      .addEventListener('click', () => {
        this.#card.remove();
      });
  }

  #openImagePopup() {
    this.#card.querySelector('.card__image').addEventListener('click', () => {
      this.#handleCardClick();
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
