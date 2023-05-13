class FormValidator {
  #settings;
  #form;
  #formButton;
  #formInputs;

  constructor(settings, form) {
    this.#settings = settings;
    this.#form = form;
    this.#formButton = this.#form.querySelector(
      this.#settings.submitButtonSelector
    );
    this.#formInputs = Array.from(
      form.querySelectorAll(this.#settings.inputSelector)
    );
  }

  enableValidation() {
    this.#setEventListeners(this.#form);
  }

  disableSubmitButton() {
    this.#disableButton(this.#formButton);
  }

  #setEventListeners() {
    this.#formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        if (this.#hasInvalidInput(this.#formInputs)) {
          this.#disableButton(this.#formButton);
        } else {
          this.#enableButton(this.#formButton);
        }
      });
    });
  }

  #checkInputValidity(input) {
    const errorInput = document.querySelector(`#${input.id}-error`);

    if (input.checkValidity()) {
      errorInput.classList.remove(this.#settings.errorClass);
      errorInput.textContent = '';
      input.classList.remove(this.#settings.inputErrorClass);
    } else {
      errorInput.classList.add(this.#settings.errorClass);
      errorInput.textContent = input.validationMessage;
      input.classList.add(this.#settings.inputErrorClass);
    }
  }

  #hasInvalidInput() {
    return this.#formInputs.some((item) => !item.validity.valid);
  }

  #enableButton() {
    this.#formButton.classList.remove(this.#settings.inactiveButtonClass);
    this.#formButton.removeAttribute('disabled');
  }

  #disableButton() {
    this.#formButton.classList.add(this.#settings.inactiveButtonClass);
    this.#formButton.setAttribute('disabled', true);
  }
}

export default FormValidator;
