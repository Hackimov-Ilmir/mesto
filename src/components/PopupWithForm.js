import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #popupSelector;
  #handleSubmitForm;
  #form;
  #inputs;

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#popupSelector = document.querySelector(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#form = this.#popupSelector.querySelector('.form');
    this.#inputs = Array.from(this.#form.querySelectorAll('input'));
  }

  closeWithReset() {
    this.#form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmitForm(this.#getInputValues());
    });
  }

  #getInputValues() {
    const values = {};
    this.#inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
}
