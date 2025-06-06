import Card from "../components/Card";

const EventList = () => {
  return (
    <>
      <section class="event-list">
        <h2 class="event-list__title">Upcoming Events</h2>
        <ul class="event-list__items">
          <li class="event-list__item">
            <Card />
          </li>
          <li class="event-list__item">
            <Card />
          </li>
        </ul>
      </section>
    </>
  );
};

export default EventList;
