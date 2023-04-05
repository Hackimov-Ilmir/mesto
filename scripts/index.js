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

popupProfileElement;

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

  cards.prepend(
    createCard({ name: formNameInput.value, link: formUrlInput.value })
  );

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

function openPopupNewPlaceElement() {
  openPopup(popupNewPlaceElement);
  formNameInput.value = '';
  formUrlInput.value = '';
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

const cardTemplate = document.querySelector('.card-template').content;
const cards = document.querySelector('.cards');

initialCards.forEach((item) => {
  cards.append(createCard(item));
});

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector(
  '.popup__image-description'
);
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

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement.querySelector('.card__description').textContent = item.name;

  const cardLike = cardElement.querySelector('.card__button');
  const cardDelete = cardElement.querySelector('.card__delete-button');

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__button_active');
  });

  cardDelete.addEventListener('click', deleteCard);

  function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
  }

  const imageCard = cardElement.querySelector('.card__image');
  imageCard.addEventListener('click', openImagePopup);

  function openImagePopup() {
    openPopup(popupImage);
    popupImageElement.src = item.link;
    popupImageElement.alt = item.name;
    popupImageDescription.textContent = item.name;
  }

  return cardElement;
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

enableValidation(validationConfig);
