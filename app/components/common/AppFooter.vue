<template>
  <footer class="bg-secondary text-tertiary text-center py-4 text-xs">
    <div class="max-w-7xl mx-auto px-4">
      <p>
        &copy; {{ currentYear }} Sistema de Gestión de Productos. Prueba Técnica
        MGi.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
