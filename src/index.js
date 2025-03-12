import './pages/index.css';
import { createNewCard, deleteCard, toggleLike } from './scripts/card.js';
import { openPopup, closePopup, closeByOverlayClick } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getMyInfo, getInitialCards,editProfile, addCard, addLike, removeLike, deleteCardById, createAvatar} from './scripts/api.js';

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
const popupAvatar = document.querySelector(".popup__image_new_avatar"); 
const avatarForm = popupAvatar.querySelector(".popup__form"); 
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar-url");
const profileAvatar = document.querySelector(".profile__image"); 

// Отправка формы редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  editProfile(newName, newAbout)
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    });
};

// Слушатель отправки редакции профиля
profileForm.addEventListener("submit", submitEditProfileForm);

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newName = cardTitleInput.value;
  const newLink = cardLinkInput.value;

  // Отправляем POST-запрос, создаём карточку на сервере
  addCard(newName, newLink)
    .then((cardData) => {
      const cardElement = createNewCard(cardData, deleteCard, openImgPopup, toggleLike);
      placesList.prepend(cardElement);
      cardForm.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    });
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
  cards.forEach((cardData) => {
    const cardElement = createNewCard(cardData, deleteCard, openImgPopup, toggleLike);
    placesList.append(cardElement);
  });
};


Promise.all([getMyInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    const myUserId = userData._id;
    showCards(cards, myUserId);
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  });

  // Обработчик клика на аватар
  profileAvatar.addEventListener("click", () => {
    avatarForm.reset(); 
    clearValidation(avatarForm, validationConfig);
    openPopup(popupAvatar);
  });


  // Обработчик клика по аватару
  profileAvatar.addEventListener("click", () => {
    if (!popupAvatar) {
      console.log("Ошибка: попап смены аватара не найден!");
      return;
    }
  
    avatarForm.reset(); 
    clearValidation(avatarForm, validationConfig); 
    openPopup(popupAvatar); 
  });

  // Смена аватара 
  function submitAvatarForm(evt) {
    evt.preventDefault();
    const avatarURL = avatarInput.value;
  
    createAvatar(avatarURL) 
      .then((res) => {
        profileAvatar.src = res.avatar; 
        closePopup(popupAvatar); 
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      });
  }
  
  // Добавляем слушатель на отправку формы
  avatarForm.addEventListener("submit", submitAvatarForm);