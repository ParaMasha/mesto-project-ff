// Открытие попапа с анимацией
export function openPopup(popup) {
  popup.classList.add("popup_is-opened"); 
  popup.style.opacity = "0";
  popup.style.transform = "scale(0.8)";
  popup.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";

  // Запускаем анимацию с задержкой
  setTimeout(() => {
    popup.style.opacity = "1";
    popup.style.transform = "scale(1)";
  }, 10);

  document.addEventListener("keydown", closePopupOnEsc);
}

// Закрытие попапа с анимацией
export function closePopup(popup) {
  popup.style.opacity = "0";
  popup.style.transform = "scale(0.8)";
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 300);

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
export function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}


