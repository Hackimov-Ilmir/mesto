class Card {
  #name;
  #link;
  #template;
  #card;
  #cardImage;
  #handleCardClick;
  #likes;
  #cardId;
  #handleCardDelete;
  #cardOwnerId;
  #userId;
  #likesArray;
  #handleCardLike;
  #handleCardLikeDelete;
  #likesCount;
  #cardLikeButton;

  constructor(
    { name, link, likesCount, cardId, cardOwnerId, userId, likesArray },
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    handleCardLikeDelete
  ) {
    this.#name = name;
    this.#link = link;
    this.#template = document
      .querySelector(`.${templateSelector}`)
      .content.cloneNode(true);
    this.#cardImage = this.#template.children[0].querySelector('.card__image');
    this.#handleCardClick = handleCardClick;
    this.#likes = this.#template.querySelector('.card__like-count');
    this.#likesCount = likesCount;
    this.#likes.textContent = likesCount;
    this.#cardId = cardId;
    this.#handleCardDelete = handleCardDelete;
    this.#cardOwnerId = cardOwnerId;
    this.#userId = userId;
    this.#likesArray = likesArray;
    this.#handleCardLike = handleCardLike;
    this.#handleCardLikeDelete = handleCardLikeDelete;
    this.#cardLikeButton = this.#template.querySelector('.card__button');
  }

  cardIsLiked() {
    return this.#likesArray.find((like) => like._id === this.#userId);
  }

  #likeCardActive() {
    if (this.cardIsLiked()) {
      this.#cardLikeButton.classList.add('card__button_active');
    } else {
      this.#cardLikeButton.classList.remove('card__button_active');
    }
  }

  #likedCard() {
    if (this.cardIsLiked()) {
      console.log('true');
      this.#handleCardLikeDelete(this.#cardId);
    } else {
      console.log('false');
      this.#handleCardLike(this.#cardId);
    }
  }

  #likeCard() {
    this.#template
      .querySelector('.card__button')
      .addEventListener('click', (event) => {
        console.log(event.target);
        event.target.classList.toggle('card__button_active');
        this.#likeCardActive();
        this.#likedCard();
      });
  }

  setCardLikes(likes) {
    this.#likes.textContent = likes;
  }

  deleteCardPopupOpen() {
    this.#template
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this.#handleCardDelete(this.#cardId, this);
      });
  }

  deleteCard() {
    this.#card.remove();
  }

  #deleteCardPosibility() {
    if (this.#userId === this.#cardOwnerId) {
      this.#card
        .querySelector('.card__delete-button')
        .classList.add('card__delete-button_visible');
    }
  }

  #openImagePopup() {
    this.#card.querySelector('.card__image').addEventListener('click', () => {
      this.#handleCardClick();
    });
  }

  #setListeners() {
    this.#likeCard();
    this.deleteCardPopupOpen();
    this.#openImagePopup();
  }

  #createCard() {
    this.#card = this.#template.children[0];
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#card.querySelector('.card__description').textContent = this.#name;

    this.#setListeners();
    this.#deleteCardPosibility();
  }

  getCard() {
    this.#createCard();
    this.#likeCardActive();

    return this.#card;
  }
}

export default Card;
