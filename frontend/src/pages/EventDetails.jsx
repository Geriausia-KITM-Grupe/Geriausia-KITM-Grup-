import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Event not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="event-details">
        <div className="shimmer-loader" style={{ width: 340, height: 599 }} />
        <div style={{ flex: 1, marginLeft: 48 }}>
          <div className="shimmer-loader" style={{ width: 320, height: 40, marginBottom: 18 }} />
          <div className="shimmer-loader" style={{ width: 220, height: 20, marginBottom: 12 }} />
          <div className="shimmer-loader" style={{ width: 180, height: 20, marginBottom: 32 }} />
          <div className="shimmer-loader" style={{ width: 320, height: 120, marginBottom: 18 }} />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-details">
        <p style={{ color: "#e53935", fontWeight: 600 }}>{error || "Event not found."}</p>
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
        <h1 className="event-details__title">{event.title}</h1>
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
            Created by: {event.createdBy?.userName || "Unknown"}
          </li>
          <li className="event-details__highlight">
            <i className="fas fa-info-circle event-details__icon"></i>
            Status: {event.status}
          </li>
        </ul>
        <a
          href="#"
          className="event-details__cta-btn"
          style={{ marginRight: 16 }}
        >
          Favorite
        </a>
        <button
          className="event-details__cta-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </section>
  );
};

export default EventDetails;