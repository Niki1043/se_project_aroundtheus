//Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  initialCards,
  config,
  profileEditButton,
  profileEditModal,
  profileName,
  profileDescription,
  modalInputNameField,
  modalInputDescriptionField,
  cardEditModal,
  cardEditButton,
} from "../utils/constants.js";

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

//Add Profile Form input and set on page
const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  userinfo.setUserInfo(values);
});

profilePopup.setEventListeners();

//--------------------------------------------------
//Add Card and Popup Instances
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
