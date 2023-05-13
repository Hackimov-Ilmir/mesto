export default class UserInfo {
  #profileName;
  #profileDescription;

  constructor({ userNameSelector, userDescriptionSelector }) {
    this.#profileName = document.querySelector(userNameSelector);
    this.#profileDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      description: this.#profileDescription.textContent,
    };
  }

  setUserInfo(name, description) {
    this.#profileName.textContent = name;
    this.#profileDescription.textContent = description;
  }
}
