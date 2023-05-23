import { useState } from "react";

function Login(props) {

    const [email, setEmail] = useState('');
    // Обработчик изменения инпута обновляет стейт
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();

        props.onAuthorization({
            email: email,
            password: password,
        });
    }

    return (
        <div className="auth">
            <div className="auth__container">

                <h2 className="auth__title">Вход</h2>
                <form className="auth__form"
                    onSubmit={handleSubmit}>
                    <fieldset className="auth__input-container">
                        <input className="auth__input auth__input_el_email" type="email" name="email" placeholder="Email" required
                            minLength="2" maxLength="40" id="profileEmail"
                            onChange={handleChangeEmail}
                            value={email}
                        />

                        <span className="auth__input-error profileEmail-error"></span>

                        <input className="auth__input auth__input_el_password" type="password" name="password" placeholder="Пароль"
                            required minLength="2" maxLength="200" id="profilePassword"
                            onChange={handleChangePassword}
                            value={password}
                        />

                        <span className="auth__input-error profilePassword-error"></span>

                    </fieldset>
                    <button className="auth__submit-btn" type="submit">Войти</button>
                </form>
            </div>
        </div>



    );


}

export default Login;