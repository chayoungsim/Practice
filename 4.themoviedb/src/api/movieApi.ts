import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_TOKEN

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 2000,
    headers : {
        Accept: 'application/json',
        Authorization : `Bearer ${API_KEY}`
    }
})

export default api