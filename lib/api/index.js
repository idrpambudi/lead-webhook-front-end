import axios from "axios"

const api = axios.create({ 
    baseURL:  process.env.serverURL,
});

export default api;