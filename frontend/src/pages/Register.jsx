import { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setAlert("Please fill all the fields.");
      return;
    }
        // Username validation: only letters, numbers, underscores, hyphens, spaces, 2-200 chars
    const usernameRegex = /^[A-Za-z0-9_\-\s]{2,200}$/;
    if (!usernameRegex.test(form.username)) {
      setAlert(
        "Username can only contain letters, numbers, spaces, underscores, and hyphens, and must be 2-200 characters long."
      );
      return;
    }
    if (form.username.length > 200) {
      setAlert("Username must be at most 200 characters.");
      return;
    }
    if (!form.email.includes("@")) {
      setAlert("Please enter a valid email address.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setAlert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}api/users/register`,
        {
          userName: form.username,
          email: form.email,
          password: form.password,
        }
      );

      // The backend returns 201 and user data with token on success
      if (response.status === 201 && response.data && response.data.token) {
        setAlert("Registration successful!");
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setAlert(response.data?.message || "User registration failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again.";

      setAlert(errorMessage);
    }
  };

  return (
    <section className="register">
      <h2 className="register__title">Create an Account</h2>

      {/* Alert box */}
      {alert && (
        <div
          className={`alert ${
            alert.toLowerCase().includes("successful")
              ? "alert--success"
              : "alert--error"
          }`}
        >
          {alert}
          <button className="alert__close" onClick={() => setAlert("")}>
            &times;
          </button>
        </div>
      )}

      <form
        className="register__form"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className="register__form-group">
          <label htmlFor="register-username" className="register__label">
            Username
          </label>
          <input
            type="text"
            id="register-username"
            name="username"
            className="register__input"
            placeholder="Enter your username"
            required
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="register__form-group">
          <label htmlFor="register-email" className="register__label">
            Email
          </label>
          <input
            type="email"
            id="register-email"
            name="email"
            className="register__input"
            placeholder="Enter your email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="register__form-group">
          <label htmlFor="register-password" className="register__label">
            Password
          </label>
          <input
            type="password"
            id="register-password"
            name="password"
            className="register__input"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="register__form-group">
          <label
            htmlFor="register-confirm-password"
            className="register__label"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="register-confirm-password"
            name="confirmPassword"
            className="register__input"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="register__button">
          Register
        </button>
        <div className="register__links">
          <Link to="/login" className="register__link">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
