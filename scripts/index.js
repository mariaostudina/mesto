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
const editPopupNode = document.querySelector('.popup_type_edit');
const addPopupNode = document.querySelector('.popup_type_add');
const editFormCloseButtonNode = document.querySelector('.popup__close-button_form_edit');
const addFormCloseButtonNode = document.querySelector('.popup__close-button_form_add');
const fullsizeFormCloseButtonNode = document.querySelector('.popup__close-button_form_fullsize');
const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');
const popupNameNode = document.querySelector('.popup__input_type_name');
const popupDescribtionNode = document.querySelector('.popup__input_type_describtion');
const popupFormNode = document.querySelector('.popup__form');
const templateElement = document.querySelector('.template');
const popupLinkNode = document.querySelector('.popup__input_type_link');
const popupCaptionNode = document.querySelector('.popup__input_type_caption');
const popupFullsizeNode = document.querySelector('.popup_type_fullsize');
const popupFullsizeContainerNode = document.querySelector('.popup__container_form_fullsize');


function renderPhotos() {
        const photoItems = initialPhotos.map(composePhoto);
        photosContainerElement.append(...photoItems);
}


function composePhoto(item) {
        const newPhoto = templateElement.content.cloneNode(true);
        const photoItem = newPhoto.querySelector('.photos__image');
        photoItem.src = item.link;
        const photoCaption = newPhoto.querySelector('.photos__caption');
        photoCaption.textContent = item.name;

        const deleteButton = newPhoto.querySelector('.photos__delete-button');
        deleteButton.addEventListener('click', deletePhoto);

        const likeButton = newPhoto.querySelector('.photos__like-button');
        likeButton.addEventListener('click', likePhoto);

        photoItem.addEventListener('click', () => {
                openFullsizePhoto(photoCaption.textContent, photoItem.src);
        });
        return newPhoto;    
}


function deletePhoto(event) {
        const targetPhoto = event.target.closest('.photos__item');
        targetPhoto.remove();
}


function bindAddItemListener() {
    const addButtonElement = document.querySelector('.popup__form_type_add');
    addButtonElement.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewPhoto();
    });
}


function addNewPhoto() {
    const inputLink = popupLinkNode.value;
    const inputCaption = popupCaptionNode.value;
    const newPhoto = composePhoto({link: inputLink, name: inputCaption});
    photosContainerElement.prepend(newPhoto);
}


function likePhoto(event) {
        const targetButton = event.target.closest('.photos__like-button');
        targetButton.classList.toggle('photos__like-button_active');
}


function openPopup(popup) {
        popup.classList.add('popup_opened');
        popupNameNode.value = profileTitleNode.textContent; 
        popupDescribtionNode.value = profileSubtitleNode.textContent;
}
profileEditButtonNode.addEventListener('click', () => {
        openPopup(editPopupNode);
});
profileAddButtonNode.addEventListener('click', () => {
        openPopup(addPopupNode);
});


function closePopup(popup) {
        popup.classList.remove('popup_opened');
}
editFormCloseButtonNode.addEventListener('click', () => {
        closePopup(editPopupNode);
});
addFormCloseButtonNode.addEventListener('click', () => {
        closePopup(addPopupNode);
});
fullsizeFormCloseButtonNode.addEventListener('click', () => {
        closePopup(popupFullsizeNode);
});


function submitForm(event) {
    event.preventDefault();
    profileTitleNode.textContent = popupNameNode.value;
    profileSubtitleNode.textContent = popupDescribtionNode.value;
    closePopup(editPopupNode);
}


const openFullsizePhoto = (name, link) => {
        popupFullsizeNode.classList.add('popup_opened');
        const fullsizeTitle = popupFullsizeContainerNode.querySelector('.popup__title_form_fullsize');
        const fullsizeImage = popupFullsizeContainerNode.querySelector('.popup__image-fullsize');
        fullsizeTitle.textContent = name;
        fullsizeImage.src = link;
};


renderPhotos();
bindAddItemListener();
popupFormNode.addEventListener('submit', submitForm);