import PopupWithForm from "./PopupWithForm"
import { useRef, useContext } from "react";
import { AppContext } from "../contexts/AppContext";


function EditAvatarPopup(props) {

    const {isLoading} = useContext(AppContext);
    const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            submitText={isLoading ? 'Сохранение' : 'Сохранить'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}

            children={
                <fieldset className="popup__input-container">
                    <input className="popup__input popup__input_avatar-url" type="url" name="avatar" placeholder="Ссылка на картинку"
                        required id="avatarUrl"
                        ref={avatarRef} />

                    <span className="popup__input-error avatarUrl-error"></span>
                </fieldset>
            }
        />
    )
}
export default EditAvatarPopup