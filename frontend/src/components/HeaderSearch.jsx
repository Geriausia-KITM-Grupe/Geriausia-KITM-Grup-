import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here, e.g., call a search function or update state
    // TODO finish When Events are Ready...
    if (query.trim()) {
      navigate(`/events?search=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <form
      className="header__search-form"
      role="search"
      aria-label="Site search"
      onSubmit={handleSubmit}
    >
      <input
        className="header__search-bar"
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="header__search-button" type="submit">
        <i className="fas fa-search" aria-hidden="true"></i>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default HeaderSearch;
