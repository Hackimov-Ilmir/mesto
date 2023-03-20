const editButton = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const popupClass = popupProfileElement.classList;

const closeProfileButton = popupProfileElement.querySelector('.popup__close-button');

const nicknameValue = document.querySelector('.profile__info-nickname');
const descriptionValue = document.querySelector('.profile__info-description');
const saveButton = popupProfileElement.querySelector('.form__save-button');
const nicknameInput = popupProfileElement.querySelector('.form__input_type_nickname');
const descriptionInput = popupProfileElement.querySelector('.form__input_type_description');
const formElement = popupProfileElement.querySelector('.form');

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();

  nicknameValue.textContent = nicknameInput.value;
  descriptionValue.textContent = descriptionInput.value;

  closePopup(popupProfileElement);
}

editButton.addEventListener('click', openEditProfileForm);
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formElement.addEventListener('submit', handleSubmitEditProfileForm);

function openEditProfileForm() {
  openPopup(popupProfileElement);
  nicknameInput.value = nicknameValue.textContent;
  descriptionInput.value = descriptionValue.textContent;
}

const popupNewPlaceElement = document.querySelector('.popup_type_new-place');
const addButton = document.querySelector('.profile__add-button');
const closeNewPlaceButton = popupNewPlaceElement.querySelector('.popup__close-button');
const formNewPlace = popupNewPlaceElement.querySelector('.form');

const formNameInput = formNewPlace.querySelector('.form__input_type_place-name');
const formUrlInput = formNewPlace.querySelector('.form__input_type_url');

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  cards.prepend(createCard({name: formNameInput.value, link: formUrlInput.value}));

  closePopup(popupNewPlaceElement);
});

addButton.addEventListener('click', openPopupNewPlaceElement);
closeNewPlaceButton.addEventListener('click', () => closePopup(popupNewPlaceElement));

function openPopupNewPlaceElement() {
  openPopup(popupNewPlaceElement);
  formNameInput.value = '';
  formUrlInput.value = '';
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const cardTemplate = document.querySelector('.card-template').content;
const cards = document.querySelector('.cards');

initialCards.forEach((item) => {
  cards.append(createCard(item));
});

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector('.popup__image-description');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

buttonCloseImage.addEventListener('click', closeImagePopup);

function closeImagePopup(event) {
  const popupImage = event.target.closest('.popup_type_image');
  closePopup(popupImage);
}

function createCard (item) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = item.link;
    cardImage.alt = item.name;

    cardElement.querySelector('.card__description').textContent = item.name;

    const cardLike = cardElement.querySelector('.card__button');
    const cardDelete = cardElement.querySelector('.card__delete-button');

    cardLike.addEventListener('click', () => {
      cardLike.classList.toggle('card__button_active')
    });

    cardDelete.addEventListener('click', deleteCard);

    function deleteCard (event) {
      const card = event.target.closest('.card');
      card.remove();
    }

    const imageCard = cardElement.querySelector('.card__image');
    imageCard.addEventListener('click', openImagePopup);

    function openImagePopup (event) {
      openPopup(popupImage);
      popupImageElement.src = item.link;
      popupImageElement.alt = item.name;
      popupImageDescription.textContent = item.name;
    }
  return cardElement;
}
