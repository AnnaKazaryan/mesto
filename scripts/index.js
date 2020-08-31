let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let profileName=document.querySelector('.profile__name');
let profileJob=document.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close');
let nameInput=document.querySelector('.popup__name');
let jobInput=document.querySelector('.popup__job');

//Первоначальные значения в inputах:
nameInput.value=profileName.textContent;
jobInput.value=profileJob.textContent;

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent=nameInput.value;
    profileJob.textContent=jobInput.value;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function closePopup() {
  //Отменяем изменения в inputах, чтобы их не было при следующем открытии формы
  nameInput.value=profileName.textContent;
  jobInput.value=profileJob.textContent;
  popupToggle();
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', closePopup);
