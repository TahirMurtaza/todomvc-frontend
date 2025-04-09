import axios from 'axios'
import localStorageService from '@/services/localStorage.service'

const API_URL = process.env.VUE_APP_API_URL

const apiClient = axios.create({
  baseURL: API_URL, // Set the base URL
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorageService.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
