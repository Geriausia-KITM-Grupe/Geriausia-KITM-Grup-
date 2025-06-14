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

        <a href="#" className="header__nav-link">
          Contact
        </a>
      </nav>
    </>
  );
};

export default Nav;
