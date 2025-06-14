const SlideCoverPlaceHolder = () => {
  return (
    <>
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
    </>
  );
};

export default SlideCoverPlaceHolder;
