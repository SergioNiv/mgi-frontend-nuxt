<script setup lang="ts">
import { validateProductForm } from '~/utils/validations'
import type { Product } from '~~/types'
import { PRODUCT_STATUS } from '~/utils/constants'

const props = defineProps({
  initialData: {
    type: Object as () => Partial<Product>,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const state = reactive({
  title: props.initialData.title || '',
  category: props.initialData.category || '',
  price: props.initialData.price || 0,
  stock: props.initialData.stock || 0,
  description: props.initialData.description || '',
  availabilityStatus: props.initialData.availabilityStatus || PRODUCT_STATUS.IN_STOCK,
  existingImageUrl: props.initialData.thumbnail || '',
  newImage: undefined as File | undefined,
})

const createObjectURL = (file: File) => URL.createObjectURL(file)

const previewImage = computed(() => {
  if (state.newImage) return createObjectURL(state.newImage)
  if (state.existingImageUrl) return state.existingImageUrl
  return null
})

const statusOptions = Object.values(PRODUCT_STATUS)

const onSubmit = async () => {
  emit('submit', state)
}
const validate = (state: Product) => validateProductForm(state)
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-6"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormField label="Nombre del Producto" name="title" required>
        <UInput
          v-model="state.title"
          placeholder="Ej: iPhone 15 Pro"
          icon="i-heroicons-cube"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>

      <UFormField label="Categoría" name="category" required>
        <UInput
          v-model="state.category"
          placeholder="Ej: smartphones"
          icon="i-heroicons-tag"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>

      <UFormField label="Precio ($)" name="price" required>
        <UInput
          v-model="state.price"
          type="number"
          step="0.01"
          icon="i-heroicons-currency-dollar"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>

      <UFormField label="Stock disponible" name="stock">
        <UInput
          v-model="state.stock"
          type="number"
          icon="i-heroicons-archive-box"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>

      <UFormField label="Imagen" name="image">
        <UFileUpload v-model="state.newImage" accept="image/*">
          <template #default="{ open, removeFile }">
            <div
              class="flex flex-col sm:flex-row items-center gap-4 border border-white-off/10 p-4 rounded-lg bg-secondary/50"
            >
              <UAvatar
                v-if="previewImage"
                :src="previewImage"
                size="3xl"
                icon="i-heroicons-photo"
                class="border border-white-off/10 shrink-0"
              />

              <UAvatar
                v-else
                size="3xl"
                icon="i-heroicons-photo"
                class="bg-black-off shrink-0"
              />

              <div
                class="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left w-full min-w-0"
              >
                <span class="text-sm text-tertiary truncate block w-full">
                  {{
                    state.newImage
                      ? state.newImage.name
                      : 'Sube una nueva imagen (Opcional)'
                  }}
                </span>

                <div class="flex gap-2">
                  <UButton
                    color="neutral"
                    variant="outline"
                    size="sm"
                    icon="i-heroicons-arrow-up-tray"
                    @click="open()"
                  >
                    {{ previewImage ? 'Cambiar imagen' : 'Subir imagen' }}
                  </UButton>

                  <UButton
                    v-if="state.newImage"
                    color="error"
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-trash"
                    @click="removeFile()"
                  >
                    Quitar
                  </UButton>
                </div>
              </div>
            </div>
          </template>
        </UFileUpload>
      </UFormField>

      <UFormField label="Estado" name="availabilityStatus">
        <USelect
          v-model="state.availabilityStatus"
          :items="statusOptions"
          icon="i-heroicons-check-badge"
        />
      </UFormField>
    </div>

    <UFormField label="Descripción" name="description" required>
      <UTextarea
        v-model="state.description"
        placeholder="Escribe los detalles del producto..."
        :rows="4"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <div class="flex justify-end gap-4 pt-4 border-t border-white-off/10">
      <UButton
        color="neutral"
        variant="ghost"
        to="/products"
        :disabled="isLoading"
      >
        Cancelar
      </UButton>

      <UButton
        type="submit"
        color="primary"
        variant="solid"
        icon="i-heroicons-paper-airplane"
        :loading="isLoading"
      >
        Guardar Producto
      </UButton>
    </div>
  </UForm>
</template>
