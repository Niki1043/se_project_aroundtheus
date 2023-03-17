//Initial Cards to be rendered
/*export const initialCards = [
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
];*/

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error_input_type",
  errorClass: "modal__error_visible",
};

//-------------------------------------------------------------------------------
//Profile Constants
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);

export const profileEditModal = document.querySelector("#profile-edit-modal");

export const profileName = document.querySelector(".profile__title");

export const profileDescription = document.querySelector(
  ".profile__description"
);

export const modalInputNameField = document.querySelector("#modal-name");

export const modalInputDescriptionField =
  document.querySelector("#modal-description");

//-------------------------------------------------------------------------------
//Card Constants
export const cardEditModal = document.querySelector("#card-edit-modal");
export const cardEditButton = document.querySelector(".profile__add-button");

//-------------------------------------------------------------------------------
//Profile Avatar Constants
export const avatarEditModal = document.querySelector(
  "#profileimage-edit-modal"
);

export const profileAvatar = document.querySelector("#profileimage-link");

export const avatarButton = document.querySelector(".profile__avatar-edit");
