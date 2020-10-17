import {closePopupByClickOnOverlay, togglePopup} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, formData} from './config.js';

const photogrid = document.querySelector(".photo-grid");
const popupForCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const cardForm = popupForCard.querySelector('.popup__form');
const closeCardButton = popupForCard.querySelector('.popup__close');
const photoNameInput = document.querySelector('.popup__input_type_photoname');
const photoLinkInput = document.querySelector('.popup__input_type_photolink');

const popupForProfile = document.querySelector('.popup_type_edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileForm = popupForProfile.querySelector('.popup__form');
const closeProfileButton = popupForProfile.querySelector('.popup__close');
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
  togglePopup(popupForProfile);
}

function addNewCard() {
  // Очищаем Input'ы, если пользователь вводил что-то ранее
  cardForm.reset();
  cardFormValidator.cleanErrors(); // Очищаем ошибки, если пользователь что-то ранее вводил. Для повторного использования формы.
  togglePopup(popupForCard);
}

function handleProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupForProfile);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: photoNameInput.value,
    link: photoLinkInput.value
  };
  addCardToGrid(item); // Добавляем карточку в photogrid
  togglePopup(popupForCard); // Закрываем popup
}

profileForm.addEventListener('submit', handleProfileSubmit);
cardForm.addEventListener('submit', handleCardSubmit);

editProfileButton.addEventListener('click', editProfile);
closeProfileButton.addEventListener('click', function(){togglePopup(popupForProfile)});
addCardButton.addEventListener('click', addNewCard);
closeCardButton.addEventListener('click', function(){togglePopup(popupForCard)});
popupForCard.addEventListener('click', function(event){closePopupByClickOnOverlay(event, popupForCard)});
popupForProfile.addEventListener('click', function(event){closePopupByClickOnOverlay(event, popupForProfile)});

render(); // Загружаем первоначальные картинки и расставляем EventListener'ы при открытии страницы
cardFormValidator.enableValidation(); //Включаем валидацию формы
profileFormValidator.enableValidation();
