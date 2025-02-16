// Открытие попапа
export function openPopup(popup) { 
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc); 
} 

// Закрытие попапа
export function closePopup(popup) { 
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc); 
} 

// Закрытие попапа по Esc
const closePopupOnEsc = (evt) => {
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
}

// Добавление обработчиков закрытия на все попапы
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlayClick);
});




