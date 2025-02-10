
import './pages/index.css';
import { initialCards } from './scripts/cards.js';

// Функция создания карточки
function createNewCard({name, link}, onCallBackFunction) {
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
    onCallBackFunction(cardElement);
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

console.log('Hello, World!');

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10