import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);


API.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (!response || response.status >= 500) {
            return Promise.reject(error);
        }

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        return response;
    }
);


export default API;
