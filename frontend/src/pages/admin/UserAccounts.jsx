import { useNavigate } from "react-router-dom";
import AdminRoute from "../../components/routes/AdminRoute";
import { useEffect, useState } from "react";
import axios from "axios";

export const UserAccounts = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users", {
          headers: { authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (error) {
        // Handle error as needed
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      await axios.put(
        `http://localhost:3000/api/users/${selectedUser._id}`,
        { role },
        { headers: { authorization: `Bearer ${token}` } }
      );
      // Update users list locally
      setUsers((prev) =>
        prev.map((u) => (u._id === selectedUser._id ? { ...u, role } : u))
      );
      setShowForm(false);
      setSelectedUser(null);
    } catch (err) {
      // Optionally handle error
      alert("Failed to update user role");
    }
  };

  return (
    <AdminRoute>
      <section className="admin-events">
        <h1 className="admin-dashboard__title">Manage Users</h1>
        <button
          className="admin-dashboard__btn"
          id="go-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Go back
        </button>

        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          {showForm && selectedUser && (
            <div className="admin-users__form">
              <h2
                className="admin-users__form-title"
                style={{ marginBottom: "12px", fontWeight: "bold" }}
              >
                Editing User: {selectedUser.userName}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="admin-users__form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="admin-users__submit-btn">
                  Submit
                </button>
              </form>
            </div>
          )}
          <table
            className="admin-users__table"
            style={{ minWidth: "360px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    List is empty
                  </td>
                </tr>
              ) : (
                users.map((usr, idx) => (
                  <tr key={usr._id}>
                    <td>
                      <b>{idx + 1}.</b>
                    </td>
                    <td>{usr.userName}</td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        color: "#888",
                        width: "370px",
                      }}
                    >
                      <span>{usr.email}</span>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>{usr.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedUser(usr);
                          setShowForm(true);
                        }}
                        className="admin-users__edit-btn"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="admin-users__delete-btn"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminRoute>
  );
};
