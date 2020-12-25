const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        saveButtonSelector: '.popup__save-button',
        invalideButtonClass: 'popup__save-button_invalid',
        iinvalidInputClass: 'popup__input_type_invalid',
        errorClass: 'error'
    }; 


function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.invalidInputClass);
}

function hideError(form, input, config) {
    const error = editProfileForm.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.invalidInputClass);
}

function checkInputValidity(form, input, config) {

    if (input.validity.valid) {
            hideError(form, input, config);
    } else {
            showError(form, input, config);
    }
}


function setButtonState(button, isActive, config) {
    if (isActive) {
            button.classList.remove(config.invalideButtonClass);
            button.disabled = false;
    } else {
            button.classList.add(config.invalideButtonClass);
            button.disabled = true;
    }
}


function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const saveButton = form.querySelector(config.saveButtonSelector);

    inputList.forEach(input => {
            input.addEventListener('input', (event) => {
                    checkInputValidity(form, input, config);
                    setButtonState(saveButton, form.checkValidity(), config);
            })
    });

}


function enableValidation(config) {
        const forms = document.querySelectorAll(config.formSelector);
        forms.forEach(form => {
                setEventListener(form, config);

                form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        addNewPhoto();
                        closePopup(addPopupNode);
                });

                const saveButton = form.querySelector(config.saveButtonSelector);
                setButtonState(saveButton, form.checkValidity(), config);
        })
}


enableValidation(validationConfig);
