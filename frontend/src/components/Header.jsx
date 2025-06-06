import HeaderSearch from "./HeaderSearch";
import UserTab from "./UserTab";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <a href="/" alt="Home Page">
            Eventify
          </a>
        </div>

        <Nav />
        <HeaderSearch />
        <UserTab />
      </header>
    </>
  );
};

export default Header;
