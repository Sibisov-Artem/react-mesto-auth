import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }

    const [link, setLink] = useState('');
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name,
            link,
        });
        //как еще один вариант для очищения инпутов, но при сабмите, только инпуты очистятся даже при неуспешном сабмите через Api
        // setName(""); 
        // setLink("");
    }

    //для очищения инпутов при открытии попапа
    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name='mesto'
            title='Новое место'
            submitText='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >

            <fieldset className="popup__input-container">
                <input className="popup__input popup__input_el_mesto-title" type="text" name="name" placeholder="Название"
                    required minLength="2" maxLength="30" id="mestoTitle"
                    onChange={handleChangeName}
                    value={name} />

                <span className="popup__input-error mestoTitle-error"></span>

                <input className="popup__input popup__input_el_mesto-url" type="url" name="link" placeholder="Ссылка на картинку"
                    required id="mestoUrlImage"
                    onChange={handleChangeLink}
                    value={link} />

                <span className="popup__input-error mestoUrlImage-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup