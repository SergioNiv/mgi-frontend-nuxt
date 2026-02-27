<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const { token, user } = storeToRefs(authStore)

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
        <ClientOnly>
          <div class="flex items-center gap-3">
            <UAvatar
              v-if="user"
              :src="user.image"
              size="lg"
              icon="i-heroicons-photo"
              class="border border-white-off/10 shrink-0"
            />

            <div class="flex-col hidden md:flex">
              <span class="text-sm font-medium truncate w-34">{{
                user?.firstName
              }}</span>
              <span class="text-xs text-gray-400 truncate w-34">{{
                user?.email
              }}</span>
            </div>
          </div>

          <template #fallback>
            <div class="flex items-center gap-3">
              <USkeleton class="w-10 h-10 rounded-full" />
              <div class="flex-col hidden md:flex gap-1">
                <USkeleton class="h-4 w-24" />
                <USkeleton class="h-3 w-32" />
              </div>
            </div>
          </template>
        </ClientOnly>

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
