import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'; // побаловаться, удалить и посмтортеть

function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `place__like-btn hover ${isLiked && 'place__like-btn_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    };

    const handleDeleteClick = () => {
        props.onCardDelete(props.card);
    };

    return (

        <li className="place__card">
            <img
                onClick={handleClick}
                className="place__image" src={props.card.link} alt={props.card.name} />

            {/* // Далее в разметке используем переменную для условного рендеринга - если карточка наша показываем кнопку удаления */}
            {isOwn && <button className="place__wastebasket-btn hover" type="button" onClick={handleDeleteClick}></button>}
            <div className="place__info">
                <h2 className="place__title">{props.card.name}</h2>
                <div className="place__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="place__like-count">{props.card.likes.length}</p>
                </div>

            </div>
        </li>

    );
}

export default Card;