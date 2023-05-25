class Api {
  #url;
  #headers;
  #authorization;

  constructor(options) {
    this.#url = options.baseUrl;
    this.#headers = options.headers;
    this.#authorization = this.#headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      headers: {
        authorization: this.#authorization,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: {
        authorization: this.#authorization,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  updateUserInfo(name, about) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard(name, link) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    });
  }

  putCardLike(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  deleteCardLike(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes `, {
      method: 'DELETE',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'c4bac050-522f-4c21-b8ac-c12d8c5c7e36',
    'Content-Type': 'application/json',
  },
});

export { api };
