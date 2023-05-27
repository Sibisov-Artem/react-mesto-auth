
import { useLocation, Link } from "react-router-dom";

function Header() {

    const location = useLocation();

    return (
        <header className="header page__section">
            <div className="header__logo"></div>
            <ul className="header__nav">
                {location.pathname === "/sign-in" && <li><Link to="/sign-up" className="header__link">Регистрация</Link></li>}
                {location.pathname === "/sign-up" && <li><Link to="/sign-in" className="header__link">Войти</Link></li>}
            </ul>
        </header>
    );
}

export default Header;