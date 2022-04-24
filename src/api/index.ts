import axios from 'axios';

export const API_URL = 'http://localhost:3000/';

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});