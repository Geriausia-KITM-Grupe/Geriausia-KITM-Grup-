const Loader = () => {
  return (
    <>
      <div style={{ flex: 1, paddingRight: 40 }}>
        <div
          className="shimmer-loader"
          style={{ height: 60, width: 320, marginBottom: 18, borderRadius: 12 }}
        />
        <div
          className="shimmer-loader"
          style={{ height: 32, width: 120, marginBottom: 18, borderRadius: 8 }}
        />
        <div
          className="shimmer-loader"
          style={{ height: 20, width: 260, marginBottom: 12, borderRadius: 8 }}
        />
        <div
          className="shimmer-loader"
          style={{ height: 20, width: 260, marginBottom: 12, borderRadius: 8 }}
        />
        <div
          className="shimmer-loader"
          style={{ height: 20, width: 180, marginBottom: 32, borderRadius: 8 }}
        />
        <div style={{ display: "flex", gap: 30, marginBottom: 30 }}>
          <div
            className="shimmer-loader"
            style={{ height: 60, width: 120, borderRadius: 8 }}
          />
          <div
            className="shimmer-loader"
            style={{ height: 60, width: 120, borderRadius: 8 }}
          />
          <div
            className="shimmer-loader"
            style={{ height: 60, width: 120, borderRadius: 8 }}
          />
        </div>
        <div
          className="shimmer-loader"
          style={{ height: 44, width: 180, borderRadius: 8 }}
        />
      </div>{" "}
      <div
        className="shimmer-loader"
        style={{
          width: "380px",
          height: "600px",
          borderRadius: "18px",
          boxShadow: "0 4px 24px #0005",
          marginLeft: 40,
          flexShrink: 0,
        }}
      />
    </>
  );
};

export default Loader;
