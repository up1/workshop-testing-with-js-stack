import api from './api'
import type { LoginCredentials, RegisterData } from '../types/auth'

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  },
}
