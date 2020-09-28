function showInputError (formElement, inputElement, errorMessage, popupElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим нужный span по id
  inputElement.classList.add(popupElement["inputErrorClass"]); //Делаем границу поля красной
  errorElement.textContent = errorMessage; //Вставляем встроенное в браузер сообщение об ошибке в span
  errorElement.classList.add(popupElement["errorClass"]); //Делаем сообщение об ошибке видимым
};

function hideInputError (formElement, inputElement, popupElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(popupElement["inputErrorClass"]);
  errorElement.classList.remove(popupElement["errorClass"]);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, popupElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupElement);
  } else {
    hideInputError(formElement, inputElement, popupElement);
  }
};

function setEventListeners (formElement, popupElement) {
  const inputList = Array.from(formElement.querySelectorAll(popupElement["inputSelector"]));
  const buttonElemet = formElement.querySelector(popupElement["submitButtonSelector"]);
  toggleButtonState(inputList, buttonElemet, popupElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, popupElement);
      toggleButtonState(inputList, buttonElemet, popupElement);
    });
  });
};

function enableValidation(popupElement) {
  const formList = Array.from(document.querySelectorAll(popupElement["formSelector"])); // Делаем массив форм из объекта
  formList.forEach((formElement) => {
    setEventListeners(formElement, popupElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => { // Если хотя бы одно поле невалидно, вернет true
    return !inputElement.validity.valid; //Если все свойства validity поля корректны, то valid принимает значение true
  })
}

//toggleButtonState делает кнопку активной или неактивной в зависимости от валидности полей в форме
function toggleButtonState(inputList, buttonElement, popupElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupElement["inactiveButtonClass"]);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(popupElement["inactiveButtonClass"]);
    buttonElement.removeAttribute("disabled");
  }
}

function cleanErrors(formElement, popupElement) {
  const inputList = Array.from(formElement.querySelectorAll(popupElement["inputSelector"]));
  const buttonElemet = formElement.querySelector(popupElement["submitButtonSelector"]);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, popupElement);
    toggleButtonState(inputList, buttonElemet, popupElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
