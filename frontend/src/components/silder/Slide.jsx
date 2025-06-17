import { Link } from "react-router-dom";

//const Slide = ({ event, cats }) => {  neaiski role mete cat errora
const Slide = ({ event }) => {
  if (!event) {
    return <div className="event__error">No event data available.</div>;
  }

  return (
    <article className="event">
      <header className="event__header">
        <h1 className="event__title">
          {event.title || "Caloundra Music Festival 2025"}
        </h1>
        <ul className="event__meta" aria-label="Event categories">
          {event.category && event.category.length > 0 ? (
            event.category.map((cat, idx) => (
              <li key={cat._id || idx} className="event__meta-item">
                {cat.name
                  ? cat.name.charAt(0).toUpperCase() + cat.name.slice(1)
                  : cat}
              </li>
            ))
          ) : (
            <li className="event__meta-item">No category</li>
          )}
        </ul>
      </header>
      <section className="event__desc">
        <p>
          {event.description ||
            "Join us for an unforgettable night of music, lights, and celebration! Experience top artists, food trucks, and a vibrant crowd at the city's biggest music festival. Don't miss out on the event of the year!"}
        </p>
      </section>
      <section className="event__details">
        <div className="event__detail">
          <span className="event__detail-title">Date</span>
          <time
            className="event__detail-value"
            dateTime={event.time || "2025-06-15"}
          >
            {event.time
              ? new Date(event.time).toLocaleString()
              : "June 15, 2025"}
          </time>
        </div>
        <div className="event__detail">
          <span className="event__detail-title">Location</span>
          <span className="event__detail-value">
            {event.location || "Central Park"}
          </span>
        </div>
        <div className="event__detail">
          <span className="event__detail-title">Status</span>
          <span className="event__detail-value">
            {event.status || "Available"}
          </span>
        </div>
      </section>
      <section className="event__cta-likes">
        <Link to={`/events/${event._id}`} className="event__cta-btn">
          Lookup
        </Link>
      </section>
      <section className="event__share" aria-label="Share event">
        <span className="event__share-label">Share:</span>
        <div className="event__share-icons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            className="event__share-icon"
            aria-label="Share on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(event.title || "")}`}
            className="event__share-icon"
            aria-label="Share on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              event.title || ""
            )}%20${encodeURIComponent(window.location.href)}`}
            className="event__share-icon"
            aria-label="Share on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(event.title || "")}`}
            className="event__share-icon"
            aria-label="Share on Telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-telegram"></i>
          </a>
        </div>
      </section>
    </article>
  );
};

export default Slide;
