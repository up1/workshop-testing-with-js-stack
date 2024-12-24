import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/auth'
import { authService } from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password })
      localStorage.setItem('token', response.token)
      user.value = response.user
      isAuthenticated.value = true
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: message };
    }
  }

  const logout = () => {
    authService.logout()
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
