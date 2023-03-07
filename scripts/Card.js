import { openPopUp } from "./utils.js";

const previewModal = document.querySelector("#preview-modal");
const previewImage = document.querySelector(".preview-modal__image");
const previewTitle = document.querySelector(".preview-modal__caption");

//
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  //Add methods for cards here
  //_getTemplate() from cardSelector with clone to create template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  //_setCardEventListeners for click events what are they for
  _setCardEventListeners() {
    //Like
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    //Delete
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
    //Preview
    this._previewButton.addEventListener("click", () => {
      this._handleCardPreview(previewModal);
    });
  }

  //_handleEvents() set event handlers
  _handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleCardPreview() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewTitle.textContent = this._name;
    openPopUp(previewModal);
  }

  //add elements and functionality to card
  getView() {
    this._cardElement = this._getTemplate();
    //generates card name, image src and alt
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    //enables clickHandler functions
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._previewButton = this._cardElement.querySelector("#preview-button");
    this._setCardEventListeners();
    return this._cardElement;
  }
}

export default Card;
