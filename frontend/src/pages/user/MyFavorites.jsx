import { useEffect, useState } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import ShimmerLoader from "../../components/ShimmerLoader";

import ConfirmModal from "../../components/ConfirmModal";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user")); // user data

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  useEffect(() => {
    if (!user?._id) return;
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/event-likes/${
            user._id
          }/favorites`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setFavorites(res.data);
      } catch (err) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemoveLike = async (eventId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}api/event-likes/${eventId}/removeLike`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setFavorites((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      // Optionally handle error
    }
  };

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

  return (
    <UserRoute>
      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="user-favorites">
        <h2 className="admin-dashboard__title">My Liked Events</h2>
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
                <th>Location</th>
                <th>Remove</th>
              </tr>
            </thead>

            {loading ? (
              <ShimmerLoader mode="list" row={10} columns={5} />
            ) : (
              <tbody>
                {favorites.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", color: "#888" }}
                    >
                      You have no liked events.
                    </td>
                  </tr>
                ) : (
                  favorites.map((event, idx) => (
                    <tr key={event._id}>
                      <td>
                        <b>{idx + 1}.</b>
                      </td>
                      <td>
                        <Link to={`/events/${event._id}`}>{event.title}</Link>
                      </td>
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
                      <td>{event.location}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => handleShowConfirm(event._id)}
                          className="admin-users__delete-btn"
                          title="Remove from favorites"
                        >
                          <i className="fas fa-trash"></i>
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

export default MyFavorites;
