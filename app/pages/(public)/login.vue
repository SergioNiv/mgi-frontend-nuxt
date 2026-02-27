<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const { login } = authStore

const handleLogin = async (credentials: any) => {
  await login(credentials)
}
</script>

<template>
  <div class="w-full h-full flex flex-1 items-center justify-center font-primary text-secondary p-4 pt-20">
    <AuthLoginForm 
      :is-loading="isLoading" 
      @submit="handleLogin" 
    />
  </div>
</template>