const editButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupClass = popupElement.classList;

const closeButton = popupElement.querySelector('.popup__close-button');

const nicknameValue = document.querySelector('.profile__info-nickname');
const descriptionValue = document.querySelector('.profile__info-description');
const saveButton = popupElement.querySelector('.form__save-button');
const nicknameInput = popupElement.querySelector('.form__input_type_nickname');
const descriptionInput = popupElement.querySelector('.form__input_type_description');
const formElement = popupElement.querySelector('.form');

function popupOpen() {
  popupClass.add('popup_opened');
  nicknameInput.value = nicknameValue.textContent;
  descriptionInput.value = descriptionValue.textContent;
}

function popupClose() {
  popupClass.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  nicknameValue.textContent = nicknameInput.value;
  descriptionValue.textContent = descriptionInput.value;

  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
