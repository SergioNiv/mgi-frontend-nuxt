<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const { token } = storeToRefs(authStore)

const { logout } = authStore
</script>

<template>
  <header class="bg-secondary text-white-off shadow-md sticky top-0 z-50">
    <div
      class="px-4 py-3 flex justify-between items-center max-w-7xl mx-auto w-full"
    >
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-cube-transparent"
          class="text-primary text-2xl"
        />
        <NuxtLink
          to="/products"
          class="font-display font-bold text-lg tracking-wide"
        >
          MGi Panel
        </NuxtLink>
      </div>

      <nav v-if="token" class="flex items-center gap-4">
        <NuxtLink
          to="/products"
          class="hover:text-primary transition-colors text-sm font-medium"
          active-class="text-primary"
        >
          Productos
        </NuxtLink>

        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-arrow-right-on-rectangle"
          size="sm"
          @click="logout"
        >
          Salir
        </UButton>
      </nav>
    </div>
  </header>
</template>
