import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import Alert from "../../components/Alert";
import ShimmerLoader from "../../components/ShimmerLoader";
import ConfirmModal from "../../components/ConfirmModal";

const API_URL = `${import.meta.env.VITE_BACKEND}api/event-categories`;

const ManageEventCategories = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [alert, setAlert] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null); // NEW
  const [editForm, setEditForm] = useState({ name: "", description: "" }); // NEW
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      setAlert("Category deleted successfully!");
    } catch (error) {
      setAlert(
        error.response?.data?.message ||
          "Failed to delete category. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, {
        headers: { authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.name.trim() || !form.description.trim()) {
        setAlert("Both fields are required.");
        return;
      }
      // Optimistic UI update
      const tempId = Date.now().toString();
      const optimisticCategory = {
        _id: tempId,
        name: form.name,
        description: form.description,
      };
      setCategories((prev) => [optimisticCategory, ...prev]);
      setForm({ name: "", description: "" });
      setAlert("");
      try {
        const { data: newCategory } = await axios.post(
          API_URL,
          {
            name: optimisticCategory.name,
            description: optimisticCategory.description,
          },
          { headers: { authorization: `Bearer ${token}` } }
        );
        setCategories((prev) =>
          prev.map((cat) => (cat._id === tempId ? newCategory : cat))
        );
        setAlert("Category added successfully!");
      } catch (error) {
        setCategories((prev) => prev.filter((cat) => cat._id !== tempId));
        setAlert(
          error.response?.data?.message ||
            "Failed to add category. Please try again."
        );
      }
    },
    [form, token]
  );

  // Edit handlers
  const handleEditClick = (cat) => {
    setEditingId(cat._id);
    setEditForm({ name: cat.name, description: cat.description });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.description.trim()) {
      setAlert("Both fields are required.");
      return;
    }
    try {
      const { data: updated } = await axios.put(
        `${API_URL}/${editingId}`,
        { name: editForm.name, description: editForm.description },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === editingId ? updated : cat))
      );
      setAlert("Category updated successfully!");
      setEditingId(null);
    } catch (error) {
      setAlert(
        error.response?.data?.message ||
          "Failed to update category. Please try again."
      );
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ name: "", description: "" });
  };

  // Handler to open confirm modal
  // (Removed unused handleShowConfirm)

  // Handler for confirming deletion
  const confirmDelete = async () => {
    if (eventToRemove) {
      await handleDelete(eventToRemove);
      setEventToRemove(null);
      setShowConfirm(false);
    }
  };

  // Handler for canceling deletion
  const cancelDelete = () => {
    setEventToRemove(null);
    setShowConfirm(false);
  };
  return (
    <AdminRoute>
      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <section className="admin-events">
        <h1 className="admin-dashboard__title">Manage Events Categories</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="admin-dashboard__btn"
            id="add-event-btn"
            onClick={() => setShowForm((v) => !v)}
          >
            <i className="fas fa-plus"></i> Add Event Category
          </button>
          <button
            className="admin-dashboard__btn"
            id="go-back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i> Go back
          </button>
        </div>
        <Alert message={alert} onClose={() => setAlert("")} />
        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          {showForm && (
            <form
              className="admin-category-form"
              style={{ margin: "18px 0" }}
              onSubmit={handleSubmit}
            >
              <h4 className="admin-dashboard__title">Add Category</h4>
              <input
                type="text"
                className="admin-category-form__input"
                placeholder="Category name"
                required
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
              <textarea
                className="admin-category-form__textarea"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
              />
              <button type="submit" className="admin-category-form__btn">
                Save
              </button>
            </form>
          )}
          <table
            className="admin-users__table"
            style={{ minWidth: "360px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading ? (
              <ShimmerLoader />
            ) : (
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", color: "#888" }}
                    >
                      List is empty
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, idx) => (
                    <tr key={cat._id}>
                      <td>
                        <b>{idx + 1}.</b>
                      </td>
                      <td>
                        {editingId === cat._id ? (
                          <input
                            type="text"
                            className="admin-category-form__input"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditInputChange}
                          />
                        ) : (
                          cat.name
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-word",
                          color: "#888",
                          width: "370px",
                        }}
                      >
                        {editingId === cat._id ? (
                          <textarea
                            className="admin-category-form__textarea"
                            name="description"
                            value={editForm.description}
                            onChange={handleEditInputChange}
                            rows={3}
                          />
                        ) : (
                          <span>{cat.description}</span>
                        )}
                      </td>
                      <td>
                        {editingId === cat._id ? (
                          <>
                            <button
                              className="admin-category-form__btn"
                              style={{ marginRight: 8 }}
                              onClick={handleEditSave}
                            >
                              Save
                            </button>
                            <button
                              className="admin-category-form__btn"
                              type="button"
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="admin-users__edit-btn"
                              title="Edit"
                              onClick={() => handleEditClick(cat)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="admin-users__delete-btn"
                              title="Delete"
                              type="button"
                              onClick={() => {
                                setEventToRemove(cat._id);
                                setShowConfirm(true);
                              }}
                              disabled={deletingId === cat._id}
                            >
                              {deletingId === cat._id ? (
                                <span className="spopup-loader__spinner"></span>
                              ) : (
                                <i className="fas fa-trash"></i>
                              )}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </section>
    </AdminRoute>
  );
};

export default ManageEventCategories;
