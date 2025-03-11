import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createNewCard, deleteCard, toggleLike } from './scripts/card.js';
import { openPopup, closePopup, closeByOverlayClick } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

// Объект настроек валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включаем валидацию всех форм
enableValidation(validationConfig);

// Находим формы, чтобы передавать их в clearValidation
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const cardForm = document.querySelector(".popup_type_new-card .popup__form");

// Попапы
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Кнопки открытия и закрытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileCloseButtons = document.querySelectorAll(".popup__close");

// Картинки попапов
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// Картинки карточек
const placesList = document.querySelector(".places__list");

// Элементы формы 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Элементы новой карточки
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Отправка формы редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

// Слушатель отправки редакции профиля
profileForm.addEventListener("submit", submitEditProfileForm);

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
  const cardElement = createNewCard(newCard, deleteCard, openImgPopup, toggleLike);
  placesList.prepend(cardElement);
  cardForm.reset();
  closePopup(popupTypeNewCard);
};

// Слушатель отправки на обработку новой карточки
cardForm.addEventListener("submit", handleAddCard);


// Слушатель открытия попапа редактирования карточки
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(popupTypeEdit);
});

// Слушатель попапа новой карточки
profileAddButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openPopup(popupTypeNewCard);
});

// Слушатель кнопок  закрытия попапов
profileCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      if (popup) {
          closePopup(popup);
      }
  });
});

// Добавление обработчиков закрытия на все попапы
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closeByOverlayClick);
});

// Открытие попапов с картинкой
function openImgPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

// Отображение карточек
function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = createNewCard(card, deleteCard, openImgPopup, toggleLike);
    placesList.append(cardElement);
  });
};

// Вызов отображения карточек
showCards(initialCards);

// Работа завершена