import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../../components/ConfirmModal";
import ShimmerLoader from "../../components/ShimmerLoader";

import AdminRoute from "../../components/routes/AdminRoute";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/events`,
          {
            headers: { authorization: `Bearer ${user.token}` },
            params: { createdBy: user._id },
          }
        );
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/event-categories`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setCategories(response.data);
      } catch (err) {
        // fallback: empty
        setCategories([]);
      }
    };

    fetchMyEvents();
    fetchCategories();
  }, []);

  // Handler to open confirm modal
  const handleShowConfirm = (eventId) => {
    setEventToRemove(eventId);
    setShowConfirm(true);
  };

  // Handler for confirming deletion
  const confirmDelete = async () => {
    if (eventToRemove) {
      await handleRemoveLike(eventToRemove);
      setEventToRemove(null);
      setShowConfirm(false);
    }
  };

  // Handler for canceling deletion
  const cancelDelete = () => {
    setEventToRemove(null);
    setShowConfirm(false);
    setDeletingId(null);
  };

  // Handler for edit button
  const handleEditClick = (event) => {
    setEditingId(event._id);
    setEditEvent({
      title: event.title,
      time: event.time ? new Date(event.time).toISOString().slice(0, 16) : "",
      description: event.description,
      approved: event.approved,
      location: event.location || "",
      category: Array.isArray(event.category)
        ? event.category.map((cat) =>
            typeof cat === "object" && cat !== null ? cat._id : String(cat)
          )
        : [],
    });
  };
  // Handler for saving the edited event
  const handleSaveEdit = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // Convert approved to boolean for backend
      let approvedValue;
      if (editEvent.approved === "approved" || editEvent.approved === true) {
        approvedValue = true;
      } else if (
        editEvent.approved === "pending" ||
        editEvent.approved === false
      ) {
        approvedValue = false;
      } else {
        approvedValue = false; // default to false if unknown
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}api/events/${eventId}`,
        {
          title: editEvent.title,
          time: editEvent.time,
          description: editEvent.description,
          approved: approvedValue,
          location: editEvent.location,
          category: editEvent.category.map((id) =>
            typeof id === "object" && id._id ? id._id : id
          ),
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      // Use backend response to update local state
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId
            ? response.data.event // use the updated event from backend
            : e
        )
      );
      setEditingId(null);
      setEditEvent(null);
    } catch (err) {
      alert("Failed to update event.");
    }
  };

  // Handler for canceling edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditEvent(null);
  };

  // Handler for delete button
  const handleDelete = (eventId) => {
    setDeletingId(eventId);
    handleShowConfirm(eventId);
  };

  // Handler for removing an event (delete request)
  const handleRemoveLike = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}api/events/${eventId}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      alert("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminRoute>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="admin-dashboard__btn"
          id="go-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Go back
        </button>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div>
        <h2 className="admin-dashboard__title">Events</h2>
        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table
            className="admin-users__table"
            style={{ minWidth: "360px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading ? (
              <ShimmerLoader mode="list" row={10} columns={5} />
            ) : (
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", color: "#888" }}
                    >
                      No events found.
                    </td>
                  </tr>
                ) : (
                  events.map((event, idx) => (
                    <tr key={event._id || event.id}>
                      <td>
                        <b>{idx + 1}.</b>
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <input
                            type="text"
                            className="add-event-form__input"
                            value={editEvent.title}
                            maxLength={50}
                            onChange={(e) =>
                              setEditEvent((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            style={{ width: "120px" }}
                          />
                        ) : event.title?.length > 50 ? (
                          event.title.slice(0, 50) + "..."
                        ) : (
                          event.title
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <input
                            type="datetime-local"
                            className="add-event-form__input"
                            value={editEvent.time}
                            onChange={(e) =>
                              setEditEvent((prev) => ({
                                ...prev,
                                time: e.target.value,
                              }))
                            }
                            style={{ width: "180px" }}
                          />
                        ) : event.time ? (
                          new Date(event.time).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        style={{
                          color: "#888",
                          width: "180px",
                        }}
                      >
                        {editingId === event._id ? (
                          <textarea
                            value={editEvent.description}
                            className="add-event-form__textarea"
                            maxLength={120}
                            onChange={(e) =>
                              setEditEvent((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            style={{ width: "100%" }}
                          />
                        ) : event.description?.length > 120 ? (
                          event.description.slice(0, 120) + "..."
                        ) : (
                          event.description
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <input
                            style={{ marginLeft: 20 }}
                            type="text"
                            className="add-event-form__input"
                            value={editEvent.location}
                            maxLength={40}
                            onChange={(e) =>
                              setEditEvent((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }))
                            }
                          />
                        ) : event.location?.length > 40 ? (
                          event.location.slice(0, 40) + "..."
                        ) : (
                          event.location
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <select
                            className="add-event-form__select "
                            multiple
                            value={editEvent.category.map(String)}
                            onChange={(e) => {
                              const selected = Array.from(
                                e.target.selectedOptions
                              ).map((opt) => opt.value);
                              setEditEvent((prev) => ({
                                ...prev,
                                category: selected,
                              }));
                            }}
                            style={{ width: "120px", height: "60px" }}
                          >
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        ) : Array.isArray(event.category) ? (
                          event.category
                            .map((cat) => {
                              if (typeof cat === "object" && cat !== null) {
                                return cat.name;
                              }
                              const found = categories.find(
                                (c) => c._id === cat
                              );
                              return found ? found.name : cat;
                            })
                            .join(", ")
                            .slice(0, 40) +
                          (event.category
                            .map((cat) => {
                              if (typeof cat === "object" && cat !== null) {
                                return cat.name;
                              }
                              const found = categories.find(
                                (c) => c._id === cat
                              );
                              return found ? found.name : cat;
                            })
                            .join(", ").length > 40
                            ? "..."
                            : "")
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <select
                            className="event-list__sort-select"
                            value={
                              editEvent.approved === true
                                ? "approved"
                                : "pending"
                            }
                            onChange={(e) =>
                              setEditEvent((prev) => ({
                                ...prev,
                                approved: e.target.value === "approved",
                              }))
                            }
                          >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                          </select>
                        ) : event.approved === true ? (
                          <span
                            style={{
                              color: "#4F8A10",
                              backgroundColor: "#DFF2BF",
                              borderRadius: "5px",
                              padding: "2px 2px 5px 2px",
                            }}
                          >
                            Approved
                          </span>
                        ) : event.approved === false ? (
                          <span
                            style={{
                              color: "#00529B;",
                              backgroundColor: "#BDE5F8",
                              borderRadius: "5px",
                              padding: "2px 2px 5px 2px",
                            }}
                          >
                            Pending
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#fff",
                              backgroundColor: "grey",
                              borderRadius: "5px",
                              padding: "2px 2px 5px 2px",
                            }}
                          >
                            Unknown
                          </span>
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <>
                            <button
                              className="admin-users__edit-btn"
                              onClick={() => handleSaveEdit(event._id)}
                              style={{ marginRight: "4px" }}
                            >
                              <i className="fas fa-save"></i>
                            </button>
                            <button
                              className="admin-users__delete-btn"
                              onClick={handleCancelEdit}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="admin-users__edit-btn"
                              title="Edit"
                              onClick={() => handleEditClick(event)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="admin-users__delete-btn"
                              title="Delete"
                              onClick={() => handleDelete(event._id)}
                              disabled={deletingId === event._id}
                            >
                              {deletingId === event._id ? (
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
      </div>
    </AdminRoute>
  );
};

export default ManageEvents;
