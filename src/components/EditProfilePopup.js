import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from "../contexts/AppContext";


// Внутри EditProfilePopup добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми. Не забудьте про обработчики onChange.

function EditProfilePopup(props) {

    // Стейт, в котором содержится значение инпута
    const [name, setName] = useState('');
    // Обработчик изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }

    const [description, setDescription] = useState('null');
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    const { isLoading } = useContext(AppContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            submitText={isLoading ? 'Сохранение' : 'Сохранить'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        >
            {/* можно обойтись без children таким образом:
      <PopupWithForm …  >
        <input …  />
        <input…   />
      <PopupWithForm />
       */}
            <fieldset className="popup__input-container">
                <input className="popup__input popup__input_el_name" type="text" name="name" placeholder="Имя" required
                    minLength="2" maxLength="40" id="profileName"
                    onChange={handleChangeName}
                    value={name} />

                <span className="popup__input-error profileName-error"></span>

                <input className="popup__input popup__input_el_description" type="text" name="info" placeholder="Профессия"
                    required minLength="2" maxLength="200" id="profileDescription"
                    onChange={handleChangeDescription}
                    value={description} />

                <span className="popup__input-error profileDescription-error"></span>

            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;