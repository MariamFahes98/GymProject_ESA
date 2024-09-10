import axios from 'axios';

// Create an instance of Axios with default settings
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Default to localhost if env variable not set
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Request config:', config);
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

// Optional: Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
