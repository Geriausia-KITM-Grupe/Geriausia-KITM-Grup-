const Pagination = ({ page, pageCount, onPrev, onNext }) => (
  <div className="event-list__pagination">
    <button
      className="pagination__btn"
      aria-label="Previous page"
      onClick={onPrev}
      disabled={page === 1}
    >
      <i className="fas fa-chevron-left"></i>
    </button>
    <span className="pagination__page pagination__page--active">{page}</span>
    <button
      className="pagination__btn"
      aria-label="Next page"
      onClick={onNext}
      disabled={page === pageCount || pageCount === 0}
    >
      <i className="fas fa-chevron-right"></i>
    </button>
  </div>
);

export default Pagination;
