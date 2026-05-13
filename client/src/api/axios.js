import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 12000,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('weatherly_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;