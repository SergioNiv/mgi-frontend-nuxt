<script setup lang="ts">
defineProps({
  row: {
    type: Object,
    required: true,
  },
})

defineEmits(['view', 'edit', 'delete'])
</script>

<template>
  <div class="flex items-center gap-1">
    <UTooltip text="Ver detalle">
      <UButton
        icon="i-heroicons-eye"
        size="xs"
        variant="ghost"
        color="neutral"
        @click="$emit('view', row)"
      />
    </UTooltip>

    <UTooltip text="Editar producto">
      <UButton
        icon="i-heroicons-pencil-square"
        size="xs"
        variant="ghost"
        color="primary"
        @click="$emit('edit', row)"
      />
    </UTooltip>

    <UTooltip text="Eliminar producto">
      <UButton
        icon="i-heroicons-trash"
        size="xs"
        variant="ghost"
        color="error"
        @click="$emit('delete', row)"
      />
    </UTooltip>
  </div>
</template>
