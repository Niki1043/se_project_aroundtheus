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

//Edit button opens modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

//Close button closes modal
const profileModalCloseButton = document.querySelector(".modal__close");
profileModalCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

//Content from profile populates form placeholders
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const modalInputNameField = document.querySelector(".modal__title");
const modalInputDescriptionField = document.querySelector(
  ".modal__description"
);

profileEditButton.addEventListener("click", () => {
  modalInputNameField.value = profileName.textContent;
  modalInputDescriptionField.value = profileDescription.textContent;
});

//User Input updates on profile section
const profileEditForm = profileEditModal.querySelector(".modal__form");
profileEditForm.addEventListener("submit", (evt) => {
  console.log("submit");
  evt.preventDefault();
  profileName.textContent = modalInputNameField.value;
  profileDescription.textContent = modalInputDescriptionField.value;
});

//Render Cards
const cardListElement = document.querySelector(".cards__list");
let userCardTemplate = document.querySelector("#card-template").content;

function getCardElement(cardData) {
  let cardElement = userCardTemplate.querySelector(".card").cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__name");
  let cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  console.log(cardImage);
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
