class FormValidator {
  constructor (formElement, data) {
    this._formElement = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); //находим нужный span по id
    inputElement.classList.add(this._inputErrorClass); //Делаем границу поля красной
    errorElement.textContent = errorMessage; //Вставляем встроенное в браузер сообщение об ошибке в span
    errorElement.classList.add(this._errorClass); //Делаем сообщение об ошибке видимым
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElemet = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElemet);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElemet);
      });
    });
  };

  enableValidation() {
      this._setEventListeners();
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => { // Если хотя бы одно поле невалидно, вернет true
      return !inputElement.validity.valid; //Если все свойства validity поля корректны, то valid принимает значение true
    })
  }

  //toggleButtonState делает кнопку активной или неактивной в зависимости от валидности полей в форме
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  // Доп. метод, чтобы чистить поля от ошибок для повторного использования
  cleanErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElemet = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(inputList, buttonElemet);
    });
  }

}

export default FormValidator;
