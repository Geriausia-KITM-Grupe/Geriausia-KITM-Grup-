import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import Alert from "../../components/Alert";

const CATEGORY_URL = `${import.meta.env.VITE_BACKEND}api/event-categories`;

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
    axios
      .get(`${import.meta.env.VITE_BACKEND}api/events/${id}`)
      .then((res) => {
        const ev = res.data;
        setForm({
          title: ev.title || "",
          time: ev.time ? ev.time.slice(0, 16) : "",
          description: ev.description || "",
          location: ev.location || "",
          picture: null,
          category: ev.category ? ev.category.map((c) => c._id || c) : [],
        });
      })
      .catch(() => setAlert("Failed to load event data."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCategoryChange = (catId) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(catId)
        ? prev.category.filter((c) => c !== catId)
        : [...prev.category, catId],
    }));
  };

  const handleCategoryKeyDown = (e, catId) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleCategoryChange(catId);
    }
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
        value.forEach((cat) => formData.append("category", cat));
      } else if (value) {
        formData.append(key, value);
      }
    });

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}api/events/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert("Event updated successfully!");
      setTimeout(() => navigate("/user/panel"), 1200);
    } catch (error) {
      setAlert(
        error.response?.data?.message ||
          "Failed to update event. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="add-event-form">
        <div
          className="shimmer-loader"
          style={{ width: 320, height: 40, marginBottom: 18 }}
        />
      </div>
    );
  }

  return (
    <UserRoute>
      <div className="add-event-form">
        <h2 className="add-event-form__title">Update Event</h2>
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
                const checked = form.category.includes(cat._id);
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
                    onKeyDown={(e) => handleCategoryKeyDown(e, cat._id)}
                  >
                    <input
                      type="checkbox"
                      value={cat._id}
                      checked={checked}
                      onChange={() => handleCategoryChange(cat._id)}
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
            />
          </div>
          <button type="submit" className="add-event-form__btn">
            Update Event
          </button>
        </form>
      </div>
    </UserRoute>
  );
};

export default UpdateEvent;
