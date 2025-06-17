import { useState, useEffect } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import Alert from "../../components/Alert";

const API_URL = `${import.meta.env.VITE_BACKEND}api/events`;
const CATEGORY_URL = `${import.meta.env.VITE_BACKEND}api/event-categories`;

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
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    setForm((prev) => ({
      ...prev,
      picture: file || null,
    }));
  };
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

  const resetForm = () => {
    setForm({
      title: "",
      time: "",
      description: "",
      location: "",
      picture: null,
      category: [],
    });
    setPreview(null);
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
      await axios.post(API_URL, formData, {
        headers: {
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
        <h2
          className="add-event-form__title"
          style={{
            letterSpacing: 2,
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 24,
            textShadow: "0 2px 8px #0006",
          }}
        >
          Add Event
        </h2>
        <Alert message={alert} onClose={() => setAlert("")} />
        <form
          className="add-event-form__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div
            style={{
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {/* Left Column */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="add-event-form__group">
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Title:
                </label>
                <input
                  type="text"
                  className="add-event-form__input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Event Name"
                  required
                />
              </div>
              <div className="add-event-form__group">
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Time:
                </label>
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
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Location:
                </label>
                <input
                  type="text"
                  className="add-event-form__input"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Kaunas, Laisvės al. 96"
                  required
                />
              </div>
              <div className="add-event-form__group">
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Categories:
                </label>
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
                          borderRadius: 8,
                          padding: "6px 14px",
                          background: checked ? "#23272f" : "#181c23",
                          transition: "border 0.2s, background 0.2s",
                          userSelect: "none",
                          fontWeight: checked ? 700 : 500,
                          boxShadow: checked
                            ? "0 2px 8px #4ef37b33"
                            : "0 1px 4px #0002",
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => handleCategoryKeyDown(e, cat._id)}
                      >
                        <input
                          type="checkbox"
                          value={cat._id}
                          checked={checked}
                          onChange={() => handleCategoryChange(cat._id)}
                          style={{ marginRight: 6, accentColor: "#4ef37b" }}
                          tabIndex={-1}
                        />
                        {cat.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="add-event-form__group">
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Description:
                </label>
                <textarea
                  className="add-event-form__textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter Description..."
                />
              </div>
              <div className="add-event-form__group">
                <label
                  className="add-event-form__label"
                  style={{ fontWeight: 600, letterSpacing: 1 }}
                >
                  Picture:
                </label>
                <input
                  type="file"
                  className="add-event-form__input"
                  name="picture"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  style={{
                    borderRadius: 8,
                    border: "2px solid #23272f",
                    background: "#23272f",
                    color: "#fff",
                    padding: "8px 10px",
                    fontSize: 15,
                    outline: "none",
                    boxShadow: "0 1px 4px #0002",
                  }}
                />
                {preview && (
                  <div style={{ marginTop: 16, textAlign: "center" }}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxWidth: 300,
                        maxHeight: 300,
                        borderRadius: 12,
                        boxShadow: "0 4px 24px #0008, 0 0 0 4px #23272f",
                        border: "2px solid #23272f",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
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
