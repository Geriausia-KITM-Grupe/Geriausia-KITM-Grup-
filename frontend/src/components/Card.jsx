import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Card = ({ title, picture, time, location, description, _id }) => {
  const heartRef = useRef(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.token) return;
    const fetchFavoriteStatus = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/event-likes/${_id}/liked`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setIsFavorited(data); // data is a boolean
      } catch {
        setIsFavorited(false);
      }
    };
    fetchFavoriteStatus();
  }, [_id, user.token]);

  useEffect(() => {
    if (heartRef.current) {
      heartRef.current.style.color = isFavorited ? "#e74c3c" : "#fff";
    }
  }, [isFavorited]);

  const handleFavClick = async () => {
    if (!user.token) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}api/event-likes/${_id}/like`,
        {},
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setIsFavorited(data.liked); // expects { liked: true/false }
      if (heartRef.current) {
        heartRef.current.classList.remove("pop");
        void heartRef.current.offsetWidth;
        heartRef.current.classList.add("pop");
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Limit description to 120 characters with ellipsis
  const shortDescription =
    description && description.length > 120
      ? description.slice(0, 120) + "..."
      : description || "";

  return (
    <div className="event-list__card">
      <button
        className="event-list__card-fav"
        aria-label="Add to favorites"
        onClick={handleFavClick}
      >
        <i className="fas fa-heart" ref={heartRef}></i>
      </button>

      <img
        src={`${import.meta.env.VITE_BACKEND}${picture.slice(1)}`}
        alt={title || "Event"}
        className="event-list__card-img"
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = `${import.meta.env.VITE_BACKEND}uploads/notfound.png`; // Path to your fallback image
        }}
      />

      <div
        className="event-list__card-details"
        style={{ flex: 1, overflow: "hidden" }}
      >
        <h3 className="event-list__card-title">{title || "Event Title"}</h3>
        <p className="event-list__card-date">
          <i className="event-list__card-icon fas fa-calendar-alt"></i>
          {time ? new Date(time).toLocaleDateString() : "Date TBD"}
        </p>
        <p className="event-list__card-location">
          <i className="event-list__card-icon fas fa-map-marker-alt"></i>
          {location || "Location TBD"}
        </p>
        <p
          className="event-list__card-description"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {shortDescription}
        </p>
        <a href={`/events/${_id}`} className="event-list__card-link">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Card;
