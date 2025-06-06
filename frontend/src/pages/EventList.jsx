import Card from "../components/Card";

const EventList = () => {
  return (
    <>
      <section className="event-list">
        <h2 className="event-list__title">Upcoming Events</h2>
        <ul className="event-list__items">
          <li className="event-list__item">
            <Card />
          </li>
          <li className="event-list__item">
            <Card />
          </li>
        </ul>
      </section>
    </>
  );
};

export default EventList;
