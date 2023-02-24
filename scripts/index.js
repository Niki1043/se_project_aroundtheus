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

//Profile Modal
//Profile Modal variables
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalInputNameField = document.querySelector("#modal-name");
const modalInputDescriptionField = document.querySelector("#modal-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");

//Modal Open and Close Functions
function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

//Profile Modal Event Listeners
//Close Popup with X
profileModalCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});
//Profile Content from profile populates form placeholders
profileEditButton.addEventListener("click", () => {
  modalInputNameField.value = profileName.textContent;
  modalInputDescriptionField.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});
//Profile User Input updates on profile section
profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = modalInputNameField.value;
  profileDescription.textContent = modalInputDescriptionField.value;
  closePopUp(profileEditModal);
});

//Add Cards Modal
//Card Modal variables
const cardEditButton = document.querySelector(".profile__add-button");
const cardEditModal = document.querySelector("#card-edit-modal");
//
const cardModalCloseButton = document.querySelector("#card-edit-close");
const cardEditForm = cardEditModal.querySelector("#card-edit-form");
const cardListElement = document.querySelector(".cards__list");
const userCardTemplate = document.querySelector("#card-template").content;
const userInputCardTitle = cardEditForm.querySelector("#cardmodal-name");
const userInputURL = cardEditForm.querySelector("#cardmodal-link");
//
const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = document.querySelector("#preview-close");

//Function to Enlarge cards for preview
function openCardPreview(cardData) {
  const modalImage = document.querySelector(".preview-modal__image");
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  const modalTitle = document.querySelector(".preview-modal__caption");
  modalTitle.textContent = cardData.name;
  openPopUp(previewModal);
}

//Render Cards Functions
//Render Cards from initialCards
function getCardElement(cardData) {
  const cardElement = userCardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const previewButton = cardElement.querySelector("#preview-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  previewButton.addEventListener("click", () => {
    openCardPreview(cardData);
  });

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

//Render User Input Card
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

//Needs to be changed here
//Card Modal Event Listeners
//Close Popup with X
cardModalCloseButton.addEventListener("click", () => {
  closePopUp(cardEditModal);
});

//Open Popup with +
cardEditButton.addEventListener("click", () => {
  openPopUp(cardEditModal);
});
//Update 1st Card with user input
cardEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = userInputCardTitle.value;
  const link = userInputURL.value;
  renderCard({ name, link });
  closePopUp(cardEditModal);
});
//Close Popup with X
previewCloseButton.addEventListener("click", () => {
  closePopUp(previewModal);
});
