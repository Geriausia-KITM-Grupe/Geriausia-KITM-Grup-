import { useNavigate } from "react-router-dom";
import AdminRoute from "../../components/routes/AdminRoute";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageEventCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/event-categories"
        );
        setCategories(data);
      } catch (error) {
        // Handle error as needed
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <AdminRoute>
      {/* will be event editing / deleting
      
      Need to add Post -->
      */}

      <section className="admin-events">
        <h1 className="admin-dashboard__title">Manage Events Categories</h1>
        <button className="admin-dashboard__btn" id="add-event-btn">
          <i className="fas fa-plus"></i> Add Event Categorie
        </button>

        <button
          className="admin-dashboard__btn"
          id="go-back-btn"
          style={{ float: "right" }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Go back
        </button>

        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table
            className="admin-users__table"
            style={{ minWidth: "360px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    List is empty
                  </td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr key={cat.id}>
                    <td>
                      <b>{idx + 1}.</b>
                    </td>
                    <td>{cat.name}</td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        color: "#888",
                        width: "370px",
                      }}
                    >
                      <span>{cat.description}</span>
                    </td>
                    <td>
                      <button className="admin-users__edit-btn" title="Edit">
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

export default ManageEventCategories;
