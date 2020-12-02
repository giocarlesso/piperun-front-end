import api from '../config/api';

export default {
  getActitivitiesList: async () => {
    return api.get('/activities', {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },

  getUsersList: () => {
    return api.get('users');
  },
};
