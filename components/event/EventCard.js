import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description,
  game,
  date,
  time,
  organizer,
}) => (
  <Card className="text-center">
    <Card.Header>{description}</Card.Header>
    <Card.Body>
      <Card.Title>{game}</Card.Title>
      <Card.Text>{date}</Card.Text>
      <Card.Text>{time}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Organized by: {organizer}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  game: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.number.isRequired,
};

export default EventCard;
