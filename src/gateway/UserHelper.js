import api from '../config/api';

export default {
  getUsersList: () => {
    return api.get('/users', {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },
};
