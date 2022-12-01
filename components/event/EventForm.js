/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const EventForm = ({ user, obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    game: null,
    description: '',
    date: '',
    time: '',
    organizer: user.uid,
  });
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
    if (obj?.id) setCurrentEvent(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj?.id) {
      updateEvent(currentEvent, obj.id)
        .then(() => router.push('/events'));
    } else {
      const event = {
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: user.uid,
      };
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" required value={currentEvent.time} onChange={handleChange} />
          <Form.Select
            aria-label="Game"
            name="game"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.gameId}
            required
          >
            <option value="">Select Game</option>
            {
              games.map((game) => (
                <option defaultValue={game.id === currentEvent.game} key={game.title} value={game.id}>
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    fbUser: PropTypes.shape({
      displayName: PropTypes.string,
    }).isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default EventForm;
