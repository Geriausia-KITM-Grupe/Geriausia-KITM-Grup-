import { useEffect, useState } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import ShimmerLoader from "../../components/ShimmerLoader";
import ConfirmModal from "../../components/ConfirmModal";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null); // NEW
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:3000/api/events", {
          headers: { authorization: `Bearer ${user.token}` },
          params: { createdBy: user._id },
        });
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
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
  };

  // Handler for edit button (implement your own logic here)
  const handleEditClick = (event) => {
    setEditingId(event._id);
    // Add your edit logic here (e.g., open a modal or navigate to edit page)
    alert(`Edit event: ${event.title}`);
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
      await axios.delete(`http://localhost:3000/api/events/${eventId}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      alert("Failed to delete event.");
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
                      colSpan={4}
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
                      <td>{event.title}</td>
                      <td>
                        {event.time
                          ? new Date(event.time).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-word",
                          color: "#888",
                          width: "370px",
                        }}
                      >
                        {event.description}
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
