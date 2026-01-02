import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (preferences) => {
  const response = await api.post('/api/recommendations', preferences);
  return response.data;
};

export const getMovies = async (limit = 20) => {
  const response = await api.get(`/api/movies?limit=${limit}`);
  return response.data;
};

export const getBooks = async (limit = 20) => {
  const response = await api.get(`/api/books?limit=${limit}`);
  return response.data;
};

export const startGame = async () => {
  const response = await api.post('/api/game/start');
  return response.data;
};

export const answerQuestion = async (data) => {
  const response = await api.post('/api/game/answer', data);
  return response.data;
};

export const getCharacters = async () => {
  const response = await api.get('/api/game/characters');
  return response.data;
};

export default api;
