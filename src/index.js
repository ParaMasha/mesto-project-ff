import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createNewCard, deleteCard } from './scripts/cards.js';
import { openPopup, closePopup, closePopupOnOverlay } from './scripts/modal.js';

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
const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Элементы новой карточки
const formAddCard = popupTypeNewCard.querySelector(".popup__form");
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Отправка формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

function handleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

// Слушатель отправки редакции профиля
formEditProfile.addEventListener("submit", handleFormSubmit);

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
  const cardElement = createNewCard(newCard, deleteCard, openImgPopup, handleLikeCard);
  placesList.prepend(cardElement);
  formAddCard.reset();
  closePopup(popupTypeNewCard);
};

// Слушатель отправки на обработку новой карточки
formAddCard.addEventListener("submit", handleAddCard);


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
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Открытие попапов с картинкой
function openImgPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
}

// Отображение карточек
function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = createNewCard(card, deleteCard, openImgPopup, handleLikeCard);
    placesList.append(cardElement);
  });
}

// Вызов отображения карточек
showCards(initialCards);

// Работа завершена