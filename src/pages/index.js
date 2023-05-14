import {
  initialCards,
  popupImage,
  popupImageElement,
  popupImageDescription,
} from '../utils/constants.js';
import validationConfig from '../utils/validate.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const popupFormEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  handleSubmitFormEditProfile
);

popupFormEditProfile.setEventListeners();

function handleSubmitFormEditProfile(values) {
  userInfo.setUserInfo(values.input_nickname, values.input_description);
  popupFormEditProfile.close();
}

function openProfileEditPopup() {
  popupFormEditProfile.open();
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

profileEditButton.addEventListener('click', openProfileEditPopup);

const popupNewPlaceElement = document.querySelector('.popup_type_new-place');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupFormNewPlace = new PopupWithForm(
  '.popup_type_new-place',
  handleSubmitFormNewCard
);

popupFormNewPlace.setEventListeners();

function handleSubmitFormNewCard(item) {
  renderItems.addItem(getCard(item.input_placename, item.input_url));
  popupFormNewPlace.closeWithReset();
}

function openNewPlacePopup() {
  popupFormNewPlace.open();
}

buttonAddCard.addEventListener('click', openNewPlacePopup);

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function getCard(name, link) {
  const card = new Card(name, link, `card-template`, () => {
    popupWithImage.open(name, link);
  });
  return card.getCard();
}

const renderItems = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderItems.addItem(getCard(item.name, item.link));
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
