import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false); // <-- Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.email || !form.password) {
      setAlert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      if (response.status === 200 && response.data && response.data.token) {
        // Save all user data to localStorage in one object
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: response.data._id,
            userName: response.data.userName,
            email: response.data.email,
            role: response.data.role,
            status: response.data.status,
            token: response.data.token,
          })
        );

        setLoading(true); // Show loader
        // Redirect user
        ///setAlert("Login success! Redirecting...");

        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          setLoading(false);
          navigate("/events");
        }, 1500);
      } else {
        setAlert(response.data?.message || "Login failed.");
      }
    } catch (error) {
      // Extract a user-friendly error message from the backend response
      let message = "An error occurred. Please try again.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (typeof error.response?.data === "string") {
        // Try to extract message from HTML error response
        const match = error.response.data.match(/Error:\s*([^<]+)/);
        if (match && match[1]) {
          message = match[1].trim();
        }
      }

      setAlert(message);
    }
  };

  return (
    <section className="login">
      <h2 className="login__title">Login to Your Account</h2>

      {alert && !loading && (
        <div
          className={`alert ${
            alert.includes("success") ? "alert--success" : "alert--error"
          }`}
        >
          {alert}
          <button className="alert__close" onClick={() => setAlert("")}>
            &times;
          </button>
        </div>
      )}

      {loading && (
        <div className="popup-loader">
          <div className="popup-loader__spinner"></div>
          <span className="popup-loader__text">Logging in...</span>
        </div>
      )}
      <form className="login__form" onSubmit={handleSubmit} autoComplete="on">
        <div className="login__form-group">
          <label htmlFor="login-email" className="login__label">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            className="login__input"
            placeholder="Enter your email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="login__form-group">
          <label htmlFor="login-password" className="login__label">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            className="login__input"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
        <div className="login__links">
          <Link to="/register" className="login__link">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
