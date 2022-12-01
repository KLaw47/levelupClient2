import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getContent = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      <h2>
        <Button
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </h2>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} id={game.id} skillLevel={game.skill_level} onUpdate={getContent} />
        </section>
      ))}
    </article>
  );
}

export default Home;
