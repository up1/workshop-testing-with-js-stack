<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, email } from '@vuelidate/validators'

const router = useRouter()

const formData = ref({
  username: '',
  email: '',
  password: '',
})

const rules = {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(10),
  },
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
    containsUppercase: (value: string) => /[A-Z]/.test(value),
    containsNumber: (value: string) => /[0-9]/.test(value),
    containsSpecial: (value: string) => /[!@#$%^&*]/.test(value),
  },
}

const v$ = useVuelidate(rules, formData)

const register = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  try {
    await authService.register(formData.value)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-3xl font-bold text-center">Create Account</h2>
      <form @submit.prevent="register" class="mt-8 space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :class="{ 'border-red-500': v$.username.$error }"
          />
          <div v-if="v$.username.$error" class="text-red-500 text-sm mt-1">
            Username must be between 3 and 10 characters
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :class="{ 'border-red-500': v$.email.$error }"
          />
          <div v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
            Please enter a valid email address
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :class="{ 'border-red-500': v$.password.$error }"
          />
          <div v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
            Password must be at least 8 characters and contain uppercase, number, and special
            character
          </div>
        </div>

        <div class="flex justify-end">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </router-link>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>
