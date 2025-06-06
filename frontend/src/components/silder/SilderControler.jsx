const SilderControler = () => {
  return (
    <>
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
    </>
  );
};

export default SilderControler;
