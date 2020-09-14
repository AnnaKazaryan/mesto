const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const cardFromTemplate = document.querySelector('.template').content;
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

const popupForPhoto = document.querySelector('.popup_type_photo');
const closePhotoButton = popupForPhoto.querySelector('.popup__close');
const photoOpened = popupForPhoto.querySelector('.popup__image');
const photoCaption = popupForPhoto.querySelector('.popup__caption');

function render() {
  initialCards.forEach(renderItem);
  setListeners();
}

function renderItem(item) {
	const htmlElement = cardFromTemplate.cloneNode(true);
  htmlElement.querySelector(".card__image").src = item.link;
  htmlElement.querySelector(".card__image").alt = item.name;
  htmlElement.querySelector(".card__text").textContent = item.name;
  photogrid.prepend(htmlElement); // Добавляем новую карточку в начало сетки
}


function profilePopupToggle() {
  if (!popupForProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  popupForProfile.classList.toggle('popup_opened'); // Toggle добавляет класс, если его нет, и удаляет - если есть.
}

function cardPopupToggle() {
  popupForCard.classList.toggle('popup_opened');
}

function likeToggle(evt) {
  evt.target.classList.toggle('card__like_color_black'); // evt.target даст нам конкретный like, который меняем на черный
}

function photoPopupToggle() {
  popupForPhoto.classList.toggle('popup_opened');
}

function deleteHandler(evt) {
  evt.target.closest('.card').remove(); // Удаляем родителя конкретной кнопки delete, т.е. конкретную карточку
}

function submitProfileHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profilePopupToggle();
}

function submitCardHandler(evt) {
  evt.preventDefault();
  let item = {
    name: photoNameInput.value,
    link: photoLinkInput.value
  };
  renderItem(item); // Добавляем карточку в photogrid
  photoNameInput.value = ''; // Очищаем Input'ы
  photoLinkInput.value = '';
  cardPopupToggle(); // Закрываем popup
  setListeners(); // Расставляем EventListener'ы для всех карточек, включая новую
}

function openPhoto(evt) {
  photoPopupToggle();
  let itemCard = evt.target.closest('.card');
  let text = itemCard.querySelector('.card__text');
  photoOpened.src = evt.target.getAttribute('src');
  photoOpened.alt = evt.target.getAttribute('alt');
  photoCaption.textContent = text.textContent;
}
profileForm.addEventListener('submit', submitProfileHandler);
cardForm.addEventListener('submit', submitCardHandler);

editProfileButton.addEventListener('click', profilePopupToggle);
closeProfileButton.addEventListener('click', profilePopupToggle);
addCardButton.addEventListener('click', cardPopupToggle);
closeCardButton.addEventListener('click', cardPopupToggle);
closePhotoButton.addEventListener('click', photoPopupToggle);

function setListeners() {
  document.querySelectorAll('.card__like').forEach((btn) => {
    btn.addEventListener("click", likeToggle);
  });
  document.querySelectorAll('.card__delete').forEach((btn) => {
    btn.addEventListener("click", deleteHandler);
  });
  document.querySelectorAll('.card__image').forEach((img) => {
    img.addEventListener("click", openPhoto);
  });
} // Следим за кликами на все лайки, делиты и картинки

render(); // Загружаем первоначальные картинки и расставляем EventListener'ы при открытии страницы
