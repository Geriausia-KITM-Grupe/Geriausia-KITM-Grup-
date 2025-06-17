import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const navigate = useNavigate();
  const heartRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch event details
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Event not found."))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch like count and status
  useEffect(() => {
    if (!id) return;
    const fetchLikes = async () => {
      try {
        const headers = user.token
          ? { authorization: `Bearer ${user.token}` }
          : {};
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/event-likes/${id}/likes`,
          { headers }
        );
        setLikeCount(data.likeCount);
        setLiked(data.liked);
      } catch {
        setLikeCount(0);
        setLiked(false);
      }
    };
    fetchLikes();
  }, [id, user.token]);

  // Animate heart color
  useEffect(() => {
    if (heartRef.current) {
      heartRef.current.style.color = liked ? "#e74c3c" : "#fff";
    }
  }, [liked]);

  const handleLike = async () => {
    if (!user.token) {
      alert("You must be logged in to like events.");
      return;
    }
    setLikeLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}api/event-likes/${id}/like`,
        {},
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
      if (heartRef.current) {
        heartRef.current.classList.remove("pop");
        void heartRef.current.offsetWidth;
        heartRef.current.classList.add("pop");
      }
    } catch {
      alert("Failed to update like status.");
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-details">
        <div className="shimmer-loader" style={{ width: 340, height: 599 }} />
        <div style={{ flex: 1, marginLeft: 48 }}>
          <div
            className="shimmer-loader"
            style={{ width: 320, height: 40, marginBottom: 18 }}
          />
          <div
            className="shimmer-loader"
            style={{ width: 220, height: 20, marginBottom: 12 }}
          />
          <div
            className="shimmer-loader"
            style={{ width: 180, height: 20, marginBottom: 32 }}
          />
          <div
            className="shimmer-loader"
            style={{ width: 320, height: 120, marginBottom: 18 }}
          />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-details">
        <p style={{ color: "#e53935", fontWeight: 600 }}>
          {error || "Event not found."}
        </p>
        <button className="event-details__cta-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="event-details">
      <div className="event-details__image-container">
        <img
          src={`http://localhost:3000${event.picture}`}
          alt={event.title}
          className="event-details__image"
        />
      </div>
      <div className="event-details__content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h1 className="event-details__title">{event.title}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              className="event-details__like-num"
              style={{
                marginRight: "0.5rem",
                fontSize: "1.2rem",
                color: "#fff",
              }}
            >
              {likeCount}
            </span>
            <button
              className="event-details__heart-btn"
              aria-label="Add to favorites"
              style={{
                background: "none",
                border: "none",
                cursor: user.token ? "pointer" : "not-allowed",
                fontSize: "1.8rem",
                color: "#fff",
                marginLeft: 0,
                outline: "none",
              }}
              onClick={handleLike}
              disabled={likeLoading || !user.token}
              title={
                user.token
                  ? liked
                    ? "Remove like"
                    : "Like this event"
                  : "Login to like"
              }
            >
              <i className="fas fa-heart" ref={heartRef}></i>
            </button>
          </div>
        </div>
        <div className="event-details__meta">
          <span>
            <i className="fas fa-calendar-alt event-details__icon"></i>
            {event.time ? new Date(event.time).toLocaleString() : "Date TBD"}
          </span>
          <span className="event-details__separator">|</span>
          <span>
            <i className="fas fa-map-marker-alt event-details__icon"></i>
            {event.location}
          </span>
          <span className="event-details__separator">|</span>
          <span>
            <i className="fas fa-tag event-details__icon"></i>
            {event.category && event.category.length
              ? event.category.map((cat) => cat.name).join(", ")
              : "No category"}
          </span>
        </div>
        <div className="event-details__description">{event.description}</div>
        <ul className="event-details__highlights">
          <li className="event-details__highlight">
            <i className="fas fa-user event-details__icon"></i>
            Created by:{" "}
            {event.createdBy?.userName || event.createdBy?.email || "Unknown"}
          </li>
          <li className="event-details__highlight">
            <i className="fas fa-info-circle event-details__icon"></i>
            Status: {event.approved ? "Approved" : "Pending Approval"}
          </li>
        </ul>
        <button className="event-details__cta-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </section>
  );
};

export default EventDetails;
