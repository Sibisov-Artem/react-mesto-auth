function Footer() {
    return (
        <footer className="footer section page__section">
            <p className="footer__copyright">&copy; {new Date().getFullYear()} {/*- таким образом можно динамически /автоматически обновлять год */} Mesto Russia</p>
        </footer>
    );
}

export default Footer;



