let profileEditButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubtitleNode = document.querySelector('.profile__subtitle');
let popupNameNode = document.querySelector('.popup__name');
let popupDescribtionNode = document.querySelector('.popup__describtion');
let popupFormNode = document.querySelector('.popup__form');

profileEditButtonNode.addEventListener('click', handleProfileEditButtonClick);
popupCloseButtonNode.addEventListener('click', handlePopupCloseButtonClick);

function handleProfileEditButtonClick() {
    popupNode.classList.add('popup__opened');
}

function handlePopupCloseButtonClick() {
    popupNode.classList.remove('popup__opened');
}

popupFormNode.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    profileTitleNode.textContent = popupNameNode.value;
    profileSubtitleNode.textContent = popupDescribtionNode.value;
}
