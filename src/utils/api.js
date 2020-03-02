import axios from 'axios';

const api = axios.create({
  baseURL: 'https://centraldoaluno.herokuapp.com',
});

export default api;
