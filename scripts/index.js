import {closePopup, openPopup} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, formData} from './config.js';

const photogrid = document.querySelector(".photo-grid");
const popupForCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const cardForm = popupForCard.querySelector('.popup__form');
const photoNameInput = document.querySelector('.popup__input_type_photoname');
const photoLinkInput = document.querySelector('.popup__input_type_photolink');

const popupForProfile = document.querySelector('.popup_type_edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileForm = popupForProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const cardFormValidator = new FormValidator(cardForm, formData);
const profileFormValidator = new FormValidator(profileForm, formData);

function render() {
  initialCards.forEach(addCardToGrid);
}

function addCardToGrid(item) {
  const card = new Card (item, '.template');
  photogrid.prepend(card.generateCard()); // Добавляем новую карточку в начало сетки
}


function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.cleanErrors(); // Очищаем ошибки, если пользователь что-то ранее вводил. Для повторного использования формы.
  openPopup(popupForProfile);
}

function addNewCard() {
  // Очищаем Input'ы, если пользователь вводил что-то ранее
  cardForm.reset();
  cardFormValidator.cleanErrors(); // Очищаем ошибки, если пользователь что-то ранее вводил. Для повторного использования формы.
  openPopup(popupForCard);
}

function handleProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForProfile);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: photoNameInput.value,
    link: photoLinkInput.value
  };
  addCardToGrid(item); // Добавляем карточку в photogrid
  closePopup(popupForCard); // Закрываем popup
}

profileForm.addEventListener('submit', handleProfileSubmit);
cardForm.addEventListener('submit', handleCardSubmit);

editProfileButton.addEventListener('click', editProfile);
addCardButton.addEventListener('click', addNewCard);

popupForCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupForCard);
  }
});
popupForProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupForProfile);
  }
});

render(); // Загружаем первоначальные картинки и расставляем EventListener'ы при открытии страницы
cardFormValidator.enableValidation(); //Включаем валидацию формы
profileFormValidator.enableValidation();
