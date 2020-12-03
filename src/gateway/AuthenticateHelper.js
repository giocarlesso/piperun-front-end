import api from '../config/api';

export default {
  login: async (email, password) => {
    return await api
      .post('auth?email=' + email + '&password=' + password)
      .then((res) => {
        const userData = res.data.data.me.id;
        const token = res.data.data.me.token;

        localStorage.setItem('Token', token);
        localStorage.setItem('userData', userData);
      })
      .catch((err) => console.log(err));
  },
};
