const SilderControler = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        className="slideshow__control slideshow__control--prev"
        aria-label="Previous slide"
        onClick={onPrev}
      >
        &#10094;
      </button>
      <button
        className="slideshow__control slideshow__control--next"
        aria-label="Next slide"
        onClick={onNext}
      >
        &#10095;
      </button>
    </>
  );
};

export default SilderControler;
