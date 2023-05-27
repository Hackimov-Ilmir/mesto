import {
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
import { api } from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { renderLoading } from '../utils/utils.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const profileNameInput = popupProfileElement.querySelector(
  '.form__input_type_nickname'
);
const profileDescriptionInput = popupProfileElement.querySelector(
  '.form__input_type_description'
);
const avatarButton = document.querySelector('.profile__avatar-container');
const avatarImage = document.querySelector('.profile__avatar');
const formSaveButtonNewPlace = document.querySelector(
  '.form__save-button_new-place'
);
const formSaveButtonProfileEdit = document.querySelector(
  '.form__save-button_profile-edit'
);
const formSaveButtonUpdateAvatar = document.querySelector(
  '.form__save-button_update-avatar'
);
const popupUpdateAvatarElement = document.querySelector(
  '.popup_type_update-avatar'
);
const formCardDeleteButton = document.querySelector(
  '.popup__delete-confirm-button'
);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([item, userData]) => {
    const userId = userData._id;
    renderItems.renderInitialItems(item, userId);
    userInfo.setUserInfo(userData.name, userData.about);
    avatarImage.src = userData.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

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
  renderLoading(formSaveButtonProfileEdit, 'Сохранение...');
  api
    .updateUserInfo(values.input_nickname, values.input_description)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupFormEditProfile.close();
    })
    .finally(() => renderLoading(formSaveButtonProfileEdit, 'Сохранить'));
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
  renderLoading(formSaveButtonNewPlace, 'Создание...');
  api
    .addNewCard(item.input_placename, item.input_url)
    .then((res) => {
      renderItems.addItem(
        getCard(
          item.input_placename,
          item.input_url,
          res.likes.length,
          res._id,
          res.owner._id,
          res.owner._id,
          res.likes
        ),
        popupFormNewPlace.closeWithReset(),
        popupNewPlaceElementValidator.disableSubmitButton()
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formSaveButtonNewPlace, 'Создать'));
}

function openNewPlacePopup() {
  popupFormNewPlace.open();
}

buttonAddCard.addEventListener('click', openNewPlacePopup);

const popupAvatarUpdate = new PopupWithForm(
  '.popup_type_update-avatar',
  handleSubmitUpdateAvatar
);

popupAvatarUpdate.setEventListeners();

function openAvatarUpdatePopup() {
  popupAvatarUpdate.open();
}

function handleSubmitUpdateAvatar(values) {
  renderLoading(formSaveButtonUpdateAvatar, 'Сохранение...');
  api
    .updateAvatar(values.input_url_avatar)
    .then((res) => {
      avatarImage.src = res.avatar;
      popupAvatarUpdate.closeWithReset();
      popupUpdateAvatarElementValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formSaveButtonUpdateAvatar, 'Сохранить'));
}

avatarButton.addEventListener('click', openAvatarUpdatePopup);

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_type_delete-confirm',
  (cardId, card) => {
    renderLoading(formCardDeleteButton, 'Удаление...');
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })

      .finally(() => renderLoading(formCardDeleteButton, 'Да'));
  }
);

popupWithConfirmation.setEventListeners();

function getCard(
  name,
  link,
  likesCount,
  cardId,
  cardOwnerId,
  userId,
  likesArray
) {
  const card = new Card(
    { name, link, likesCount, cardId, cardOwnerId, userId, likesArray },
    `card-template`,
    () => {
      popupWithImage.open(name, link);
    },
    (cardId, card) => {
      popupWithConfirmation.open(cardId, card);
    },
    (cardId) => {
      return api
        .putCardLike(cardId)
        .then((res) => {
          card.setCardLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (cardId) => {
      return api
        .deleteCardLike(cardId)
        .then((res) => {
          card.setCardLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  return card.getCard();
}

const renderItems = new Section(
  {
    renderer: (item, userId) => {
      renderItems.addItem(
        getCard(
          item.name,
          item.link,
          item.likes.length,
          item._id,
          item.owner._id,
          userId,
          item.likes
        )
      );
    },
  },
  '.cards'
);

const popupNewPlaceElementValidator = new FormValidator(
  validationConfig,
  popupNewPlaceElement
);
const popupProfileElementValidator = new FormValidator(
  validationConfig,
  popupProfileElement
);
const popupUpdateAvatarElementValidator = new FormValidator(
  validationConfig,
  popupUpdateAvatarElement
);

popupNewPlaceElementValidator.enableValidation();
popupProfileElementValidator.enableValidation();
popupUpdateAvatarElementValidator.enableValidation();

export { popupImage, popupImageElement, popupImageDescription };
