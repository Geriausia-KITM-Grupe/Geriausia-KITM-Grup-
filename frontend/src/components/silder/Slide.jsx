const Slide = ({ event, cats }) => {
  if (!event) {
    return <div className="event__error">No event data available.</div>;
  }
  // Extract all phrases in double quotes from cats (string or array)
  let masive = [];
  if (typeof cats === "string") {
    // Match all "..." phrases
    masive = [...cats.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  } else if (Array.isArray(cats)) {
    // If already array, filter for quoted phrases and remove quotes
    masive = cats
      .map((str) => {
        const match = /^"(.*)"$/.exec(str);
        return match ? match[1] : null;
      })
      .filter(Boolean);
  }

  // Example: cats = '"Hello men" "teas test"' => masive = ['Hello men', 'teas test']
  return (
    <article className="event">
      <header className="event__header">
        <h1 className="event__title">
          {event.title || "Caloundra Music Festival 2025"}
        </h1>
        <ul className="event__meta" aria-label="Event categories">
          {masive.map((cat, idx) => (
            <li key={idx} className="event__meta-item">
              {cat}
            </li>
          ))}
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
        <button className="event__cta-btn">Lookup</button>
      </section>
      <section className="event__share" aria-label="Share event">
        <span className="event__share-label">Share:</span>
        <div className="event__share-icons">
          <a
            href="#"
            className="event__share-icon"
            aria-label="Share on Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="event__share-icon"
            aria-label="Share on Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="event__share-icon"
            aria-label="Share on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="#"
            className="event__share-icon"
            aria-label="Share on Telegram"
          >
            <i className="fab fa-telegram"></i>
          </a>
        </div>
      </section>
    </article>
  );
};

export default Slide;
