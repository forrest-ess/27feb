import axios from 'axios';

const api = axios.create({
  baseURL:
    // 'https://mc-isaac-conviction-submitted.trycloudflare.com/api',
    // 'http://localhost:9000/api',
    'https://common-api.daataa.dev',
});

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const response = await api.post('authentication/register', user);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('authentication/login', credentials);
  return response.data;
};
