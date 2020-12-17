let profileEditButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubtitleNode = document.querySelector('.profile__subtitle');
let popupNameNode = document.querySelector('.popup__input_type_name');
let popupDescribtionNode = document.querySelector('.popup__input_type_describtion');
let popupFormNode = document.querySelector('.popup__form');

function openPopup() {
    popupNode.classList.add('popup_opened');
    popupNameNode.value = profileTitleNode.textContent;
    popupDescribtionNode.value = profileSubtitleNode.textContent
}

function closePopup() {
    popupNode.classList.remove('popup_opened');
}

function submitForm(event) {
    event.preventDefault();
    profileTitleNode.textContent = popupNameNode.value;
    profileSubtitleNode.textContent = popupDescribtionNode.value;
    closePopup();
}

profileEditButtonNode.addEventListener('click', openPopup);
popupCloseButtonNode.addEventListener('click', closePopup);
popupFormNode.addEventListener('submit', submitForm);


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

function renderPhotos() {

    let NewHTML = " ";

    newHTML = initialPhotos.map(function (item) {
        return `<div class="photos__item">
                <img class="photos__image" src="${item.link}" alt=" ">
                    <div class="photos__bottom">
                        <h2 class="photos__caption">${item.name}</h2>
                        <button class="photos__like-button" type="button" aria-label="like"></button>
                     </div>
                </div>`
    }).join(' ');

    photosContainerElement.insertAdjacentHTML('afterbegin', newHTML);
}

renderPhotos();


