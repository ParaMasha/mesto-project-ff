import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createNewCard, deleteCard, toggleLike } from './scripts/card.js';
import { openPopup, closePopup, closeByOverlayClick } from './scripts/modal.js';

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
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

// Слушатель отправки редакции профиля
formEditProfile.addEventListener("submit", submitEditProfileForm);

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
  const cardElement = createNewCard(newCard, deleteCard, openImgPopup, toggleLike);
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