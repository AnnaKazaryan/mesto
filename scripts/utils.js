const popupForPhoto = document.querySelector('.popup_type_photo');
const closePhotoButton = popupForPhoto.querySelector('.popup__close');
const photoOpened = popupForPhoto.querySelector('.popup__image');
const photoCaption = popupForPhoto.querySelector('.popup__caption');


function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    document.removeEventListener('keydown', handleKeydown);
  }
}

function openPhoto(evt) {
  togglePopup(popupForPhoto);
  const itemCard = evt.target.closest('.card');
  const text = itemCard.querySelector('.card__text');
  photoOpened.src = evt.target.getAttribute('src');
  photoOpened.alt = evt.target.getAttribute('alt');
  photoCaption.textContent = text.textContent;
}

function closePopupByClickOnOverlay(evt, popup) {

  if (evt.target !== evt.currentTarget) {
    return
  }
  togglePopup(popup);
}

function handleKeydown(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if ((evt.key === "Escape") && (openedPopup)) {
    togglePopup(openedPopup);
  }
}

closePhotoButton.addEventListener('click', function(){togglePopup(popupForPhoto)});
popupForPhoto.addEventListener('click', function(event){closePopupByClickOnOverlay(event, popupForPhoto)});

export {openPhoto, closePopupByClickOnOverlay, togglePopup};
