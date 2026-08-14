import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Adiciona token JWT em requisições autenticadas se disponível
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fttresp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
