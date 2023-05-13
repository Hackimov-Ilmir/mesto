export default class Popup {
  #popupSelector;

  constructor(popupSelector) {
    this.#popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this.#popupSelector.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this.#handleEscClose.bind(this));
  }

  close() {
    this.#popupSelector.classList.remove('popup_opened');
  }

  #handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.#popupSelector
      .querySelector('.popup__close-button')
      .addEventListener('click', this.close.bind(this));
    this.#popupSelector.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}
