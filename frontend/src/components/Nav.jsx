import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/" className="header__nav-link">
          Home
        </Link>
        <Link to="/events" className="header__nav-link">
          Events
        </Link>

        <Link to="/contacts" className="header__nav-link">
          Contact
        </Link>
      </nav>
    </>
  );
};

export default Nav;
