import axios from 'axios';

const baseURL = 'https://newsapi.org/v2/';
const allowedTimeoutSec = 20;

const instance = axios.create({
  baseURL,
  timeout: 1000 * allowedTimeoutSec,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default instance;
