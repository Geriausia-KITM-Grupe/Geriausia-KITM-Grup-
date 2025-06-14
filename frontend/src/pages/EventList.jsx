import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const EventList = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events/approved") // Adjust the URL to match your backend endpoint
      .then((res) => {
        // If res.data is { events: [...] }
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else if (Array.isArray(res.data.events)) {
          setEvents(res.data.events);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="event-list">
      <h2 className="event-list__title">Upcoming Events</h2>
      <ul className="event-list__items">
        {loading
          ? [1, 2].map((i) => (
              <li className="event-list__item" key={i}>
                <div
                  className="shimmer-loader"
                  style={{ height: 430, width: "100%" }}
                />
              </li>
            ))
          : events.map((event, i) => (
              <li className="event-list__item" key={event.id || i}>
                <Card {...event} />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default EventList;
