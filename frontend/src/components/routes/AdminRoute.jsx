const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div
        style={{
          margin: "3rem auto",
          padding: "2rem 3rem",
          maxWidth: "400px",
          background: "linear-gradient(135deg, #23272f 0%, #1a202c 100%)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(20,20,30,0.5)",
          textAlign: "center",
          color: "#f8fafc",
          fontFamily: "Segoe UI, sans-serif",
          fontSize: "1.2rem",
        }}
      >
        <span role="img" aria-label="lock" style={{ fontSize: "2rem" }}>
          🔒
        </span>
        <div style={{ marginTop: "1rem", fontWeight: 600 }}>
          You must be logged in to view this page.
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div
        style={{
          margin: "3rem auto",
          padding: "2rem 3rem",
          maxWidth: "400px",
          background: "linear-gradient(135deg, #23272f 0%, #1a202c 100%)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(20,20,30,0.5)",
          textAlign: "center",
          color: "#f8fafc",
          fontFamily: "Segoe UI, sans-serif",
          fontSize: "1.2rem",
        }}
      >
        <span role="img" aria-label="no-entry" style={{ fontSize: "2rem" }}>
          🚫
        </span>
        <div style={{ marginTop: "1rem", fontWeight: 600 }}>
          Access denied. This page is for admins only.
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
