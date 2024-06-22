import axios from 'axios';

const commonApi = axios.create({
  baseURL: process.env.REACT_APP_COMMON_API,
});

// // Add a request interceptor
commonApi.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // Add the token to the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {  commonApi };
