function ImagePopup(props) {
    return (

        <div className={`popup popup_view ${props.card.name && 'popup_opened'}`}>

            <figure className="popup__container-view">
                <button
                    onClick={props.onClose}
                    className="popup__close-btn hover" type="button"></button>
                <img className="popup__image" alt={props.card.name} src={props.card.link} />
                <figcaption className="popup__image-caption">{props.card.name}</figcaption>
            </figure>

        </div>

    );
}

export default ImagePopup;