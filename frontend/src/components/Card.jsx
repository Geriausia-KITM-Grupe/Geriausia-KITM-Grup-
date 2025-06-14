import { useRef } from "react";

const Card = ({ title, picture, time, location, description, _id }) => {
  const heartRef = useRef(null);

  const handleFavClick = () => {
    const heart = heartRef.current;
    if (heart) {
      heart.style.color =
        heart.style.color === "rgb(231, 76, 60)" ? "#fff" : "#e74c3c";
      heart.classList.remove("pop");
      void heart.offsetWidth;
      heart.classList.add("pop");
    }
  };

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
        src={`http://localhost:3000${picture}`}
        alt={title || "Event"}
        className="event-list__card-img"
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
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
          {description || ""}
        </p>
        <a href={`/events/${_id}`} className="event-list__card-link">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Card;
