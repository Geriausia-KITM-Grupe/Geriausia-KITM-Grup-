const Nav = () => {
  return (
    <>
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
    </>
  );
};

export default Nav;
