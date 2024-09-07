import axios from 'axios';

let csrfToken = '';

async function fetchCsrfToken() {
    try {
        const response = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
        csrfToken = response.data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}

fetchCsrfToken().catch((error) => {
    console.error('Error during initial CSRF token fetch:', error);
});

const apiService = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

apiService.interceptors.request.use((config) => {
    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiService;