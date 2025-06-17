import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import ShimmerLoader from "../components/ShimmerLoader";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default items per page
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date-asc");
  const [cats, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/events/approved/paginated", {
        params: {
          page,
          limit: itemsPerPage,
          category: filter === "all" ? undefined : filter, // <-- fix here
          sort,
        },
      })
      .then((res) => {
        setEvents(res.data.events);
        setPageCount(res.data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, itemsPerPage, filter, sort]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/event-categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, pageCount));
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1); // Reset to first page
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <section className="event-list">
      <h2 className="event-list__title">Upcoming Events</h2>

      <div className="event-list__filter-sort">
        <div className="event-list__sort">
          <label
            htmlFor="itemsPerPageSelect"
            className="event-list__sort-label"
          >
            <i className="fas fa-sort"></i> Per Page:
          </label>
          <select
            id="itemsPerPageSelect"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="event-list__sort-select"
          >
            {[3, 6, 9, 12].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <label
            htmlFor="eventFilter"
            className="event-list__sort-label"
            style={{ marginLeft: 16 }}
          >
            <i className="fas fa-filter"></i> Filter by:
          </label>
          <select
            id="eventFilter"
            className="event-list__filter-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Events</option>
            {cats.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </option>
            ))}
          </select>

          <label
            htmlFor="eventSort"
            className="event-list__sort-label"
            style={{ marginLeft: 16 }}
          >
            <i className="fas fa-sort"></i> Sort by:
          </label>
          <select
            id="eventSort"
            className="event-list__sort-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="date-asc">Date (Ascending)</option>
            <option value="date-desc">Date (Descending)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      <ul className="event-list__items">
        {loading ? (
          <ShimmerLoader mode="card" cards={6} />
        ) : (
          events.map((event, i) => (
            <li className="event-list__item" key={event.id || i}>
              <Card {...event} />
            </li>
          ))
        )}
      </ul>
      <Pagination
        page={page}
        pageCount={pageCount}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default EventList;
