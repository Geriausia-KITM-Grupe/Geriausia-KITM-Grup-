import { useEffect, useState } from "react";
import Card from "../components/Card";

const EventList = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents([{}, {}]); // Replace with real event data
      setLoading(false);
    }, 1200);
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
              <li className="event-list__item" key={i}>
                <Card {...event} />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default EventList;
