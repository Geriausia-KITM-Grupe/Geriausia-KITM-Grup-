import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Slider from "./components/silder/Slider";

import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import UserPanel from "./pages/user/UserPanel";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

///Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageEventCategories from "./pages/admin/ManageEventCategories";
import { UserAccounts } from "./pages/admin/UserAccounts";
import AddEvent from "./pages/user/AddEvent";

function App() {
  const location = useLocation();
  const [fadeKey, setFadeKey] = useState(location.pathname);

  useEffect(() => {
    setFadeKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={fadeKey} className="page-fade">
      <Routes location={location}>
        {/*default routes - not auth...*/}
        <Route path="/" element={<Slider />} />
        <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/user/panel" element={<UserPanel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/*user routes*/}
        <Route path="/user/add-event" element={<AddEvent />} />

        {/*admin routes*/}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
        <Route path="/admin/categories" element={<ManageEventCategories />} />
        <Route path="/admin/user-accounts" element={<UserAccounts />} />

        {/* Routes error handling */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
