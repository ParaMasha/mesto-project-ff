// Открытие попапа
export function openPopup(popup) {
  popup.classList.add(".popup_is_opened");
  document.addEventListener("keydown", closePopupOnEsc);
};

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove(".popup_is_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
};

// Закрытие попапа при нажати на кнопку Escape
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector(".popup_is_opened");
      if (popupIsOpened) {
        closePopup(popupIsOpened);
      }
  }
};
// Закрытие попапа при клике на оверлэй
export function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
