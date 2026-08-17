import axios from 'axios';

const isSubpath = typeof window !== 'undefined' && window.location.pathname.startsWith('/fttresp');

const api = axios.create({
  baseURL: isSubpath ? '/fttresp/api' : '/api'
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
