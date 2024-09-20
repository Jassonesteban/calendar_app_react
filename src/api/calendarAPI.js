import axios from "axios";

const urlBase = import.meta.env.VITE_API_URL;

const calendarAPI = axios.create({
    baseURL: urlBase
});

calendarAPI.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    
    return config;
})



export default calendarAPI;