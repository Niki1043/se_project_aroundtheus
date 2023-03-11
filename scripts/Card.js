class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //add method to constructor
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
    this._cardImage.addEventListener("click", () => {
      this._handleCardPreview();
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
    this._handleCardClick(this._name, this._link);
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
