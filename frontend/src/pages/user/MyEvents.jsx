import { useEffect, useState } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import ShimmerLoader from "../../components/ShimmerLoader";
import ConfirmModal from "../../components/ConfirmModal";
import Alert from "../../components/Alert";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  const [alert, setAlert] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    time: "",
  });
  const fetchMyEvents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}api/events/users`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setEvents(response.data);
    } catch (err) {
      setAlert("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleShowConfirm = (eventId) => {
    setEventToRemove(eventId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (eventToRemove) {
      await handleRemoveLike(eventToRemove);
      setEventToRemove(null);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setEventToRemove(null);
    setShowConfirm(false);
  };

  const handleEditClick = (event) => {
    setEditingId(event._id);
    setEditForm({
      title: event.title,
      description: event.description,
      time: event.time ? new Date(event.time).toISOString().slice(0, 16) : "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedEvent = {
        ...editForm,
        time: editForm.time ? new Date(editForm.time).toISOString() : null,
      };
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}api/events/${eventId}`,
        updatedEvent,
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setEvents((prev) =>
        prev.map((e) => (e._id === eventId ? response.data : e))
      );
      setAlert("Event updated successfully!");
      setEditingId(null);
      fetchMyEvents();
    } catch (err) {
      setAlert("Failed to update event.");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (eventId) => {
    setDeletingId(eventId);
    handleShowConfirm(eventId);
  };

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
      setAlert("Event deleted successfully!");
    } catch (err) {
      setAlert("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <UserRoute>
      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div>
        <h2 className="admin-dashboard__title">My Events</h2>
        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <Alert message={alert} onClose={() => setAlert("")} />
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
                      colSpan={6}
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
                            name="title"
                            className="add-event-form__input"
                            value={editForm.title}
                            onChange={handleEditChange}
                            maxLength={50}
                          />
                        ) : (
                          <Link to={`/events/${event._id}`}>
                            {event.title && event.title.length > 50
                              ? event.title.slice(0, 50) + "..."
                              : event.title || ""}
                          </Link>
                        )}
                      </td>
                      <td>
                        {editingId === event._id ? (
                          <input
                            type="datetime-local"
                            name="time"
                            className="add-event-form__input"
                            value={editForm.time}
                            onChange={handleEditChange}
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
                          wordBreak: "break-word",
                          color: "#888",
                          width: "370px",
                        }}
                      >
                        {editingId === event._id ? (
                          <textarea
                            className="add-event-form__input"
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            maxLength={200}
                          />
                        ) : event.description &&
                          event.description.length > 200 ? (
                          event.description.slice(0, 200) + "..."
                        ) : (
                          event.description
                        )}
                      </td>
                      <td>
                        {event.approved === true ? (
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
                              color: "#00529B",
                              backgroundColor: "#3e6475",
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
                              title="Save"
                              onClick={() => handleEditSave(event._id)}
                            >
                              <i className="fas fa-save"></i>
                            </button>
                            <button
                              className="admin-users__delete-btn"
                              title="Cancel"
                              onClick={handleEditCancel}
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
                              <i className="fas fa-trash"></i>
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
    </UserRoute>
  );
};

export default MyEvents;
