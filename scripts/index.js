//Imports
import FormValidator from "./FormValidator.js";
import {
  handleEscape,
  closePopUpWithOverlayClick,
  openPopUp,
  closePopUp,
} from "./utils.js";
import Card from "./Card.js";

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
//const profileEditForm = profileEditModal.querySelector(".modal__form");

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

//Close with Overlay Click
modals.forEach((modal) => {
  modal.addEventListener("mousedown", closePopUpWithOverlayClick);
});

//--------------------------------------------------
//Profile Modal Functions
//Profile Content from profile populates form placeholders
function editProfileButton() {
  modalInputNameField.value = profileName.textContent;
  modalInputDescriptionField.value = profileDescription.textContent;
  openPopUp(profileEditModal);
}

//Profile User Input updates on profile section
profileEditModal.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = modalInputNameField.value;
  profileDescription.textContent = modalInputDescriptionField.value;
  closePopUp(profileEditModal);
});

profileEditButton.addEventListener("click", editProfileButton);

//--------------------------------------------------
//Add Card Functions
//Open Popup with
cardEditButton.addEventListener("click", () => {
  openPopUp(cardEditModal);
});

//Render card function
function renderCard(data, cardListElement) {
  const card = new createCard(data);
  cardListElement.prepend(card);
}

//forEach render card
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

function createCard(data) {
  const card = new Card(data, "#card-template");
  return card.getView();
}

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
