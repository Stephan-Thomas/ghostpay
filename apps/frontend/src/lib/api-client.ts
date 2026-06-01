/**
 * API Client Configuration
 * Axios setup for API calls
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// TODO: Implement API client with:
// - Request/response interceptors
// - JWT token management
// - Error handling
// - Request cancellation

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  // TODO: Add auth token to headers
  // const token = localStorage.getItem('accessToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle 401 errors and refresh token
    // TODO: Handle other error types
    return Promise.reject(error);
  }
);

export default apiClient;
