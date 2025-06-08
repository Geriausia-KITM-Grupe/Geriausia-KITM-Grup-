import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
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
        `${
        "http://localhost:3000"
        }/users/login`,
        {
          email: form.email,
          password: form.password,
        },
      );

      if (response.status === 200 && response.data && response.data.token) {
        setAlert("Login successful!");
        // Redirect user
        navigate("/events"); 
      } else {
        setAlert(response.data?.message || "Login failed.");
      }
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setAlert(
            error.response?.data?.message || `An error occurred: ${error.message}`
  );
}
  };

  return (
    <section className="login">
      <h2 className="login__title">Login to Your Account</h2>

      {alert && (
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
