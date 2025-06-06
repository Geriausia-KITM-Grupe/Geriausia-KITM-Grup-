import { useRef } from "react";

const Card = () => {
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
    <>
      <div className="event-list__card">
        <button
          className="event-list__card-fav"
          aria-label="Add to favorites"
          onClick={handleFavClick}
        >
          <i className="fas fa-heart" ref={heartRef}></i>
        </button>
        <img
          src="images/events/1.jpg"
          alt="Music Festival"
          className="event-list__card-img"
        />
        <div className="event-list__card-details">
          <h3 className="event-list__card-title">Summer Music Festival</h3>
          <p className="event-list__card-date">
            <i className="event-list__card-icon fas fa-calendar-alt"></i>
            July 15, 2025
          </p>
          <p className="event-list__card-location">
            <i className="event-list__card-icon fas fa-map-marker-alt"></i>
            Central Park
          </p>
          <a href="details.html" className="event-list__card-link">
            View Details
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
