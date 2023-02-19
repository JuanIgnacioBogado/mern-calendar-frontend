import axios from 'axios';

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

calendarApi.interceptors.request.use(config => {
  config.headers.set('x-token', localStorage.getItem('token'));

  return config;
});

export default calendarApi;
