<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useFormError } from '../composables/useFormError';

const router = useRouter()
const authStore = useAuthStore()
const { error, showError, setError, clearError } = useFormError();

const formData = ref({
  username: '',
  password: '',
})

const rules = {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(10),
  },
  password: { required },
}

const v$ = useVuelidate(rules, formData)

const login = async () => {
  clearError()
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  const { success, error: loginError } = await authStore.login(
    formData.value.username, 
    formData.value.password
  );

  if (success) {
    router.push('/');
  } else {
    setError(loginError);
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-3xl font-bold text-center">Sign in</h2>
      <form @submit.prevent="login" class="mt-8 space-y-6">
        <div v-if="showError" class="bg-red-50 p-4 rounded-md">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
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
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :class="{ 'border-red-500': v$.password.$error }"
          />
          <div v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
            Password is required
          </div>
        </div>

        <div class="flex items-center justify-between">
          <router-link to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </router-link>
          <router-link to="/register" class="text-sm text-blue-600 hover:text-blue-500">
            Create account
          </router-link>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>
