import axios from 'axios';

/**
 * Base URL for the API endpoints.
 * In production, this should be set via environment variables.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Axios instance configured for API requests.
 * Includes base URL, timeout, and default headers.
 */
const apiRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authentication token.
 * Automatically adds the Bearer token to requests if available in localStorage.
 * 
 * @param {Object} config - The axios request configuration
 * @returns {Object} The modified request configuration
 */
apiRequest.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to retrieve token from localStorage:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common errors.
 * Automatically handles 401 unauthorized responses and token cleanup.
 * 
 * @param {Object} response - The successful response
 * @returns {Object} The response data
 */
apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your connection and try again.',
        isNetworkError: true
      });
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        try {
          localStorage.removeItem('token');
          // Only redirect if not already on login page to avoid infinite loops
          if (!window.location.pathname.startsWith('/login')) {
            // Emit an event or call a router method instead of full page reload
            // Example: window.dispatchEvent(new CustomEvent('auth:expired'));
            // Or use your router: router.push('/login');
            window.location.href = '/login';
          }
        } catch (storageError) {
          console.warn('Failed to clear token from localStorage:', storageError);
        }
        break;      
      case 403:
        console.warn('Access forbidden:', error.response.data?.message);
        break;
      
      case 404:
        console.warn('Resource not found:', error.response.data?.message);
        break;
      
      case 500:
        console.error('Server error:', error.response.data?.message);
        break;
      
      default:
        console.error('API error:', error.response.data?.message || 'Unknown error');
    }

    // Return a standardized error object
    return Promise.reject({
      message: error.response.data?.message || 'An unexpected error occurred',
      status: error.response.status,
      data: error.response.data
    });
  }
);

export default apiRequest;
