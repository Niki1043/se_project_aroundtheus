//Popup class opens and closes popup window
class Popup {
  //add constructor - 1param = popup selector
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector); //CSS selector for popup class can be any popup -preview/profile/cardedit
    this._closeButton = document.querySelector(".modal__close"); //set CSS selector for closing popups
  }

  //public open method
  open() {
    this._popupElement.classList.add("modal_opened");
  }

  //public close method
  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  //store logic for closing popup with Esc key
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //add close with overlay function
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  }

  //Set Event Listeners for X icon and overlay click
  setEventListeners() {
    //close with overlay click
    this._popupElement.addEventListener("click", this._handleOverlayClose); //check this, is it popupselector?
    //close with icon click
    this._closeButton.addEventListener("click", this.close);
  }
}

export default Popup;
