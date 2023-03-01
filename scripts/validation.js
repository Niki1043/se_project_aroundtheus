//Create variable with object selectors and add class names as values
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error_input_type",
  errorClass: "modal__error_visible",
};

//Show Error Function with Validation Message
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

//Hide Error Function and removeValidation Message
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

//Check input element validity -> if returns false, show input error
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

//Checks validity of every input element - returns false if not all valiud
function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  return (buttonElement.disabled = true);
}

function enableSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

//If invalid input returns false, disable button
function toggleButtonState(
  inputElements,
  buttonElement,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableSubmitButton(buttonElement, { inactiveButtonClass });
  } else {
    enableSubmitButton(buttonElement, { inactiveButtonClass });
  }
}

//Add Input Listener for every input to link showing error message and button state
function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, buttonElement, options);
    });
  });
}

//Setup for all forms in HTML
function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)]; //Use spread intead of Array.from gets all forms
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

enableValidation(config);
