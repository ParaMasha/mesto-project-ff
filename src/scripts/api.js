// Настройка api 
const config = { 
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33', 
  headers: { 
    authorization: '1ad8ca18-9189-43b5-8819-a2f6900b4a3a', 
    'Content-Type': 'application/json' 
  } 
};  

// Функция обработки ответа сервера
function getFeedbackData(res) { 
  if (!res.ok) { 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
  return res.json(); 
} 

// Загрузка информации о пользователе
export function getMyInfo() { 
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'GET', 
    headers: config.headers 
  }).then(getFeedbackData);
} 

// Получение данных карточек
export function getInitialCards() { 
  return fetch(`${config.baseUrl}/cards`, { 
    headers: config.headers 
  }).then(getFeedbackData);
} 

// Редактирование данных профиля пользователя
export function editProfile(name, about) { 
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'PATCH', 
    headers: config.headers, 
    body: JSON.stringify({ name, about }) 
  }).then(getFeedbackData);
} 

// Добавление новой карточки
export function addCard(name, link) { 
  return fetch(`${config.baseUrl}/cards`, { 
    method: 'POST', 
    headers: config.headers, 
    body: JSON.stringify({ name, link }) 
  }).then(getFeedbackData);
} 

// Удаление карточки
export function deleteCardById(cardId) { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers 
  }).then(getFeedbackData);
} 

// Установка лайка
export function addLike(cardId) { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: config.headers, 
  }).then(getFeedbackData);
} 

// Удаление лайка
export function removeLike(cardId) { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers, 
  }).then(getFeedbackData);
} 

// Изменение аватара
export function createAvatar(avatarURLpath) { 
  return fetch(`${config.baseUrl}/users/me/avatar`, { 
    method: "PATCH", 
    headers: config.headers, 
    body: JSON.stringify({ avatar: avatarURLpath }), 
  }).then(getFeedbackData);
}