import axios from 'axios';

// Base URL for the API
const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/auth';

// Create Axios instance
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export reusable functions for authentication
export const login = async (userId: string, password: string) => {
  const response = await authApi.post('/signin', { userId, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await authApi.post('/newToken', { refreshToken });
  return response.data;
};

export default authApi;
