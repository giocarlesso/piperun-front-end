import api from '../config/api';

export default {
  login: async (email, password) => {
    return api
      .post('auth?email=' + email + '&password=' + password)
      .then((res) => {
        const userData = res.data.data.me;
        const token = userData.token;

        localStorage.setItem('Token', token);
        localStorage.setItem('userData', userData);
      });
  },
};
