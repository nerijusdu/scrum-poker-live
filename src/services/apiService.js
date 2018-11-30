import apiCall from '../helpers/apiCall';

export default {
  login(user) {
    return apiCall('/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },
  register(user) {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },
  getRooms() {
    return apiCall('/rooms');
  },
  createRoom(room) {
    return apiCall('/rooms', {
      method: 'POST',
      body: JSON.stringify(room)
    });
  }
};
