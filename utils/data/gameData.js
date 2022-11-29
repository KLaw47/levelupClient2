import axios from 'axios';
import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line no-unused-vars
const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

// eslint-disable-next-line no-unused-vars
const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateGame = (game, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getGames,
  createGame,
  getGameTypes,
  updateGame,
  getGameById,
};
