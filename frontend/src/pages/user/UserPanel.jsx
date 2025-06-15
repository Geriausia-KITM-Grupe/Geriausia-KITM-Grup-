import { useEffect, useState } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { Link } from "react-router-dom";

const UserPanel = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [alert, setAlert] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleDelete = (id, title) => {
    setDeleteId(id);
    setDeleteTitle(title);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:3000/api/events/${deleteId}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setMyEvents((prev) => prev.filter((ev) => ev._id !== deleteId));
      setAlert("Event deleted successfully!");
    } catch {
      setAlert("Failed to delete event.");
    } finally {
      setDeleteId(null);
      setDeleteTitle("");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteTitle("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch events created by user
        const eventsRes = await axios.get(
          `http://localhost:3000/api/events?createdBy=${user._id}`,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setMyEvents(eventsRes.data.events || eventsRes.data);

        // Fetch favorite events
        const favRes = await axios.get(
          "http://localhost:3000/api/event-likes/user",
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setFavorites(favRes.data || []);
      } catch {
        setMyEvents([]);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.token) fetchData();
  }, [user]);

  return (
    <UserRoute>
  <section className="user-panel" style={{
        background: "#232733",
        borderRadius: 18,
        boxShadow: "0 6px 32px rgba(30, 64, 175, 0.1)",
        padding: "40px 36px",
        maxWidth: 1100,
        margin: "10px auto 40px auto"
      }}>
        <h1 style={{ color: "#4ef37b", fontSize: "2.3rem", fontWeight: 700, marginBottom: 24 }}>
          User Control Panel
        </h1>
        <h2 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: 18 }}>
          Welcome, {user.userName}
        </h2>
        {alert && (
          <div className="alert alert--success" style={{ marginBottom: 18 }}>
            {alert}
            <button className="alert__close" onClick={() => setAlert("")}>
              &times;
            </button>
          </div>
        )}
        {loading ? (
          <div className="shimmer-loader" style={{ width: 320, height: 40, marginBottom: 18 }} />
        ) : (
          <>
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ color: "#4ef37b", marginBottom: 10 }}>My Events</h3>
              {myEvents.length === 0 ? (
                <p style={{ color: "#a1a1aa" }}>You haven't created any events yet.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {myEvents.map((ev) => (
                    <li key={ev._id} style={{ marginBottom: 10 }}>
                      <Link to={`/events/${ev._id}`} style={{ color: "#4ef37b", textDecoration: "underline" }}>
                        {ev.title}
                      </Link>{" "}
                      <span style={{ color: "#a1a1aa" }}>
                        ({ev.time ? new Date(ev.time).toLocaleDateString() : "Date TBD"})
                      </span>
                      <Link
                        to={`/user/update-event/${ev._id}`}
                        style={{
                          marginLeft: 12,
                          color: "#38c96b",
                          textDecoration: "underline",
                          fontWeight: 600,
                        }}
                      >
                        Update
                      </Link>
                      <button
                        style={{
                          marginLeft: 12,
                          color: "#e53935",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                        onClick={() => handleDelete(ev._id, ev.title)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 style={{ color: "#4ef37b", marginBottom: 10 }}>My Favorites</h3>
              {favorites.length === 0 ? (
                <p style={{ color: "#a1a1aa" }}>No favorite events yet.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {favorites.map((ev) => (
                    <li key={ev._id} style={{ marginBottom: 10 }}>
                      <Link to={`/events/${ev._id}`} style={{ color: "#4ef37b", textDecoration: "underline" }}>
                        {ev.title}
                      </Link>{" "}
                      <span style={{ color: "#a1a1aa" }}>
                        ({ev.time ? new Date(ev.time).toLocaleDateString() : "Date TBD"})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {deleteId && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    background: "#232733",
                    padding: 32,
                    borderRadius: 12,
                    boxShadow: "0 4px 24px #0008",
                    minWidth: 320,
                  }}
                >
                  <h3 style={{ color: "#e53935", marginBottom: 18 }}>
                    Are you sure you want to delete event:
                  </h3>
                  <p style={{ color: "#fff", marginBottom: 24, fontWeight: 600 }}>
                    {deleteTitle}
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: 16 }}
                    onClick={confirmDelete}
                  >
                    Confirm Delete
                  </button>
                  <button className="btn btn-secondary" onClick={cancelDelete}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </UserRoute>
  );
};

export default UserPanel;