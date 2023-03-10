//Child of Popup
//Changes parent to update forms
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form"); //Select form class
    this._inputList = this._popupForm.querySelectorAll(".modal__input"); //get all input field classes from forms
    this._handleFormSubmit = handleFormSubmit;
  }

  //Collect data from input field and return as object
  _getInputValues() {
    //this._inputList = this._popupForm.querySelectorAll(".modal__input"); //get all input field classes from forms
    this._formValues = {}; //empty object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    }); //store each input as key name and value
    return this._formValues; // input field data returned as object
  }

  ///Modify parent set event listeners - add submit ev handler and click event to close icon
  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); //pass in values from object with input values
      //this._popupForm.reset();
      super.setEventListeners(); //Close with X icon and overlay click
      //this.close();
    });
  }

  close() {
    this._popupForm.reset(); //reset values of form on close - only works on this child
    super.close(); //call close for parent
  }
}

export default PopupWithForm;

//index.js - create instance
/* const newCardPopup = new Popupform("#pass-in-id which is popupselectpr",() => {invoke function with stuff from above})
newCardPopup.open() //same functions from parent class
newCardPopup.close()
*/
