import registration_success from '../images/registration-success.jpg';
import registration_fail from '../images/registration-fail.jpg';

function InfoTooltip({ isOpen, onClose, successAuthResponse }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>

            <div className="popup__container">
                <button
                    onClick={onClose}
                    className="popup__close-btn hover" type="button" />
                <div className="auth-response">
                    <img className="auth-response__img"
                        src={successAuthResponse ? registration_success : registration_fail}
                        alt={successAuthResponse ? 'Всё прошло успешно' : 'Операция прошла неудачно'}
                    />
                    <p className="auth-response__text">{successAuthResponse ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </div>


            </div>

        </div>

    );
}

export default InfoTooltip;