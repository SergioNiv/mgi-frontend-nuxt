<script setup lang="ts">
import { ref, reactive } from 'vue'
import { validateLoginForm } from '~/utils/validations'
import { APP_NAME, DEFAULT_TOKEN_EXPIRES_IN } from '~/utils/constants'

defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', credentials: typeof state): void
}>()

const showPassword = ref(false)

const state = reactive({
  username: '',
  password: '',
  expiresInMins: DEFAULT_TOKEN_EXPIRES_IN,
})

const onSubmit = () => {
  emit('submit', state)
}
</script>

<template>
  <UCard class="w-full max-w-md shadow-xl bg-secondary">
    <template #header>
      <div class="text-center">
        <h1
          class="text-2xl font-bold font-display text-white-off tracking-wide"
        >
          {{ APP_NAME }}
        </h1>
        <p class="text-white-off font-secondary text-sm mt-1">
          Ingresa tus credenciales para continuar
        </p>
      </div>
    </template>

    <UForm
      :state="state"
      :validate="validateLoginForm"
      @submit.prevent="onSubmit"
    >
      <UFormField label="Usuario" name="username" required>
        <UInput
          v-model="state.username"
          placeholder="ej. emilys"
          icon="i-heroicons-user"
          :disabled="isLoading"
          class="w-full mb-1"
        />
      </UFormField>

      <UFormField label="Contraseña" name="password" class="mt-4" required>
        <UInput
          v-model="state.password"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          :ui="{ leading: 'ps-1.5' }"
          :disabled="isLoading"
          class="w-full"
        >
          <template #leading>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        block
        :loading="isLoading"
        class="font-bold mt-4"
      >
        Iniciar Sesión
      </UButton>
    </UForm>

    <template #footer>
      <div class="text-xs text-center text-white-off font-secondary">
        Prueba Técnica Frontend MGi - 2026
      </div>
    </template>
  </UCard>
</template>
