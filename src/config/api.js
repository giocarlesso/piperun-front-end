import axios from 'axios';

//Instância global do axios para diminui a quantia de código repetido

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Token: localStorage.getItem('Token'),
    'Content-Type': 'application/json',
  },
});
