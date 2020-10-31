import axios from 'axios';

export const mongoDBAPI = axios.create({
  baseURL: process.env.BACKEND_BASEURL || process.env.PUBLIC_URL || '',
});
