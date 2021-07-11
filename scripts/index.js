import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


const initialPhotos = [
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

const photosContainerElement = document.querySelector('.photos');
const profileEditButtonNode = document.querySelector('.profile__edit-button');
const profileAddButtonNode = document.querySelector('.profile__add-button');
const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');
const editPopupNode = document.querySelector('.popup_type_edit');
const addPopupNode = document.querySelector('.popup_type_add');
const popupFullsizeNode = document.querySelector('.popup_type_fullsize');
const popupNameNode = document.querySelector('.popup__input_type_name');
const popupDescribtionNode = document.querySelector('.popup__input_type_describtion');
const popupFormNode = document.querySelector('.popup__form');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const addCardForm = document.querySelector('.popup__form_type_add');
const popupLinkNode = document.querySelector('.popup__input_type_link');
const popupCaptionNode = document.querySelector('.popup__input_type_caption');
const popupFullsizeContainerNode = document.querySelector('.popup__container-fullsize');
const fullsizeTitle = popupFullsizeContainerNode.querySelector('.popup__title_form_fullsize');
const fullsizeImage = popupFullsizeContainerNode.querySelector('.popup__image-fullsize');
const popups = document.querySelectorAll('.popup');
const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        saveButtonSelector: '.popup__save-button',
        invalideButtonClass: 'popup__save-button_invalid',
        iinvalidInputClass: 'popup__input_type_invalid',
        errorClass: 'error'
};
const validationEditForm = new FormValidator(validationConfig, editProfileForm);
const validationAddForm = new FormValidator(validationConfig, addCardForm);


// функция отрисовки первых шести карточек

function renderPhotos() {
        const photoItems = initialPhotos.map(item => {
                return createCard({name: item.name, link: item.link})
});         
        photosContainerElement.append(...photoItems);
}

function createCard(item) {
  return new Card(item, '.template', openFullSizePhoto).generateCard();
}

// функция добавления новой карточки

function addNewPhoto() {
        const inputCaption = popupCaptionNode.value;
        const inputLink = popupLinkNode.value;
        const cardElement = createCard({name: inputCaption, link: inputLink});
        photosContainerElement.prepend(cardElement);
}

// функция открытия фулсайз фотографии

const openFullSizePhoto  = (name, link) => {
        fullsizeTitle.textContent = name;
        fullsizeImage.src = link;
        openPopup(popupFullsizeNode);
}

// функция открытия попапов

function openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', closeByEscape);
}

// открытие попапа редактирования профиля

profileEditButtonNode.addEventListener('click', () => {
        openPopup(editPopupNode);
        popupNameNode.value = profileTitleNode.textContent;
        popupDescribtionNode.value = profileSubtitleNode.textContent;
});

// открытие попапа добавления новой карточки

profileAddButtonNode.addEventListener('click', () => {
        openPopup(addPopupNode);
});

// функция закрытия попапов

function closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', closeByEscape);
}

// функция закрытия попапов по кнопке esc

function closeByEscape(evt) {
        if (evt.key === 'Escape') {
                const openedPopup = document.querySelector('.popup_opened')
                closePopup(openedPopup);
        }
}

// закрытие попапов по оверлею

popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                        closePopup(popup)
                }
                if (evt.target.classList.contains('popup__close-button')) {
                        closePopup(popup)
                }
        })
})


function submitForm(event) {
        event.preventDefault();
        profileTitleNode.textContent = popupNameNode.value;
        profileSubtitleNode.textContent = popupDescribtionNode.value;
        closePopup(editPopupNode);
}


renderPhotos();

popupFormNode.addEventListener('submit', submitForm);

addCardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewPhoto()
        closePopup(addPopupNode);
        addCardForm.reset()
        validationAddForm._setButtonState(false)
})

validationEditForm.enableValidation()
validationAddForm.enableValidation()