/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

const getEvents = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events?uid=${uid}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getEventById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const joinEvent = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const leaveEvent = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}/leave`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};
