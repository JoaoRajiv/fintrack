import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
import { removeTokens } from '@/context/auth';
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    //Verificar se tenho refresh token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return Promise.reject(error);
    }
    //Verificar se o erro é 401
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true;
      try {
        const response = await api.post('/users/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(request);
      } catch (error) {
        removeTokens();
        console.log('Erro ao atualizar token:', error);
      }
    }
    return Promise.reject(error);
  }
);
