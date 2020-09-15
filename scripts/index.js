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
}

function renderItem(item) {
  const htmlElement = cardFromTemplate.cloneNode(true);
  const cardImage = htmlElement.querySelector(".card__image");
  const cardText = htmlElement.querySelector(".card__text");
  const card = htmlElement.querySelector(".card");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardText.textContent = item.name;
  photogrid.prepend(htmlElement); // Добавляем новую карточку в начало сетки
  card.querySelector('.card__like').addEventListener("click", likeToggle);
  card.querySelector('.card__delete').addEventListener("click", deleteHandler);
  cardImage.addEventListener("click", openPhoto);// Следим за кликами на все лайки, делиты и картинки
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened'); // Toggle добавляет класс, если его нет, и удаляет - если есть.
}

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupForProfile);
}

function addNewCard() {
  // Очищаем Input'ы, если пользователь вводил что-то ранее
  cardForm.reset();
  togglePopup(popupForCard);
}

function likeToggle(evt) {
  evt.target.classList.toggle('card__like_color_black'); // evt.target даст нам конкретный like, который меняем на черный
}

function deleteHandler(evt) {
  evt.target.closest('.card').remove(); // Удаляем родителя конкретной кнопки delete, т.е. конкретную карточку
}

function submitProfileHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupForProfile);
}

function submitCardHandler(evt) {
  evt.preventDefault();
  let item = {
    name: photoNameInput.value,
    link: photoLinkInput.value
  };
  renderItem(item); // Добавляем карточку в photogrid
  togglePopup(popupForCard); // Закрываем popup
}

function openPhoto(evt) {
  togglePopup(popupForPhoto);
  let itemCard = evt.target.closest('.card');
  let text = itemCard.querySelector('.card__text');
  photoOpened.src = evt.target.getAttribute('src');
  photoOpened.alt = evt.target.getAttribute('alt');
  photoCaption.textContent = text.textContent;
}

profileForm.addEventListener('submit', submitProfileHandler);
cardForm.addEventListener('submit', submitCardHandler);

editProfileButton.addEventListener('click', editProfile);
closeProfileButton.addEventListener('click', (evt) => togglePopup(popupForProfile));
// Можно еще написать вот так:
// closeProfileButton.addEventListener('click', function(){togglePopup(popupForProfile)});
addCardButton.addEventListener('click', addNewCard);
closeCardButton.addEventListener('click', (evt) => togglePopup(popupForCard));
closePhotoButton.addEventListener('click', (evt) => togglePopup(popupForPhoto));

render(); // Загружаем первоначальные картинки и расставляем EventListener'ы при открытии страницы
