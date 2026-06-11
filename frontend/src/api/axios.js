import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

// Automatically inject the token into every outgoing request
api.interceptors.request.use(
  (config) => {
    const rawToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const token = rawToken ? rawToken.replace(/^"|"$/g, '') : '';

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;