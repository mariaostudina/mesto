export class Card {
    constructor(name, link, /* alt, */ cardSelector, openFullSizePhoto) {
        this._name = name;
        this._link = link;
        /* this._alt = alt; */
        this._cardSelector = cardSelector;
        this._openFullSizePhoto = openFullSizePhoto;
    }

    //метод создания шаблона карточки

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.photos__item')
            .cloneNode(true);
                        
        return cardElement;
    }

        generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.photos__image').src = this._link;
        this._element.querySelector('.photos__caption').textContent = this._name;
        this._element.querySelector('.photos__image').alt = this._alt;

        this._setEventListeners();

        return this._element;

    }

    // метод добавления слушателий событий на кнопки карточки (лайк, удаление, открытие фулсайз)

    _setEventListeners() {
        this._element.querySelector('.photos__like-button').addEventListener('click', () => {
            this._likePhoto();
        });
        this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
            this._deletePhoto();
        });
        this._element.querySelector('.photos__image').addEventListener('click', () => {
            this._openFullSizePhoto(this._name, this._link, this._alt);
        });
    }

    // метод переключения состояния кнопки лайк

    _likePhoto() {
        this._element.querySelector('.photos__like-button').classList.toggle('photos__like-button_active');
    }

    // метод удаления карточки

    _deletePhoto() {
        this._element.remove()
    }
}