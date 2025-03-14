// Функция открытия попапа
export function openPopup(popup) { 
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc); 
};

// Функция закрытия попапа
export function closePopup(popup) { 
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc); 
};

// Закрытие попапа по клавише Esc
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
      const popupIsOpened = document.querySelector(".popup_is-opened");
      if (popupIsOpened) {
          closePopup(popupIsOpened);
      }
  }
};

// Закрытие попапа при клике на оверлей
export function closeByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};





