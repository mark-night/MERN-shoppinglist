import axios from 'axios';

export const mongoDBAPI = axios.create({
  // baseURL: 'http://localhost:3002',
  baseURL: '',
});
