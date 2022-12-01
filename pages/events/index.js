/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getContent = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getContent();
  }, [user, router]);
  // console.warn(events);
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
        <EventCard key={event.id} obj={event} onUpdate={getContent} />
      ))}
    </article>
  );
}

export default Home;
