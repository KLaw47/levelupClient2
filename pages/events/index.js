import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <h2>
        <Button
          onClick={() => {
            router.push('/events/new');
          }}
        >
          Register New Event
        </Button>
      </h2>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} game={event.game} date={event.date} time={event.time} organizer={event.organizer} />
        </section>
      ))}
    </article>
  );
}

export default Home;
