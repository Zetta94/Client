// src/axiosConfig.ts
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://api-prueba-tecnica.onrender.com';

export default axios;
