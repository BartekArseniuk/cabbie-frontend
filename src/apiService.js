import axios from 'axios';

async function fetchCsrfToken() {
    try {
        const response = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
        return response.data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}

const apiService = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

apiService.interceptors.request.use(async (config) => {
    try {
        const csrfToken = await fetchCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
}, (error) => {
    return Promise.reject(error);
});

apiService.interceptors.response.use(response => {
    return response;
}, async (error) => {
    if (error.response && error.response.status === 419) {
        try {
            const csrfToken = await fetchCsrfToken();
            error.config.headers['X-CSRF-TOKEN'] = csrfToken;
            return apiService.request(error.config);
        } catch (tokenError) {
            console.error('Error fetching new CSRF token:', tokenError);
            return Promise.reject(tokenError);
        }
    }
    return Promise.reject(error);
});

export default apiService;