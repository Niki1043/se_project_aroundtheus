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
//Used to call methods from Api class for functions
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "871cfd79-24b1-469e-9aa3-4e4a6ff58fdc",
    "Content-Type": "application/json",
  },
});

//Order to call and get info
//1. Load user info api.getUserInfo() --DONE in getAPIInfo
//2. Get initial cards with api.getInitialCards() --DONE in getAPIInfo
//3. Use getAPIInfo to assign userId, and get info for initial cards and userinfo values -- DONE
//4. Update Profile info using updateProfileInfo(name,about) -> added and called in profilePopup callback function --DONE
//5. Add new card in cardCreate using addNewCard(name, link) -> added and called in cardForm section --DONE
//6. Delete card in cardCreate using deleteUserCard(cardId) -> added and called in createCard handleDeleteClick callback function --DONE
//7. Add/Remove likes in cardCreate using removeCardLikes(cardId)/addCardLikes(cardId) -> added and called in createCard handleLikeClick callback function --DONE
//8. Update profile pic in avatarPopup using updateProfileAvatar(avatar) -> added and called in avatarPopup --DONE
//--------------------------------------------------

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

function openProfileEditForm() {
  const { name, about } = userinfo.getUserInfo(); //was description, title
  modalInputNameField.value = name;
  modalInputDescriptionField.value = about;
  profilePopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

//Add Profile Form input and set on page
const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  //1. set timer loading up for button
  api
    .updateProfileInfo(values)
    .then((data) => {
      userinfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  // 5. finally turn of timer for button
});

profilePopup.setEventListeners();

//Add Profile Avatar input and set on page
const avatarPopup = new PopupWithForm("#profileimage-edit-modal", (values) => {
  //1. set timer for button
  api
    .updateProfileAvatar(values.link)
    .then((data) => {
      userinfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  //close timer button with finally statement
});

avatarButton.addEventListener("click", () => avatarPopup.open());

avatarPopup.setEventListeners();

//--------------------------------------------------
//Add Card and Popup Instances
//preview Popup (popupSelector)
const previewPopup = new PopupWithImage("#preview-modal");
const deleteCardPopup = new PopupWithConfirmation("#delete-confirm-modal");
let cardSection;

deleteCardPopup.setEventListeners();

let userId;
//Function to create new card called with renderer - add userId after cardData and before #template
function createCard(cardData) {
  const card = new Card(
    cardData, //undefined - data to be added to form?
    userId, //undefined - where is this data coming from?
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
    //handleLikeClick - to be added to Card.js
    (cardId) => {
      if (card.cardLiked()) {
        api
          .addCardLikes(cardId)
          .then((data) => {
            card.setLikesCounter(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.setLikesCounter(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
  //1. setup timer button
  api
    .addNewCard(values)
    .then((data) => {
      const addCard = createCard(data); //change to const const add card create card createCard(data)
      addCardPopup.close(); //close with submit
      cardSection.addItem(addCard.getView()); //get view
    })
    .catch((err) => {
      console.log(err);
    });
  cardSection.renderItems(); //add render items to show on page?
  //6. finally turn off timer button
});

//Open card popup with open and click listener
cardEditButton.addEventListener("click", () => addCardPopup.open());

addCardPopup.setEventListeners();

//--------------------------------------------------
//Get user information and card data from server
/*api.getAPIInfo().then(([cards, userData]) => {
  userId = userData._id; //assign ._id to userId variable
  cardSection.renderItems(cards), userinfo.setUserInfo(userData); //set methods to render cards using card data from API, and user info from API userdata
});
/*api.getAPIInfo().then(([userCards, userData]) => {
  userinfo.setUserInfo(userData);
  const userId = userData._id;
  const cards = userCards;
});*/
