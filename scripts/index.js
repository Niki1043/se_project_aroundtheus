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
//Button Functions from Utils
//Close all modals with X click
closeModals.forEach((closeButton) => {
  const closeModal = closeButton.closest(".modal");
  closeButton.addEventListener("click", () => closePopUp(closeModal));
});

//--------------------------------------------------
//Profile Modal Functions
//User Info callback
const userinfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileDescription,
});

//get input returns object passed into handle form submit - error with the input type
const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  userinfo.setUserInfo(values);
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

profilePopup.setEventListeners(); ////ESC AND OVERLAY ARE NOT WORKING WITHIN EVENT LISTENER

//--------------------------------------------------
//Add Card Functions
//preview Popup (popupSelector)
const previewPopup = new PopupWithImage("#preview-modal"); //this works

//Section constructur({ items, renderer }, classSelector)
//Card constrictor (data, cardSelector, handleCardClick)
//Popup works - need to add the proper data to it and get it to render on open page
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
      return card.getView();
    },
  },
  ".cards__list"
);

//////ADD CARD POPUP AND ADD FORM
///WORKS TO ADD A CARD - NEED TO FIX FOR CONTENTS WHEN ADDED TO FORM
//const cardPopup = new Popup("#card-edit-modal");
const addCardPopup = new PopupWithForm("#card-edit-modal", (cardData) => {
  const newCard = new Card(cardData, "#card-template", () => {
    previewPopup.open(cardName, cardLink);
  });
  cardSection.addItem(newCard.getView());
});

addCardPopup.setEventListeners();

//Open Popup with
cardEditButton.addEventListener("click", () => {
  openPopUp(cardEditModal);
});

//Render card function - =
/*function renderCard(data, cardListElement) {
  const card = new createCard(data);
  cardListElement.prepend(card);
}

//forEach render card - in section renderItems function
initialCards.forEach(function (data) {
  renderCard(data, cardListElement);
});

//Update 1st Card with user input
cardEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = userInputCardTitle.value;
  const link = userInputURL.value;
  renderCard({ name, link }, cardListElement);
  closePopUp(cardEditModal);
  //Reset to placeholders only when the submit button is clicked
  userInputCardTitle.value = "";
  userInputURL.value = "";
  addFormValidator.toggleButtonState();
});

//need to edit function to enable handlecardClick for preview -gets added into section
function createCard(data) {
  const card = new Card(data, "#card-template"); //add the handle clock function here after updating in card (data) => {.......}
  return card.getView();
}*/

//--------------------------------------------------

//--------------------------------------------------
//Unused Code
//Modal Open and Close Functions
//Close Popup with Escape key - utils
/*function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".modal_opened");
    closePopUp(openedPopUp);
  }
}*/

//Close Popup with Overlay click-utils ********TO BE SEEN TO AS NOT FULL FUNCTION************
//All modals -> each modal -> check if target clicked includes modal->returns true if click outside modal popup
/*modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopUp(modal);
    }
  });
});*/

//Utils
/*function openPopUp(modal) {
  document.addEventListener("keydown", handleEscape);
  modal.classList.add("modal_opened");
}*/
//Utils
/*function closePopUp(modal) {
  document.removeEventListener("keydown", handleEscape);
  modal.classList.remove("modal_opened");
}*/

//Profile Modal Event Listeners
//Close Popup with X //Add click listener for outside too here with if statement
/*profileModalCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});*/

//Profile Content from profile populates form placeholders
/*profileEditButton.addEventListener("click", () => {
  modalInputNameField.value = profileName.textContent;
  modalInputDescriptionField.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});*/

//Profile User Input updates on profile section
/*profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = modalInputNameField.value;
  profileDescription.textContent = modalInputDescriptionField.value;
  closePopUp(profileEditModal);
});*/

//Function to Enlarge cards for preview
/*function openCardPreview(cardData) {
  const modalImage = document.querySelector(".preview-modal__image");
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  const modalTitle = document.querySelector(".preview-modal__caption");
  modalTitle.textContent = cardData.name;
  openPopUp(previewModal);
}*/

//Render Cards Functions
//Render Cards from initialCards
//card class get Template use card Element constant breakdown
/*function getCardElement(cardData) {
  const cardElement = userCardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const previewButton = cardElement.querySelector("#preview-button");

  //Card Class setEventListeners
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  //Card Class setEventListeners
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  //Card Class setEventListeners
  previewButton.addEventListener("click", () => {
    openCardPreview(cardData);
  });

//Generate card
cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
}*/
//forEach render card
/*initialCards.forEach((cardData) => {
  renderCard(cardData);
});*/

//Render User Input Card
//forEach render card
/*function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}*/

//Needs to be changed here
//Card Modal Event Listeners
//Close Popup with X
/*cardModalCloseButton.addEventListener("click", () => {
  closePopUp(cardEditModal);
});*/

//Open Popup with +
/*cardEditButton.addEventListener("click", () => {
  openPopUp(cardEditModal);
});*/

//Update 1st Card with user input
/*cardEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = userInputCardTitle.value;
  const link = userInputURL.value;
  renderCard({ name, link });
  closePopUp(cardEditModal);
  //Reset to placeholders only when the submit button is clicked
  userInputCardTitle.value = "";
  userInputURL.value = "";
  //
  //disableSubmitButton(cardCreateButton, config);
  addFormValidator.toggleButtonState();
});*/

//Close Popup with X
/*previewCloseButton.addEventListener("click", () => {
  closePopUp(previewModal);
});*/
