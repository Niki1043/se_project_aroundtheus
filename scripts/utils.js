//Close with Esc
export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".modal_opened");
    closePopUp(openedPopUp);
  }
}

//Close with outside click
export function closePopUpWithOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopUp(evt.target);
  }
}

//Open Modal
export function openPopUp(modal) {
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", closePopUpWithOverlayClick);
  modal.classList.add("modal_opened");
}

//Close modal
export function closePopUp(modal) {
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("mousedown", closePopUpWithOverlayClick);
  modal.classList.remove("modal_opened");
}
