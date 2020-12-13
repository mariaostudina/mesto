let profileEditButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubtitleNode = document.querySelector('.profile__subtitle');
let popupNameNode = document.querySelector('.popup__input_name');
let popupDescribtionNode = document.querySelector('.popup__input_describtion');
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
    popupNode.classList.remove('popup_opened');
}

profileEditButtonNode.addEventListener('click', openPopup);
popupCloseButtonNode.addEventListener('click', closePopup);
popupFormNode.addEventListener('submit', submitForm);