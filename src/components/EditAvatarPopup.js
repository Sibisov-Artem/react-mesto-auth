import PopupWithForm from "./PopupWithForm"
import { useRef } from "react";


function EditAvatarPopup(props) {

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
            submitText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
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