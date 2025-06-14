import { useState, useEffect } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import Alert from "../../components/Alert";

const API_URL = "http://localhost:3000/api/events";
const CATEGORY_URL = "http://localhost:3000/api/event-categories";

const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    time: "",
    description: "",
    location: "",
    picture: null,
    category: [],
  });
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCategoryChange = (catName) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(catName)
        ? prev.category.filter((c) => c !== catName)
        : [...prev.category, catName],
    }));
  };

  const handleCategoryKeyDown = (e, catName) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleCategoryChange(catName);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      time: "",
      description: "",
      location: "",
      picture: null,
      category: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      setAlert("You must be logged in.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "category") {
        // If backend expects array, use JSON.stringify
        formData.append("category", JSON.stringify(value));
      } else if (value) {
        formData.append(key, value);
      }
    });

    try {
      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      setAlert("Event added successfully!");
      resetForm();
    } catch (error) {
      setAlert(
        error.response?.data?.message ||
          "Failed to add event. Please try again."
      );
    }
  };

  return (
    <UserRoute>
      <div className="add-event-form">
        <h2 className="add-event-form__title">Add Event</h2>
        <Alert message={alert} onClose={() => setAlert("")} />
        <form
          className="add-event-form__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="add-event-form__group">
            <label className="add-event-form__label">Title:</label>
            <input
              type="text"
              className="add-event-form__input"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-event-form__group">
            <label className="add-event-form__label">Time:</label>
            <input
              type="datetime-local"
              className="add-event-form__input"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-event-form__group">
            <label className="add-event-form__label">Location:</label>
            <input
              type="text"
              className="add-event-form__input"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-event-form__group">
            <label className="add-event-form__label">Categories:</label>
            <div
              className="add-event-form__checkbox-group"
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {categories.map((cat) => {
                const checked = form.category.includes(cat.name);
                return (
                  <label
                    key={cat._id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                      border: checked
                        ? "2px solid #4ef37b"
                        : "2px solid #181c23",
                      borderRadius: 4,
                      padding: "4px 10px",
                      background: "#181c23",
                      transition: "border 0.2s, background 0.2s",
                      userSelect: "none",
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => handleCategoryKeyDown(e, cat.name)}
                  >
                    <input
                      type="checkbox"
                      value={cat.name}
                      checked={checked}
                      onChange={() => handleCategoryChange(cat.name)}
                      style={{ marginRight: 6 }}
                      tabIndex={-1}
                    />
                    {cat.name}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="add-event-form__group">
            <label className="add-event-form__label">Description:</label>
            <textarea
              className="add-event-form__textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-event-form__group">
            <label className="add-event-form__label">Picture:</label>
            <input
              type="file"
              className="add-event-form__input"
              name="picture"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add-event-form__btn">
            Add Event
          </button>
        </form>
      </div>
    </UserRoute>
  );
};

export default AddEvent;
