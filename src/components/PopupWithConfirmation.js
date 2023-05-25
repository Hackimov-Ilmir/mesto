import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  #handleSubmitForm;
  #popupSelector;
  #form;
  #cardId;
  #card;

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#popupSelector = document.querySelector(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#form = this.#popupSelector.querySelector('.form');
  }

  open(cardId, card) {
    super.open();
    this.#cardId = cardId;
    this.#card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmitForm(this.#cardId, this.#card);
    });
  }
}
