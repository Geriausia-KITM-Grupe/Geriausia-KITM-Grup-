import { Link } from "react-router-dom";
import AdminRoute from "../../components/routes/AdminRoute";

const Dashboard = () => {
  return (
    <AdminRoute>
      <section className="admin-dashboard">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
        <div className="admin-dashboard__cards">
          <div className="admin-dashboard__card">
            <i className="fas fa-calendar-alt admin-dashboard__icon"></i>
            <div>
              <h2>Manage Events</h2>
              <p>Create, edit, or delete events.</p>
              <Link to="/admin/manage-events" className="admin-dashboard__btn">
                Go
              </Link>
            </div>
          </div>
          <div className="admin-dashboard__card">
            <i className="fas fa-list-alt admin-dashboard__icon"></i>
            <div>
              <h2>Categories</h2>
              <p>Manage event categories.</p>
              <Link to="/admin/categories" className="admin-dashboard__btn">
                Go
              </Link>
            </div>
          </div>
          <div className="admin-dashboard__card">
            <i className="fas fa-users admin-dashboard__icon"></i>
            <div>
              <h2>User Accounts</h2>
              <p>View and manage user accounts.</p>
              <Link to="/admin/user-accounts" className="admin-dashboard__btn">
                Go
              </Link>
            </div>
          </div>
          {/* <div className="admin-dashboard__card">
            <i className="fas fa-chart-line admin-dashboard__icon"></i>
            <div>
              <h2>Analytics</h2>
              <p>View site statistics and reports.</p>
              <a href="analytics.html" className="admin-dashboard__btn">
                Go
              </a>
            </div>
          </div>
          <div className="admin-dashboard__card">
            <i className="fas fa-cog admin-dashboard__icon"></i>
            <div>
              <h2>Settings</h2>
              <p>Configure site preferences.</p>
              <a href="settings.html" className="admin-dashboard__btn">
                Go
              </a>
            </div>
          </div> */}
        </div>
      </section>
    </AdminRoute>
  );
};

export default Dashboard;
