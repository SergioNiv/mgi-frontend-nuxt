<template>
  <div
    class="w-full h-full flex flex-1 items-center justify-center font-primary text-secondary p-4 pt-20"
  >
    <UCard class="w-full max-w-md shadow-xl bg-secondary">
      <template #header>
        <div class="text-center">
          <h1
            class="text-2xl font-bold font-display text-white-off tracking-wide"
          >
            MGi Sistema de Gestión
          </h1>
          <p class="text-white-off font-secondary text-sm mt-1">
            Ingresa tus credenciales para continuar
          </p>
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit">
        <UFormField label="Usuario" name="username">
          <UInput
            v-model="state.username"
            placeholder="ej. emilys"
            icon="i-heroicons-user"
            :disabled="isLoading"
            class="w-full mb-1"
          />
        </UFormField>

        <UFormField label="Contraseña" name="password">
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { isRequired } from '../../utils/validations'

const toast = useToast()
const authStore = useAuthStore()

const { isLoading } = storeToRefs(authStore)

const { login } = authStore

const showPassword = ref(false)

const state = reactive({
  username: '',
  password: '',
  expiresInMins: 60,
})

const onSubmit = async () => {
  const isFormValid = isRequired(state.username) && isRequired(state.password)
  if (!isFormValid) {
    toast.add({
      title: 'Campos incompletos',
      description: 'Ingresa usuario y contraseña',
      color: 'warning',
    })
    return
  }
  await login(state)
}
</script>
