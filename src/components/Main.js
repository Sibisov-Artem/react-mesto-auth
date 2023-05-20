import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {


    const currentUser = useContext(CurrentUserContext);

    return (

        <main className="content">
            {/* {console.log('useEffect after return')} */}
            <section className="profile section page__section">
                <div
                    onClick={props.onEditAvatar}
                    className="profile__avatar-wrapper">

                    <img className="profile__avatar" src={currentUser.avatar} alt="аватарка" />
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        onClick={props.onEditProfile}
                        className="profile__edit-btn hover"
                        type="button"
                    >
                    </button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    onClick={props.onAddPlace}
                    className="profile__add-btn hover" type="button"></button>
            </section>

            <section className="place section page__section" aria-label="Места">
                <ul className="place__grid">

                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            // owner={card.owner}
                            key={card._id}
                            // url={card.url}
                            // nameCard={card.nameCard}
                            // likes={card.likes}
                            onCardClick={props.onCardClick}
                            // добавить пропс onCardLike для компонента Card
                            onCardLike={props.onCardLike}
                            // добавить пропс onCardDelete для компонента Card
                            onCardDelete={props.onCardDelete}
                        />))}

                </ul>
            </section>

        </main>
    );
}

export default Main;