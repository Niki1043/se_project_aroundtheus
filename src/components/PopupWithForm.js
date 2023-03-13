//Child of Popup
//Changes parent to update forms
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form"); //Select form class
    this._inputList = this._popupForm.querySelectorAll(".modal__input"); //get all input field classes from forms
    this._handleFormSubmit = handleFormSubmit;
  }

  //Collect data from input field and return as object
  _getInputValues() {
    this._formValues = {}; //empty object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues; // input field data returned as object
  }

  ///Modify parent set event listeners - add submit ev handler and click event to close icon
  setEventListeners() {
    super.setEventListeners(); //Close with X icon and overlay click
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); //pass in values from object with input values
      this.close();
    });
  }

  close() {
    super.close(); //call close for parent
    this._popupForm.reset(); //reset values of form on close - only works on this child
  }
}

export default PopupWithForm;
