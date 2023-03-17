//Handles Yes submit on delete confirm popup
import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form"); //Select form class for delete form
    //this._confirmButton = document.querySelector("#delete-confirm-button"); //Yes button in form for delete check
  }

  //Set function for submit action
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners(); //set parent event listeners
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(); //callback function to be set
    });
  }
}

export default PopupWithConfirmation;
