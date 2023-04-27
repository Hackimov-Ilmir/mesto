class FormValidator {
  #settings;
  #form;

  constructor(settings, form) {
    this.#settings = settings;
    this.#form = form;
  }

  enableValidation() {
    this.#setEventListeners(this.#form);
  }

  #setEventListeners(form) {
    const formInputs = Array.from(
      form.querySelectorAll(this.#settings.inputSelector)
    );
    const formButton = form.querySelector(this.#settings.submitButtonSelector);
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        if (this.#hasInvalidInput(formInputs)) {
          this.#disableButton(formButton);
        } else {
          this.#enableButton(formButton);
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

  #hasInvalidInput(formInputs) {
    return formInputs.some((item) => !item.validity.valid);
  }

  #enableButton(button) {
    button.classList.remove(this.#settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  #disableButton(button) {
    button.classList.add(this.#settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}

export default FormValidator;
