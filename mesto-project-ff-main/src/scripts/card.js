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

// Создание карточки
export function createNewCard({ name, link, likes = [], owner = {}, _id }, myUserId, onDelete, clickOnImage) {
  const cardElement = getCardTemplate();
  cardElement.dataset.id = _id;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  const likeCountElement = cardElement.querySelector(".card__like-counter");
  likeCountElement.textContent = likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (owner && owner._id === myUserId) {
    deleteButton.addEventListener("click", () => onDelete(cardElement, _id));
  } else {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => toggleLike(evt));

  cardImage.addEventListener("click", () => clickOnImage(name, link));

  return cardElement;
}

// Функция удаления карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}