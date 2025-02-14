import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createNewCard, deleteCard } from './scripts/cards.js';
import { openPopup, closePopup, closePopupOnOverlay } from './scripts/modal.js';

// Получение попапов
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Получение кнопок открытия и закрытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileCloseButtons = document.querySelectorAll(".popup__close");

// Получение картинок попапов
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// Картинки карточек
const placesList = document.querySelector(".places__list");

// Элементы формы 
const formElement = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Элементы новой карточки
const addCardForm = popupTypeNewCard.querySelector(".popup__form");
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Отправка формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

// Слушатель отправки редакции профиля
formElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const cardTitle =  cardTitleInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = {name: cardTitle, link: cardLink};
  const cardElement = createNewCard(newCard, deleteCard, openImgPopup);
  placesList.prepend(cardElement);
  addCardForm.reset();
  closePopup(popupTypeNewCard);
};

// Слушатель отправки на обработку новой карточки
addCardForm.addEventListener("submit", handleAddCard);


// Слушатель открытия попапа редактирования карточки
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

// Слушатель попапа новой карточки
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

// Слушатель кнопок  закрытия попапов
profileCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopup(evt.currentTarget.closest(".popup"));
  });
});

// Слушатель закрытия попапов по клику Overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOnOverlay);
});

// Открытие попапов с картинкой
function openImgPopup (name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

// Отображение карточек на странице
function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = createNewCard(card, deleteCard, openImgPopup);
    placesList.append(cardElement);
  });
};

showCards(initialCards);
