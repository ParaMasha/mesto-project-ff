import { addLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция получения клонированного шаблона карточки
function getCardTemplate() {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

// Функция переключения лайка с обновлением с сервера
export function toggleLike(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest(".places__item");
  const likeCountElement = cardElement.querySelector(".card__like-counter");
  const cardId = cardElement.dataset.id;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (!isLiked) {
    addLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при лайке: ${err}`));
  } else {
    removeLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при дизлайке: ${err}`));
  }
}

// Функция создания карточки
export function createNewCard({ name, link, likes = [], _id }, onDelete, clickOnImage) {
  const cardElement = getCardTemplate();
  cardElement.dataset.id = _id; // Добавляем ID карточки

  // Устанавливаем изображение
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  // Устанавливаем название
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  // Устанавливаем количество лайков
  const likeCountElement = cardElement.querySelector(".card__like-counter");
  likeCountElement.textContent = likes.length;

  // Добавляем обработчик удаления карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  // Добавляем обработчик лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", toggleLike);

  // Добавляем обработчик клика по изображению
  cardImage.addEventListener("click", () => clickOnImage(name, link));

  return cardElement;
}

// Функция удаления карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}