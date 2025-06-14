const SlidePlaceHolder = () => {
  return (
    <>
      <article className="event">
        <header className="event__header">
          <h1 className="event__title">No Events Available</h1>
        </header>
        <section className="event__desc">
          <p>
            There are currently no events existing or available at this time.
            Please check back later for updates.
          </p>
        </section>
      </article>
    </>
  );
};

export default SlidePlaceHolder;
