//Imports
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

import {
  handleEscape,
  closePopUpWithOverlayClick,
  openPopUp,
  closePopUp,
} from "./utils.js";

//--------------------------------------------------
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error_input_type",
  errorClass: "modal__error_visible",
};

const selectors = {
  cardNameField: "#cardmodal-name",
  cardLinkField: "#cardmodal-link",
  //profileTitleInput: "#modal-name",
  //profileDescriptionInput: "#modal-description",
  //

  profileEditForm: "#profile-edit-modal",
};

//--------------------------------------------------
//Profile Modal
//Profile Modal variables
const modals = document.querySelectorAll(".modal");
const closeModals = document.querySelectorAll(".modal__close"); //
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalInputNameField = document.querySelector("#modal-name");
const modalInputDescriptionField = document.querySelector("#modal-description");
const profileEditForm = profileEditModal.querySelector("#edit-profile-modal");

//Add Cards Modal
//Card Modal variables
const cardEditButton = document.querySelector(".profile__add-button");
const cardEditModal = document.querySelector("#card-edit-modal");
//
//const cardModalCloseButton = document.querySelector("#card-edit-close");
const cardEditForm = cardEditModal.querySelector("#card-edit-form");
const cardListElement = document.querySelector(".cards__list");
//const userCardTemplate = document.querySelector("#card-template").content;
const userInputCardTitle = cardEditForm.querySelector("#cardmodal-name");
const userInputURL = cardEditForm.querySelector("#cardmodal-link");
//const cardCreateButton = document.querySelector("#card-edit-button");
//
//const previewModal = document.querySelector("#preview-modal");
//const modalImage = document.querySelector(".preview-modal__image");
//const modalTitle = document.querySelector(".preview-modal__caption");
//const previewCloseButton = document.querySelector("#preview-close");

//--------------------------------------------------
//Form Validations Instances and function from class
const editFormValidator = new FormValidator(config, profileEditModal);
const addFormValidator = new FormValidator(config, cardEditModal);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//--------------------------------------------------
//Profile Modal Functions
//User Info callback
const userinfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileDescription,
});

function openProfileEditForm() {
  userinfo.getUserInfo({
    name: (modalInputNameField.value = profileName.textContent),
    description: (modalInputDescriptionField.value =
      profileDescription.textContent),
  });
  profilePopup.open();
}
profileEditButton.addEventListener("click", openProfileEditForm);

//get input returns object passed into handle form submit - error with the input type
const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  userinfo.setUserInfo(values);
});

profilePopup.setEventListeners(); ////ESC AND OVERLAY ARE NOT WORKING WITHIN EVENT LISTENER

//--------------------------------------------------
//Add Card Functions
//preview Popup (popupSelector)
const previewPopup = new PopupWithImage("#preview-modal");

//Render Initial Cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (cardName, cardLink) => {
          previewPopup.open(cardName, cardLink);
        }
      );
      cardSection.addItem(card.getView());
    },
  },
  ".cards__list"
);

cardSection.renderItems();

//Add new card with add card form
const addCardPopup = new PopupWithForm("#card-edit-modal", (cardData) => {
  const newCard = new Card(cardData, "#card-template", (cardName, cardLink) => {
    previewPopup.open(cardName, cardLink);
  });
  cardSection.addItem(newCard.getView());
});

//Open card popup with open and click listener
cardEditButton.addEventListener("click", () => addCardPopup.open());

addCardPopup.setEventListeners();
