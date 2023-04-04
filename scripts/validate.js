// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// });

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_novalid',
  errorClass: 'form__input-error_visible',
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

const checkInputValidity = (input, { inputErrorClass, errorClass }) => {
  const errorInput = document.querySelector(`#${input.id}-error`);

  if (input.checkValidity()) {
    errorInput.classList.remove(errorClass);
    errorInput.textContent = '';
    input.classList.remove(inputErrorClass);
  } else {
    errorInput.classList.add(errorClass);
    errorInput.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }
};

const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};

const enableButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

const disableButton = (button, { inactiveButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};
