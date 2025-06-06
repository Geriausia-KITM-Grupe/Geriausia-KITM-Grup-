const HeaderSearch = () => {
  return (
    <>
      <form
        className="header__search-form"
        role="search"
        aria-label="Site search"
      >
        <input
          className="header__search-bar"
          type="text"
          placeholder="Search events..."
        />
        <button className="header__search-button" type="submit">
          <i className="fas fa-search" aria-hidden="true"></i>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </>
  );
};

export default HeaderSearch;
