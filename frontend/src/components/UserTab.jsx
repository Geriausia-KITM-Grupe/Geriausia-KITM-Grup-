import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserTab = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setOpen(false);
      } else {
        setUser(null);
      }
    };

    handleStorageChange(); // Initial check

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

  const handleLogout = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      localStorage.removeItem("user");
      setUser(null);
      setOpen(false);
      setLoading(false); // Hide loader after logout
    }, 1200); // Simulate async logout, adjust as needed
  };

  return (
    <div
      className="header__user-menu"
      style={{ position: "relative", display: "inline-block" }}
    >
      {loading && (
        <div className="popup-loader">
          <div className="popup-loader__spinner"></div>
          <span className="popup-loader__text">Logging out...</span>
        </div>
      )}
      <button
        className="header__user-btn"
        aria-label="User account"
        style={{ background: "none", border: "none", padding: "0" }}
        id="userMenuBtn"
        type="button"
        ref={btnRef}
      >
        {user ? (
          <span className="user-dropdown__name">
            {user.userName ? user.userName.slice(0, 2).toUpperCase() : ""}
          </span>
        ) : (
          <>
            <span aria-hidden="true">
              <i className="fas fa-user"></i>
            </span>
            <span className="sr-only">User account</span>
          </>
        )}
      </button>
      <div
        id="userDropdown"
        className="user-dropdown"
        role="menu"
        aria-labelledby="userMenuBtn"
        ref={dropdownRef}
        style={{
          display: open ? "block" : "none",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {user ? (
          <>
            <span
              className="user-dropdown__name"
              style={{ color: "black", padding: "8px 16px", display: "block" }}
            >
              <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
              {user.userName}
            </span>

            <Link
              to="/user/add-event"
              className="user-dropdown__link"
              style={{ cursor: "pointer" }}
              role="menuitem"
            >
              <i
                className="fas fa-calendar-plus"
                style={{ marginRight: "8px" }}
              ></i>
              Add Event
            </Link>
            <Link
              to="/user/my-events"
              className="user-dropdown__link"
              style={{ cursor: "pointer" }}
              role="menuitem"
            >
              <i className="fas fa-calendar" style={{ marginRight: "8px" }}></i>
              My Events
            </Link>
            <Link
              to="/user/my-favorites"
              className="user-dropdown__link"
              style={{ cursor: "pointer" }}
              role="menuitem"
            >
              <i className="fas fa-heart" style={{ marginRight: "8px" }}></i>
              My Favorites
            </Link>

            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="user-dropdown__link"
                style={{ cursor: "pointer" }}
                role="menuitem"
              >
                <i
                  className="fas fa-tachometer-alt"
                  style={{ marginRight: "8px" }}
                ></i>
                Admin Dashboard
              </Link>
            )}
            <a
              className="user-dropdown__link"
              style={{ cursor: "pointer" }}
              role="menuitem"
              onClick={handleLogout}
            >
              <i
                className="fas fa-sign-out-alt"
                style={{ marginRight: "8px" }}
              ></i>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="user-dropdown__link" role="menuitem">
              <i
                className="fas fa-sign-in-alt"
                style={{ marginRight: "8px" }}
              ></i>
              Login
            </Link>
            <Link
              to="/register"
              className="user-dropdown__link"
              role="menuitem"
            >
              <i className="fas fa-id-badge" style={{ marginRight: "8px" }}></i>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserTab;
