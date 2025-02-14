export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки
export function createNewCard({name, link}, onDelete, clickOnImage) {
  // Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;

  // Клонирование шаблона карточки
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  // Установление значений вложенных элементов
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  // Добавление к иконке удаления обработчика клика
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  // Установка лайка на карточке
  cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });

  // Слушатель открытия карточки с картинкой
  cardImage.addEventListener("click", () => {
    clickOnImage(name, link);
  })

  // Возвращение готового элемента карточки
  return cardElement;
}

// Функция удаления карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}


