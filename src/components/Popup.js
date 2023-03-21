//Popup class opens and closes popup window
class Popup {
  //add constructor - 1param = popup selector
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector); //CSS selector popup -preview/profile/cardedit
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //public open method
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    //document.addEventListener("mousedown", this._handleOverlayClose);
  }

  //public close method
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    //document.removeEventListener("mousedown", this._handleOverlayClose);
  }

  //store logic for closing popup with Esc key
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //add close with overlay function
  _handleOverlayClose = (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  };

  //Set Event Listeners for X icon and overlay click and Esc
  setEventListeners() {
    //close with icon click and with Esc and overlay click
    //this._popupElement.addEventListener("click", this.close());
    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }
}

export default Popup;
