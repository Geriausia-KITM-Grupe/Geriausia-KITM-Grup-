/// How it works ?
/// For list you should use
///  <ShimmerLoader mode="list" rows={3} columns={4} />
/// For cards like Event list you should use
/// <ShimmerLoader mode="card" cards={6}
/// mode means wich one type using [card or list], rows is lines down
//  - columns is counting to right
/// cards means number of iteam in page [ use only for card mode].

const ShimmerLoader = ({ rows = 3, columns = 4, mode = "list", cards = 3 }) => {
  if (mode === "list") {
    return (
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx}>
                <div
                  className="shimmer-loader"
                  style={{ width: 100, height: 16 }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  } else if (mode === "card") {
    return Array.from({ length: cards }).map((_, i) => (
      <li className="event-list__item" key={i}>
        <div
          className="shimmer-loader"
          style={{ height: 430, width: "100%" }}
        />
      </li>
    ));
  } else {
    return null;
  }
};

export default ShimmerLoader;
