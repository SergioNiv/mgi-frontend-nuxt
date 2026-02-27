<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Cargando información...',
  },
  size: {
    type: String,
    default: 'h-10 w-10',
  },
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-20 rounded-xl bg-secondary border border-white-off/10 min-h-75"
    :class="customClass"
  >
    <UIcon
      name="i-heroicons-arrow-path"
      :class="[size, 'animate-spin text-primary']"
    />

    <p
      v-if="message"
      class="text-tertiary font-secondary text-sm animate-pulse"
    >
      {{ message }}
    </p>
  </div>
</template>
