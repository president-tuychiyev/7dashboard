import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.defaults.headers['Content-type'] = 'Application/json'
const AUTH_TOKEN = $cookies.get('AUTH_TOKEN') ?? null
AUTH_TOKEN ? axios.defaults.headers['Authorization'] = `Bearer ${AUTH_TOKEN}` : null


// set configs
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// request and responses
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios