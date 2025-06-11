import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Slider from "./components/silder/Slider";
import EventList from "./pages/EventList";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const [fadeKey, setFadeKey] = useState(location.pathname);

  useEffect(() => {
    setFadeKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={fadeKey} className="page-fade">
      <Routes location={location}>
        <Route path="/" element={<Slider />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
