import axios from 'axios'


export const authApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export const soccerApi = axios.create({
    baseURL: 'http://localhost:3000'
})

soccerApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

authApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
})