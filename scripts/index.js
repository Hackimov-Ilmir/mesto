import {
  initialCards,
  popupImage,
  popupImageElement,
  popupImageDescription,
} from './constants.js';
import validationConfig from './validate.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closeByEsc, closePopup } from './utils.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const closeProfileFormButton = popupProfileElement.querySelector(
  '.popup__close-button'
);
const profileName = document.querySelector('.profile__info-nickname');
const profileDescription = document.querySelector('.profile__info-description');
const profileSubmitButton =
  popupProfileElement.querySelector('.form__save-button');
const profileNameInput = popupProfileElement.querySelector(
  '.form__input_type_nickname'
);
const profileDescriptionInput = popupProfileElement.querySelector(
  '.form__input_type_description'
);
const profileFormElement = popupProfileElement.querySelector('.form');

popupProfileElement.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupProfileElement);
  }
});

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(popupProfileElement);
}

profileEditButton.addEventListener('click', () => {
  openEditProfileForm();
});

closeProfileFormButton.addEventListener('click', () =>
  closePopup(popupProfileElement)
);

profileFormElement.addEventListener('submit', handleSubmitEditProfileForm);

function openEditProfileForm() {
  openPopup(popupProfileElement);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

const popupNewPlaceElement = document.querySelector('.popup_type_new-place');
const addButton = document.querySelector('.profile__add-button');
const closeNewPlaceButton = popupNewPlaceElement.querySelector(
  '.popup__close-button'
);
const formNewPlace = popupNewPlaceElement.querySelector('.form');

const formNameInput = formNewPlace.querySelector(
  '.form__input_type_place-name'
);
const formUrlInput = formNewPlace.querySelector('.form__input_type_url');

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const card = createCard(formNameInput.value, formUrlInput.value);

  cards.prepend(card.getCard());

  closePopup(popupNewPlaceElement);
});

addButton.addEventListener('click', () => {
  openPopupNewPlaceElement();
});

popupNewPlaceElement.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupNewPlaceElement);
  }
});

closeNewPlaceButton.addEventListener('click', () =>
  closePopup(popupNewPlaceElement)
);

const newPlaceSubmitButton = document.querySelector(
  '.form__save-button_new-place'
);

function openPopupNewPlaceElement() {
  openPopup(popupNewPlaceElement);
  formNameInput.value = '';
  formUrlInput.value = '';
  popupNewPlaceElementValidator.disableSubmitButton();
}

const cardTemplate = document.querySelector('.card-template').content;
const cards = document.querySelector('.cards');

function createCard(itemName, itemLink) {
  const initialCard = new Card(itemName, itemLink, `card-template`);
  return initialCard;
}

initialCards.forEach((item) => {
  const initialCard = createCard(item.name, item.link);

  cards.append(initialCard.getCard());
});

const buttonCloseImage = popupImage.querySelector('.popup__close-button');

popupImage.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupImage);
  }
});

buttonCloseImage.addEventListener('click', closeImagePopup);

function closeImagePopup(event) {
  const popupImage = event.target.closest('.popup_type_image');
  closePopup(popupImage);
}

function openImagePopup() {
  openPopup(popupImage);
  popupImageElement.src = item.link;
  popupImageElement.alt = item.name;
  popupImageDescription.textContent = item.name;
}

const popupNewPlaceElementValidator = new FormValidator(
  validationConfig,
  popupNewPlaceElement
);
const popupProfileElementValidator = new FormValidator(
  validationConfig,
  popupProfileElement
);

popupNewPlaceElementValidator.enableValidation();
popupProfileElementValidator.enableValidation();

// enableValidation(validationConfig);

export { openPopup, popupImage, popupImageElement, popupImageDescription };
