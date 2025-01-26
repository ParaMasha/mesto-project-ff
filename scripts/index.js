

// Функция создания карточки
function createNewCard({name, link}, deleteCallBackFunction) {
  // Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;

  // Клонирование шаблона карточки
  let cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  // Установление значений вложенных элементов
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  // Добавление к иконке удаления обработчика клика
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCallBackFunction(cardElement);
  });

  // Возвращение готового элемента карточки
  return cardElement;
}

// Функция удаления карточки из DOM
function deleteCard(cardElement) {
  cardElement.remove();
}

// Отображение карточек на странице
const placesList = document.querySelector(".places__list");

function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = createNewCard(card, deleteCard);
    placesList.append(cardElement);
  });
}

showCards(initialCards);
