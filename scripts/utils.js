const popupForPhoto = document.querySelector('.popup_type_photo');
const photoOpened = popupForPhoto.querySelector('.popup__image');
const photoCaption = popupForPhoto.querySelector('.popup__caption');


function openPopup(popup) {
  popup.classList.toggle('popup_opened');
  document.addEventListener('keyup', handleKeyup);
}

function closePopup(popup) {
  popup.classList.toggle('popup_opened');
  document.removeEventListener('keyup', handleKeyup);
}


function openPhoto(evt) {
  openPopup(popupForPhoto);
  const itemCard = evt.target.closest('.card');
  const text = itemCard.querySelector('.card__text');
  photoOpened.src = evt.target.getAttribute('src');
  photoOpened.alt = evt.target.getAttribute('alt');
  photoCaption.textContent = text.textContent;
}

function handleKeyup(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }

}

popupForPhoto.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupForPhoto);
  }
});

export {openPhoto, openPopup, closePopup};
