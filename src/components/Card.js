//ADD userId after data in constructor, uncomment

class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    loadingLikeCheck
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //add method to constructor
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._loadingLikeCheck = loadingLikeCheck; //add to place call back in create card to render likes from server on loading
    this._userId = userId;
    this._userCardOwnerId = data["owner"]._id;
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
      this._handleLikeClick(this._id);
    });

    //Delete
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
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

  _handleCardPreview() {
    this._handleCardClick(this._name, this._link);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //Setup a click handler for loading likes when loading the page
  setLikesCounter(likes) {
    this._likes = likes;
    this._cardLikes.textContent = likes;
  }

  addCardLike() {
    this._likeButton.classList.add("card__like-button_active");
  }

  removeCardLike() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  checkCardLikedState() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      return true;
    } else {
      return false;
    }
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
    //Like Counter and adding/removing likes
    this._cardLikes = this._cardElement.querySelector(".card__likes-counter");
    this._loadingLikeCheck(this._likes, this._likeButton);
    this._cardLikes.textContent = this._likes.length; //return length of array with count of likes
    //If the user has not added the card, remove the delete button on the card
    if (this._userId != this._userCardOwnerId) {
      this._deleteButton.remove();
    }
    this._setCardEventListeners();
    return this._cardElement;
  }
}

export default Card;
