import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080' 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            localStorage.removeItem('token');
            
            if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login';
                alert("Sua sessão expirou. Faça login novamente.");
            }
        }
        return Promise.reject(error);
    }
);

export default api;