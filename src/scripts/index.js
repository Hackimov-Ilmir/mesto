import {
  initialCards,
  popupImage,
  popupImageElement,
  popupImageDescription,
} from './constants.js';
import validationConfig from './validate.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const profileNameInput = popupProfileElement.querySelector(
  '.form__input_type_nickname'
);
const profileDescriptionInput = popupProfileElement.querySelector(
  '.form__input_type_description'
);

const userInfo = new UserInfo({
  userNameSelector: '.profile__info-nickname',
  userDescriptionSelector: '.profile__info-description',
});

function openProfileEditPopup() {
  const popupForm = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();

    const item = popupForm.getInputValues();

    userInfo.setUserInfo(item.input_nickname, item.input_description);

    popupForm.close();
  });

  popupForm.open();

  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

profileEditButton.addEventListener('click', openProfileEditPopup);

const popupNewPlaceElement = document.querySelector('.popup_type_new-place');
const addButton = document.querySelector('.profile__add-button');

function openNewPlacePopup() {
  const popupForm = new PopupWithForm('.popup_type_new-place', (evt) => {
    evt.preventDefault();

    const item = popupForm.getInputValues();

    const card = new Card(
      item.input_placename,
      item.input_url,
      `card-template`,
      () => {
        const popupWithImage = new PopupWithImage(
          '.popup_type_image',
          item.input_placename,
          item.input_url
        );
        popupWithImage.open();
      }
    );
    renderItems.addItem(card.getCard());

    popupForm.closeWithReset();
  });

  popupForm.open();
}

addButton.addEventListener('click', openNewPlacePopup);

const renderItems = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, `card-template`, () => {
        const popupWithImage = new PopupWithImage(
          '.popup_type_image',
          item.name,
          item.link
        );
        popupWithImage.open();
      });
      renderItems.addItem(card.getCard());
    },
  },
  '.cards'
);

renderItems.renderInitialItems();

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

export { popupImage, popupImageElement, popupImageDescription };
