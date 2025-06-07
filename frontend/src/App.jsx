import "./App.css";
import Slider from "./components/silder/Slider";
import EventList from "./pages/EventList";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
            </>
          }
        />
        <Route path="/events" element={<EventList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
