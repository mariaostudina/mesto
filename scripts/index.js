const photosContainerElement = document.querySelector('.photos');
const profileEditButtonNode = document.querySelector('.profile__edit-button');
const profileAddButtonNode = document.querySelector('.profile__add-button');
const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');
const editPopupNode = document.querySelector('.popup_type_edit');
const addPopupNode = document.querySelector('.popup_type_add');
const popupFullsizeNode = document.querySelector('.popup_type_fullsize');
const editFormCloseButtonNode = document.querySelector('.popup__close-button_form_edit');
const addFormCloseButtonNode = document.querySelector('.popup__close-button_form_add');
const fullsizeFormCloseButtonNode = document.querySelector('.popup__close-button_form_fullsize');
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
const templateElement = document.querySelector('.template');


function renderPhotos() {
        const photoItems = initialPhotos.map(composePhoto);
        photosContainerElement.append(...photoItems);
}


function composePhoto(item) {
        const newPhoto = templateElement.content.cloneNode(true);
        const photoItem = newPhoto.querySelector('.photos__image');
        const photoCaption = newPhoto.querySelector('.photos__caption');
        photoItem.src = item.link;
        photoItem.alt = item.name;
        photoCaption.textContent = item.name;
        const deleteButton = newPhoto.querySelector('.photos__delete-button');
        deleteButton.addEventListener('click', deletePhoto);

        const likeButton = newPhoto.querySelector('.photos__like-button');
        likeButton.addEventListener('click', likePhoto);

        photoItem.addEventListener('click', () => {
                openFullsizePhoto(item.name, item.link);
        });
        return newPhoto;
}


function deletePhoto(event) {
        const targetPhoto = event.target.closest('.photos__item');
        targetPhoto.remove();
}


function addNewPhoto() {
        const inputLink = popupLinkNode.value;
        const inputCaption = popupCaptionNode.value;
        const newPhoto = composePhoto({ link: inputLink, name: inputCaption });
        photosContainerElement.prepend(newPhoto);
}


function likePhoto(event) {
        event.target.classList.toggle('photos__like-button_active');
}


function openPopup(popup) {
        popup.classList.add('popup_opened');
}

profileEditButtonNode.addEventListener('click', () => {
        openPopup(editPopupNode);
        popupNameNode.value = profileTitleNode.textContent;
        popupDescribtionNode.value = profileSubtitleNode.textContent;
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

document.addEventListener('keydown', (event) => {
        const openPopup = document.querySelector('.popup_opened');
        if (event.key === 'Escape') {
                closePopup(openPopup);
        }
});

document.addEventListener('click' , (event) => {
        const openPopup = document.querySelector('.popup_opened');
        if (event.target.classList.contains('popup')) {
                closePopup(openPopup);
        }
})




function submitForm(event) {
        event.preventDefault();
        profileTitleNode.textContent = popupNameNode.value;
        profileSubtitleNode.textContent = popupDescribtionNode.value;
        closePopup(editPopupNode);
}


const openFullsizePhoto = (name, link) => {
        openPopup(popupFullsizeNode);
        fullsizeTitle.textContent = name;
        fullsizeImage.src = link;
};


renderPhotos();

popupFormNode.addEventListener('submit', submitForm);

popupFormNode.addEventListener('submit', (event) => {
        event.preventDefault();
})