/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  description: '',
  date: '',
  time: '',
  game: 0,
};
const EventForm = ({ obj, user }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  console.warn(obj);
  const getGamesSetForm = () => {
    if (obj.id) {
      setCurrentEvent(obj);
    }
    getGames().then(setGames);
  };

  useEffect(() => {
    getGamesSetForm();
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

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game: Number(currentEvent.game),
      user_id: user.uid,
    };
    if (obj.id) {
      const gameId = { ...currentEvent, game_id: currentEvent.game };
      updateEvent(gameId).then(() => router.push('/events'));
    } else {
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
            name="gameId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.gameId}
            required
          >
            <option value="">Select Game</option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                  label={game.title}
                />
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.number,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
