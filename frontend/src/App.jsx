import "./App.css";
import Slider from "./components/silder/Slider";
import EventList from "./pages/EventList";
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
      </Routes>
    </Router>
  );
}

export default App;
