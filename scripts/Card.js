import {openPhoto} from './utils.js';

class Card {
  constructor (data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__text').textContent = this._text;

    return this._element;
  }

  _toggleLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_color_black');
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {

    this._element.querySelector('.card__like').addEventListener("click", () => {
      this._toggleLike()
    });
    this._element.querySelector('.card__delete').addEventListener("click", () => {
      this._handleDelete()
    });
    this._element.querySelector(".card__image").addEventListener("click", () => {
      openPhoto(event)
    });
  }

}

export default Card;
