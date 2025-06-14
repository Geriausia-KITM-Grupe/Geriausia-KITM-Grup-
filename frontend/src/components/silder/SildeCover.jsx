const SildeCover = ({ image, alt }) => {
  return (
    <>
      <aside className="slideshow__aside">
        <figure
          style={{ marginLeft: "50px" }}
          className="slideshow__figure"
          aria-hidden="true"
        >
          <img
            src={`http://localhost:3000${image}`}
            alt={alt}
            className="slideshow__img slideshow__img--desktop"
            style={{ width: "380px", height: "600px" }}
          />
        </figure>
      </aside>
    </>
  );
};

export default SildeCover;
