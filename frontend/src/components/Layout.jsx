const Layout = ({ children }) => (
  <>
    <header className="header">
      <div className="header__logo">Eventify</div>
      <nav className="header__nav" aria-label="Main navigation">
        <a href="/" className="header__nav-link">
          Home
        </a>
        <a href="events" className="header__nav-link">
          Events
        </a>
        <a href="#" className="header__nav-link">
          Contact
        </a>
      </nav>

      <form
        className="header__search-form"
        role="search"
        aria-label="Site search"
      >
        <input
          className="header__search-bar"
          type="text"
          placeholder="Search events..."
        />
        <button className="header__search-button" type="submit">
          <i className="fas fa-search" aria-hidden="true"></i>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div
        className="header__user-menu"
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          className="header__user-btn"
          aria-label="User account"
          style={{ background: "none", border: "none", padding: "0" }}
          id="userMenuBtn"
          type="button"
        >
          <span aria-hidden="true">
            <i className="fas fa-user"></i>
          </span>
          <span className="sr-only">User account</span>
        </button>
        <div
          id="userDropdown"
          className="user-dropdown"
          role="menu"
          aria-labelledby="userMenuBtn"
        >
          <a href="login.html" className="user-dropdown__link" role="menuitem">
            Login
          </a>
          <a
            href="register.html"
            className="user-dropdown__link"
            role="menuitem"
          >
            Register
          </a>
        </div>
      </div>
    </header>

    <main className="main-section">{children}</main>

    <footer className="footer">
      <div className="footer__container">
        <span className="footer__copyright">
          &copy; 2025 <span className="footer__brand">Eventify</span>. All
          rights reserved.
        </span>
        <nav aria-label="Footer navigation" className="footer__nav">
          <a href="#" className="footer__link">
            <i className="fas fa-user-shield footer__icon"></i>Privacy Policy
          </a>
          <a href="#" className="footer__link">
            <i className="fas fa-file-contract footer__icon"></i>Terms of
            Service
          </a>
        </nav>
        <span className="footer__dev">
          <i className="fas fa-code footer__icon"></i>Developed by
          <b>KITM @ JS25</b>
        </span>
      </div>
    </footer>
  </>
);

export default Layout;
