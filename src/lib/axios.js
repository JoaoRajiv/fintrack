import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage';
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return request;
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
