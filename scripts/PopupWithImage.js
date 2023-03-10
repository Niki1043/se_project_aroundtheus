//Child of Popup
//Changes parent open method to add image to popup with src and caption
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    //instantiate parent constructor and get access to popupelement from parent
    super(popupSelector);
    //set name and link properties from popupPreview to assign values with open
    this._previewImage = this._popupElement.querySelector(
      ".preview-modal__image"
    );
    this._previewName = this._popupElement.querySelector(
      ".preview-modal__caption"
    );
  }
  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewName.textContent = name;
    super.open(); //parent open method called
  }
}

export default PopupWithImage;
