// Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
};

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
};

// Закрытие попапа при нажати на кнопку Escape
const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    if (popupIsOpened) {
      closePopup(popupIsOpened);
    }
  }
};

// Закрытие попапа при клике на оверлэй
export function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

