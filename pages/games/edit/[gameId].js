import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getGameById } from '../../../utils/data/gameData';

function EditGame() {
  const [game, setGame] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { gameId } = router.query;
  console.warn(game);
  useEffect(() => {
    getGameById(gameId).then(setGame);
  }, [user, router, gameId]);

  return (
    <GameForm user={user} gameObj={game} />
  );
}

export default EditGame;
