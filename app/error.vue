<script setup lang="ts">
import type { NuxtError } from '#app'

useHead({
  bodyAttrs: {
    class: 'bg-secondary',
  },
})

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: null,
  },
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-dvh w-screen bg-secondary px-4 text-center"
  >
    <div class="max-w-lg w-full flex flex-col items-center">
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="w-24 h-24 text-primary mb-6 animate-pulse"
      />

      <h1 class="text-7xl font-display font-bold text-white-off mb-2">
        {{ error?.status || 404 }}
      </h1>

      <h2 class="text-2xl font-secondary font-medium text-white-off mb-4">
        {{ error.message || '¡Oops! Página no encontrada' }}
      </h2>

      <p class="text-tertiary mb-8 leading-relaxed py-4">
        Parece que la ruta a la que intentas acceder no existe, ha sido movida o
        no tienes permisos para verla.
      </p>

      <UButton
        size="lg"
        color="primary"
        variant="solid"
        icon="i-heroicons-home"
        @click="handleError"
      >
        Volver al inicio
      </UButton>
    </div>
  </div>
</template>
