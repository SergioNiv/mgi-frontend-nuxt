<script setup lang="ts">
import type { ButtonColor } from '~~/types'

const isOpen = defineModel<boolean>({ default: false })

interface Props {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmColor?: ButtonColor
  confirmIcon?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Confirmar acción',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  confirmColor: 'error',
  confirmIcon: 'i-heroicons-check',
  loading: false,
})

defineEmits(['confirm'])
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :ui="{
      header: 'bg-secondary',
      body: 'bg-secondary',
      footer: 'bg-secondary',
    }"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-exclamation-triangle"
          :class="confirmColor === 'error' ? 'text-error' : 'text-warning'"
          class="w-6 h-6"
        />
        <span class="text-lg font-bold text-white-off font-display">
          {{ title }}
        </span>
      </div>
    </template>

    <template #description>
      <span class="sr-only">Por favor confirme esta acción.</span>
    </template>

    <template #body>
      <!-- eslint-disable-next-line -->
      <p class="text-tertiary font-secondary" v-html="message" />
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="ghost"
          :disabled="loading"
          @click="isOpen = false"
        >
          {{ cancelText }}
        </UButton>

        <UButton
          :color="confirmColor"
          variant="solid"
          :icon="confirmIcon"
          :loading="loading"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
