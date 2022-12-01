import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  game_type: 0,
};
const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.numberOfPlayers),
      skill_level: Number(currentGame.skillLevel),
      game_type: Number(currentGame.game_type),
      user_id: user.uid,
    };
    if (gameObj.id) {
      delete game.user_id;
      updateGame(game, gameObj.id).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  useEffect(() => {
    if (gameObj.id) {
      const editGame = {
        title: gameObj.title,
        maker: gameObj.maker,
        skillLevel: gameObj.skill_level,
        numberOfPlayers: gameObj.number_of_players,
        game_type: gameObj.game_type.id,
      };
      setCurrentGame(editGame);
    }
    getGameTypes().then(setGameTypes);
  }, [gameObj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="game_type" value={currentGame.game_type} onChange={handleChange} required>
            <option value="">Select a Game Type</option>
            {gameTypes?.map((type) => (
              <option key={type.id} value={type.id} label={type.label} />
            ))};
          </Form.Select>
          <Form.Label>Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
