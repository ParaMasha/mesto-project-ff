// Добавление класса с ошибкой 
function displayInputError (formElement, fieldElement, errorMsg, validationConfig) { 
  const errorElement = formElement.querySelector(`.${fieldElement.id}-error`); 
  fieldElement.classList.add(validationConfig.inputErrorClass); 
  errorElement.textContent = errorMsg; 
  errorElement.classList.add(validationConfig.errorClass); 
}; 
 
// Скрытие ошибки в поле ввода 
function removeInputError (formElement, fieldElement, validationConfig) { 
  const errorElement = formElement.querySelector(`.${fieldElement.id}-error`); 
  fieldElement.classList.remove(validationConfig.inputErrorClass); 
  errorElement.classList.remove(validationConfig.errorClass); 
  errorElement.textContent = ''; 
}; 
 
// Проверка валидности заполнения поля 
function isValid (formElement, fieldElement, validationConfig) { 
  if (fieldElement.validity.patternMismatch) { 
    fieldElement.setCustomValidity(fieldElement.dataset.errorMessage); 
  } else { 
    fieldElement.setCustomValidity(''); 
  }; 
 
  if (!fieldElement.validity.valid) { 
    displayInputError(formElement, fieldElement, fieldElement.validationMessage, validationConfig); 
  } else { 
    removeInputError(formElement, fieldElement, validationConfig); 
  } 
}; 
 
// Проверка наличия невалидного поля в форме 
function hasInvalidFields (fields) { 
  return fields.some(input => !input.validity.valid); 
} 

// **Функция для отключения кнопки отправки**
const disableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

// **Включение и выключение кнопки отправки** 
function useSubmitButton (fields, buttonElement, validationConfig) { 
  if (hasInvalidFields(fields)) { 
    disableSubmitButton(buttonElement, validationConfig);
  } else { 
    buttonElement.disabled = false; 
    buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
  } 
}; 
 
// Слушатели для валидации всех полей в форме  
function addEventListeners (formElement, validationConfig) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector); 
  useSubmitButton(inputList, submitButton, validationConfig); 
  inputList.forEach((fieldElement) => { 
    fieldElement.addEventListener('input', () => { 
      isValid(formElement, fieldElement, validationConfig); 
      useSubmitButton(inputList, submitButton, validationConfig); 
    }); 
  }); 
}; 
 
// Включение валидации для форм 
export function enableValidation (validationConfig) { 
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', (evt) => evt.preventDefault()); 
    addEventListeners(formElement, validationConfig); 
  }); 
}; 
 
// Выключение валидации для форм 
export function clearValidation (formElement, validationConfig) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); 
  inputList.forEach((fieldElement) => removeInputError(formElement, fieldElement, validationConfig)); 
  disableSubmitButton(buttonElement, validationConfig);
};