
import { useLocation, Link } from "react-router-dom";

function Header({ email, onSignOut }) {

    const location = useLocation();

    return (
        <header className="header page__section">
            <div className="header__logo"></div>
            <div className="header__wrapper">
                {location.pathname === "/" && <p className="header__text">{email}</p>}
                <ul className="header__nav">
                    {location.pathname === "/sign-in" && <li><Link to="/sign-up" className="header__link">Регистрация</Link></li>}
                    {location.pathname === "/sign-up" && <li><Link to="/sign-in" className="header__link">Войти</Link></li>}
                    {location.pathname === "/" && <li><Link to="/sign-in" className="header__link header__link_out" onClick={onSignOut}>Выйти</Link></li>}
                </ul>
            </div>
        </header>
    );
}

export default Header;