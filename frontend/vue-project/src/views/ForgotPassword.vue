<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '../services/auth.service'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const formData = ref({
  email: '',
})

const rules = {
  email: { required, email },
}

const v$ = useVuelidate(rules, formData)
const message = ref('')
const isSuccess = ref(false)

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  try {
    await authService.forgotPassword(formData.value.email)
    message.value = 'Password reset link has been sent to your email'
    isSuccess.value = true
  } catch {
    message.value = 'Failed to send reset link. Please try again.'
    isSuccess.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-3xl font-bold text-center">Reset Password</h2>
      <form @submit.prevent="submitForm" class="mt-8 space-y-6">
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

        <div v-if="message" :class="['text-sm', isSuccess ? 'text-green-600' : 'text-red-600']">
          {{ message }}
        </div>

        <div class="flex justify-end">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </router-link>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  </div>
</template>
