import axios from 'axios'

const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
