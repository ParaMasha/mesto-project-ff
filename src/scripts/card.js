const cardTemplate = document.querySelector("#card-template").content;

// Функция получения клонированного шаблона карточки
function getCardTemplate() {
    return cardTemplate.querySelector(".places__item").cloneNode(true);
}

// Функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция создания карточки
export function createNewCard({ name, link }, onDelete, clickOnImage, handleLikeCard) {
  const cardElement = getCardTemplate();

  // Установление значений вложенных элементов
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  // Добавление обработчика удаления карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  // Добавление обработчика лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeCard || toggleLike); // Используем переданную функцию или `toggleLike` по умолчанию

  // Обработчик клика по изображению
  cardImage.addEventListener("click", () => clickOnImage(name, link));

  return cardElement;
}

// Функция удаления карточки из DOM
export function deleteCard(cardElement) {
    cardElement.remove();
}