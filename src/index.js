import './pages/index.css';
import { createNewCard, deleteCard, toggleLike } from './scripts/card.js';
import { openPopup, closePopup, closeByOverlayClick } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getMyInfo, getInitialCards, editProfile, addCard, deleteCardById, createAvatar } from './scripts/api.js';

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

//Аватар
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = popupAvatar.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar-url");
const profileAvatarContainer = document.querySelector(".profile__image-container");
const profileAvatar = document.querySelector(".profile__image");

let myUserId; 

// Функция отправки формы редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  const submitButton = profileForm.querySelector(".popup__button");

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  editProfile(newName, newAbout)
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

// Слушатель отправки формы редактирования профиля
profileForm.addEventListener("submit", submitEditProfileForm);

// Функция добавления карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newName = cardTitleInput.value.trim();
  const newLink = cardLinkInput.value.trim();
  const submitButton = cardForm.querySelector(".popup__button");

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  addCard(newName, newLink)
    .then((cardData) => {
      console.log("Добавлена карточка:", cardData);
      const cardElement = createNewCard(cardData, myUserId, handleDeleteCard, openImgPopup, toggleLike);
      placesList.prepend(cardElement);
      cardForm.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
      alert("Ошибка при добавлении карточки. Проверьте данные!");
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

// Слушатель отправки формы добавления карточки
cardForm.addEventListener("submit", handleAddCard);

// Слушатель открытия попапа редактирования профиля
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

// Слушатель кнопок закрытия попапов
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

// Функция открытия попапа с картинкой
function openImgPopup(name, link) {
  if (!popupImage || !popupCaption) {
    console.error("Ошибка: popupImage или popupCaption не найдены!");
    return;
  }

  popupImage.src = link;
  popupImage.alt = name || "Изображение";
  popupCaption.textContent = name || "Без названия";

  openPopup(popupTypeImage);
}

// Функция удаления карточки
function handleDeleteCard(cardElement, cardId) {
  deleteCardById(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

// Функция отображения карточек
function showCards(cards, myUserId) {
  cards.forEach((cardData) => {
    const cardElement = createNewCard(cardData, myUserId, handleDeleteCard, openImgPopup, toggleLike);
    placesList.append(cardElement);
  });
}

// Запрос данных пользователя и карточек с сервера
Promise.all([getMyInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    myUserId = userData._id; 
    showCards(cards, myUserId);
  })
  .catch((err) => {
    console.error(`Ошибка при загрузке данных: ${err}`);
  });

// Слушатель на клик по аватарке для смены изображения
profileAvatarContainer.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
});

// Обработчик отправки формы смены аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarURL = avatarInput.value;
  const submitButton = avatarForm.querySelector(".popup__button");

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  createAvatar(avatarURL)
    .then((res) => {
      profileAvatar.src = res.avatar; 
      closePopup(popupAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
});
