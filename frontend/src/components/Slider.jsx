const Slider = () => {
  return (
    <>
      <div className="slideshow">
        <div className="slideshow__slide slideshow__slide--active">
          <article className="event">
            <header className="event__header">
              <h1 className="event__title">Caloundra Music Festival 2025</h1>
              <ul className="event__meta" aria-label="Event categories">
                <li className="event__meta-item">Live</li>
                <li className="event__meta-item">Music</li>
                <li className="event__meta-item">Festival</li>
                <li className="event__meta-item">All Ages</li>
              </ul>
            </header>
            <section className="event__desc">
              <p>
                Join us for an unforgettable night of music, lights, and
                celebration! Experience top artists, food trucks, and a vibrant
                crowd at the city's biggest music festival. Don't miss out on
                the event of the year!
              </p>
            </section>
            <section className="event__details">
              <div className="event__detail">
                <span className="event__detail-title">Date</span>
                <time className="event__detail-value" datetime="2025-06-15">
                  June 15, 2025
                </time>
              </div>
              <div className="event__detail">
                <span className="event__detail-title">Location</span>
                <span className="event__detail-value">Central Park</span>
              </div>
              <div className="event__detail">
                <span className="event__detail-title">Status</span>
                <span className="event__detail-value">Available</span>
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
          <aside className="slideshow__aside">
            <figure
              style={{ marginLeft: "50px" }}
              className="slideshow__figure"
              aria-hidden="true"
            >
              <img
                src="https://assets-au-scc.kc-usercontent.com/330b87ea-148b-3ecf-9857-698f2086fe8d/e4827427-cbac-4833-a435-75ee58d21c11/23005_CMF2023_Artist-Headliners-July_850x1200.jpg?w=1280&h=1807&fit=contain&q=80&fm=webp"
                alt="Party girl smiling"
                className="slideshow__img slideshow__img--desktop"
              />
            </figure>
          </aside>
        </div>

        <button
          className="slideshow__control slideshow__control--prev"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="slideshow__control slideshow__control--next"
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
    </>
  );
};

export default Slider;
