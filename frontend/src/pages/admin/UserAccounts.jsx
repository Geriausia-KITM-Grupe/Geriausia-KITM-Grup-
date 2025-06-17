import { useNavigate } from "react-router-dom";
import AdminRoute from "../../components/routes/AdminRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert";
import ConfirmModal from "../../components/ConfirmModal";
import ShimmerLoader from "../../components/ShimmerLoader";

export const UserAccounts = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); /// loader usestate setting to false;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}api/users`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        setUsers(Array.isArray(data) ? data : []);
      } catch {
        // Handle error as needed
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);
  // Handle form submission to update user role
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}api/users/${selectedUser._id}`,
        { role },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === selectedUser._id ? { ...u, role } : u))
      );
      setSelectedUser(null);
      setAlert("User role updated successfully!");
    } catch {
      setAlert("Failed to update user role");
    }
  };

  // cancel edit user
  const handleEditCancel = () => {
    setSelectedUser(null);
    setRole("");
  };

  // delete user as admin
  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}api/users/${userToDelete}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete));
      setAlert("User deleted successfully!");

      // If the deleted user is the currently logged-in user, log them out and remove token
      if (user && String(user._id) === String(userToDelete)) {
        console.log("Deleting logged-in user, removing from localStorage...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();
      }
    } catch (err) {
      console.error("Delete user error:", err);
      setAlert("Failed to delete user");
    }
    setShowConfirm(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  // Ban or disable user
  const handleBan = async (userId, currentStatus) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}api/users/${userId}`,
        { status: !currentStatus },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: !currentStatus } : u
        )
      );
      setAlert(!currentStatus ? "User enabled successfully!" : "User banned!");
    } catch {
      setAlert("Failed to update user status");
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
          <Alert message={alert} onClose={() => setAlert("")} />
          <ConfirmModal
            isOpen={showConfirm}
            message="Are you sure you want to delete this user?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
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
                <th>Last login</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading ? (
              <ShimmerLoader count={5} columns={6} mode="list" />
            ) : (
              <tbody>
                {Array.isArray(users) && users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "#888" }}
                    >
                      List is empty
                    </td>
                  </tr>
                ) : (
                  users.map((usr, idx) =>
                    selectedUser && selectedUser._id === usr._id ? (
                      <tr key={usr._id}>
                        <td>
                          <b>{idx + 1}.</b>
                        </td>
                        <td colSpan={5} style={{ padding: 0 }}>
                          <div
                            className="admin-category-form__input"
                            style={{
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <span>Editing: {usr.userName}</span>
                            <span
                              style={{
                                wordBreak: "break-word",
                                color: "rgb(136, 136, 136)",
                                width: "150px",
                                marginLeft: "50px",
                              }}
                            >
                              Role:
                            </span>
                            <form
                              onSubmit={handleSubmit}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <select
                                id="role"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="admin-category-form__input"
                                style={{ minWidth: 100 }}
                              >
                                <option value="" disabled>
                                  Select role
                                </option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>

                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  fontWeight: 500,
                                  marginLeft: "60px",
                                }}
                              >
                                <button
                                  type="submit"
                                  className="admin-category-form__btn"
                                  style={{
                                    minWidth: 80,
                                    padding: "6px 18px",
                                  }}
                                  disabled={!role}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="admin-category-form__btn"
                                  style={{
                                    minWidth: 80,
                                    padding: "6px 18px",
                                    background: "#f44336",
                                  }}
                                  onClick={handleEditCancel}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ) : (
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
                        <td style={{ textTransform: "capitalize" }}>
                          {usr.role}
                        </td>
                        <td>
                          {usr.lastLogin
                            ? new Date(usr.lastLogin).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className={
                              usr.status
                                ? "admin-users__delete-btn"
                                : "admin-users__edit-btn"
                            }
                            style={{ marginRight: 8 }}
                            onClick={() => handleBan(usr._id, usr.status)}
                            type="button"
                          >
                            {usr.status ? "Ban" : "Enable"}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(usr);
                            }}
                            className="admin-users__edit-btn"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="admin-users__delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(usr._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            )}
          </table>
        </div>
      </section>
    </AdminRoute>
  );
};
