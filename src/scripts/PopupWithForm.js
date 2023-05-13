import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #popupSelector;
  #handleSubmitForm;
  #form;

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#popupSelector = document.querySelector(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#form = this.#popupSelector.querySelector('.form');
  }

  close() {
    super.close();
  }

  closeWithReset() {
    this.#form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', this.#handleSubmitForm);
  }

  getInputValues() {
    const inputs = Array.from(this.#form.querySelectorAll('input'));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
}
