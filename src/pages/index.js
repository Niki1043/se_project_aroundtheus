//Imports
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  //initialCards,
  config,
  profileEditButton,
  profileEditModal,
  profileName,
  profileDescription,
  modalInputNameField,
  modalInputDescriptionField,
  cardEditModal,
  cardEditButton,
  avatarEditModal,
  profileAvatar,
  avatarButton,
} from "../utils/constants.js";

//--------------------------------------------------
//Setup API baseUrl and headers with token and groupID
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "871cfd79-24b1-469e-9aa3-4e4a6ff58fdc",
    "Content-Type": "application/json",
  },
});

//--------------------------------------------------
//Form Validations Instances and function from class
const editFormValidator = new FormValidator(config, profileEditModal);
const addFormValidator = new FormValidator(config, cardEditModal);
const avatarFormValidator = new FormValidator(config, avatarEditModal);
avatarFormValidator.enableValidation();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
//--------------------------------------------------
//Profile Modal Functions
//User Info callback
const userinfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
  userAvatar: profileAvatar, //added for avatar
});

//Open Profile Edit Popup Form
function openProfileEditForm() {
  const { name, about } = userinfo.getUserInfo(); //was description, title
  modalInputNameField.value = name;
  modalInputDescriptionField.value = about;
  profilePopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

//Add Profile Form Input and render on page
const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  profilePopup.isLoadingButtonState(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userinfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.isLoadingButtonState(false, "Save");
    });
});

profilePopup.setEventListeners();

//Add Profile Avatar Link Input and render on page
const avatarPopup = new PopupWithForm("#profileimage-edit-modal", (values) => {
  avatarPopup.isLoadingButtonState(true);
  api
    .updateProfileAvatar(values.avatar) //avatar url returned
    .then((data) => {
      userinfo.setUserInfo(data); //updates link, does not render link on page
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.isLoadingButtonState(false, "Save");
    });
});

avatarButton.addEventListener("click", () => avatarPopup.open());

avatarPopup.setEventListeners();

//--------------------------------------------------
//Add Card and Popup Instances
//Preview Popup instance
const previewPopup = new PopupWithImage("#preview-modal");

//Delete Card instance
const deleteCardPopup = new PopupWithConfirmation("#delete-confirm-modal");
let cardSection;
let userId;

deleteCardPopup.setEventListeners();

//Function to create new card called with renderer
function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",
    //handleCardClick
    (cardName, cardLink) => {
      previewPopup.open(cardName, cardLink);
    },
    //handleDeleteClick with callback function to remove specified user card only
    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api.deleteUserCard(cardId).then(() => {
          card.deleteCard();
          deleteCardPopup.close();
        });
      });
    },
    //handleLikeClick to set heart button state
    (cardId) => {
      if (card.checkCardLikedState()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.removeCardLike();
            card.setLikesCounter(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((data) => {
            card.addCardLike();
            card.setLikesCounter(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //loadingLikeCheck - loops through cards and renders server likes on page
    (cardData) => {
      cardData.forEach((cardObj) => {
        if (cardObj._id === userId) {
          card.addCardLike();
        }
      });
    }
  );
  return card;
}
//Collects initialCards info from server and renders them on the page
api.getAPIInfo().then(([userData, userCards]) => {
  userId = userData._id; //assign ._id to userId variable
  userinfo.setUserInfo(userData);
  cardSection = new Section(
    {
      items: userCards,
      renderer: (cardData) => {
        const newCard = createCard(cardData);
        cardSection.addItem(newCard.getView());
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});

//Add new card with add card form and render on the page
const addCardPopup = new PopupWithForm("#card-edit-modal", (values) => {
  addCardPopup.isLoadingButtonState(true);
  api
    .addNewCard(values)
    .then((data) => {
      const addCard = createCard(data); //change to const const add card create card createCard(data)
      addCardPopup.close(); //close with submit
      cardSection.addItem(addCard.getView()); //get view
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.isLoadingButtonState(false, "Create");
    });
  cardSection.renderItems();
});

//Open card popup with open and click listener
cardEditButton.addEventListener("click", () => addCardPopup.open());

addCardPopup.setEventListeners();
