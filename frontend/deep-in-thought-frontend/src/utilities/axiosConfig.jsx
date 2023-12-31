// Axios instance configured for API calls.
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
    // Authorization: ''
  }
});

export default api;
