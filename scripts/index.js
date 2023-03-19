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

function handleFormSubmit(evt) {
  evt.preventDefault();

  nicknameValue.textContent = nicknameInput.value;
  descriptionValue.textContent = descriptionInput.value;

  closePopup(popupProfileElement);
}

editButton.addEventListener('click', () => openPopup(popupProfileElement));
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formElement.addEventListener('submit', handleFormSubmit);

const popupNewPlaceElement = document.querySelector('.popup_type_new-place');
const addButton = document.querySelector('.profile__add-button');
const closeNewPlaceButton = popupNewPlaceElement.querySelector('.popup__close-button');
const formNewPlace = popupNewPlaceElement.querySelector('.form');

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  cards.prepend(createCard({name: formNewPlace.querySelector('.form__input_type_place-name').value,
                             link: formNewPlace.querySelector('.form__input_type_url').value}));

  closePopup(popupNewPlaceElement);
});

addButton.addEventListener('click', () => openPopup(popupNewPlaceElement));
closeNewPlaceButton.addEventListener('click', () => closePopup(popupNewPlaceElement));

function openPopup(popup) {
  popup.classList.add('popup_opened');

  if (popup === popupProfileElement) {
    nicknameInput.value = nicknameValue.textContent;
    descriptionInput.value = descriptionValue.textContent;
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('.card-template').content;
const cards = document.querySelector('.cards');

initialCards.forEach((item) => {
  cards.append(createCard(item));
});

function createCard (item) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;

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
    const popupImage = document.querySelector('.popup_type_image');
    imageCard.addEventListener('click', openImagePopup);

    function openImagePopup (event) {
      popupImage.classList.add('popup_opened');
      popupImage.querySelector('.popup__image').src = item.link;
      popupImage.querySelector('.popup__image-description').textContent = item.name;

      const buttonCloseImage = popupImage.querySelector('.popup__close-button');
      buttonCloseImage.addEventListener('click', closeImagePopup);

      function closeImagePopup() {
        popupImage.classList.remove('popup_opened')
      }
    }
  return cardElement;
}







