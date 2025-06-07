import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserTab = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && btnRef.current.contains(e.target)) {
        setOpen((prev) => !prev);
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
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
        ref={btnRef}
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
        ref={dropdownRef}
        style={{ display: open ? "block" : "none" }}
      >
        <Link to="/login" className="user-dropdown__link" role="menuitem">
          Login
        </Link>
        <Link to="/register" className="user-dropdown__link" role="menuitem">
          Register
        </Link>
      </div>
    </div>
  );
};

export default UserTab;
