import api from '../config/api';

export default {
  getUsersList: async () => {
    return await api.get('/users', {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },
};
