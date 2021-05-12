export class FormValidator {
        constructor(config, form) {
                this._config = config;
                this._form = form;
                this._saveButton = this._form.querySelector(this._config.saveButtonSelector);
        }

        // метод показа ошибки

        _showError(input) {
                const error = this._form.querySelector(`#${input.id}-error`);
                error.textContent = input.validationMessage;
                input.classList.add(this._config.invalidInputClass);
        }

        // метод, который убирает текст ошибки, если все ок

        _hideError(input) {
                const error = this._form.querySelector(`#${input.id}-error`);
                error.textContent = "";
                input.classList.remove(this._config.invalidInputClass);
        }

        // метод проверки валидности

        _checkInputValidity(input) {

                if (input.validity.valid) {
                        this._hideError(input);
                } else {
                        this._showError(input);
                }
        }

        // метод блокировки кнопки сохранить

        _setButtonState(isActive) {
                if (isActive) {
                        this._saveButton.classList.remove(this._config.invalideButtonClass);
                        this._saveButton.disabled = false;
                } else {
                        this._saveButton.classList.add(this._config.invalideButtonClass);
                        this._saveButton.disabled = true;
                }
        }



        _setEventListener() {
                const inputList = this._form.querySelectorAll(this._config.inputSelector);

                inputList.forEach(input => {
                        input.addEventListener('input', (event) => {
                                this._checkInputValidity(input);
                                this._setButtonState(this._form.checkValidity());
                        })
                });

        }


        enableValidation() {
                this._setEventListener();

                this._form.addEventListener('submit', (event) => {
                        event.preventDefault();
                });

                this._setButtonState(this._form.checkValidity());
        } 
        
}

