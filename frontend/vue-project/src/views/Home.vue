<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Welcome {{ authStore.user?.username }}</h1>
          </div>
          <div class="flex items-center">
            <button
              @click="logout"
              class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow flex items-center justify-center">
      <!-- Add your main content here -->
      <div class="px-4 py-6 sm:px-0">
        <div
          class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center"
        >
          <p class="text-gray-500">Main content area</p>
        </div>
      </div>
    </main>
  </div>
</template>
