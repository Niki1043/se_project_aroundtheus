//Handles Yes submit on delete confirm popup
import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form"); //Select form class for delete form
    this._confirmButton = document.querySelector("#delete-confirm-button"); //Yes button in form for delete check
  }

  //Set function for submit action - pass in new callback function passed in later, action arg = callback function:called dynamically in index.js
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners(); //set parent event listeners
    //needs to be button click linked to call back to delete the card = change from_popopelement to confirmbutton and submit to click 18/3am
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit(); //callback function to be set
    });
  }
}

export default PopupWithConfirmation;
