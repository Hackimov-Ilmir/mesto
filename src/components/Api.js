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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: {
        authorization: this.#authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
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
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCardLike(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
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
