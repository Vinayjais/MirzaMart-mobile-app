import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserStore} from "../store/useUserStore"
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ===================== REQUEST ===================== */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== RESPONSE ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.log(
        'API Error:',
        error.response.status,
        error.response.data
      );

      if (error.response.status === 401) {
        // TODO: refresh token or logout
      }
    } else if (error.request) {
      console.log('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
