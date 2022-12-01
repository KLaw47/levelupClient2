import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function EventCard({ obj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${obj.description}?`)) {
      deleteEvent(obj.id).then(() => onUpdate());
    }
  };

  const joinThisEvent = () => {
    joinEvent(obj.id, user.uid).then(() => onUpdate());
  };

  const leaveThisEvent = () => {
    leaveEvent(obj.id, user.uid).then(() => onUpdate());
  };

  return (
    <Card className="text-center">
      <Card.Header>{obj.description}</Card.Header>
      <Card.Body>
        <Card.Title>{obj.game.title}</Card.Title>
        <Card.Text>{obj.date}</Card.Text>
        <Card.Text>{obj.time}</Card.Text>
      </Card.Body>
      <Button className="delete" onClick={deleteThisEvent}>
        DELETE
      </Button>
      { obj.joined ? <Button onClick={leaveThisEvent}>Leave</Button> : <Button onClick={joinThisEvent}>Join</Button>}
      <Card.Footer className="text-muted">Organized by: {obj.organizer.bio}</Card.Footer>
    </Card>
  );
}
EventCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      gamer: PropTypes.number,
      number_of_player: PropTypes.number,
      skill_level: PropTypes.number,
    }).isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    joined: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
