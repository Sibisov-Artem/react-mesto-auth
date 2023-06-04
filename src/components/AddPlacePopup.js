import PopupWithForm from "./PopupWithForm";
import { /*useState,*/ useEffect, useContext } from "react";
import useForm from "./hooks/useForm";
import { AppContext } from "../contexts/AppContext";

function AddPlacePopup(props) {

    /*const [name, setName] = useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }
*/
    const {isLoading} = useContext(AppContext);
    const { values, handleChange, setValues } = useForm({});

    /*
    Можно сделать универсальный кастомный хук для контроля любого количества инпутов в любых формах:
export function useForm(inputValues={}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
 
Этот код помещают в отдельный файл useForm.js в папке hooks и импортируют функцию туда, где нужно контролировать инпуты
И Вам не нужно будет теперь вручную создавать функции обработки инпутов и т д. Все будет в одной строчке кода:
  const {values, handleChange, setValues} = useForm({});
 
    */


    /*
        const [link, setLink] = useState('');
        function handleChangeLink(e) {
            setLink(e.target.value);
        }
    */
    /*
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
        */

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        props.onAddPlace(values);
    }

    //для очищения инпутов при открытии попапа
    useEffect(() => {
        setValues({
            name: '',
            link: ''
        })
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name='mesto'
            title='Новое место'
            submitText={isLoading ? 'Создание' : 'Создать'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        >

            <fieldset className="popup__input-container">
                <input className="popup__input popup__input_el_mesto-title" type="text" name="name" placeholder="Название"
                    required minLength="2" maxLength="30" id="mestoTitle"
                    onChange={handleChange}
                    defaultValue={values.name} />
                {/* Неуправляемые компоненты
                    https://ru.legacy.reactjs.org/docs/uncontrolled-components.html#default-values */}

                <span className="popup__input-error mestoTitle-error"></span>

                <input className="popup__input popup__input_el_mesto-url" type="url" name="link" placeholder="Ссылка на картинку"
                    required id="mestoUrlImage"
                    onChange={handleChange}
                    value={values.link || ''} />
                {/* Неуправляемые компоненты
                    https://ru.legacy.reactjs.org/docs/uncontrolled-components.html#default-values */}

                <span className="popup__input-error mestoUrlImage-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup