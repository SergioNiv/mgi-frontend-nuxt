<script setup lang="ts">
import type { Product } from '~~/types'

const route = useRoute()
const toast = useToast()
const isSaving = ref(false)

const productId = route.params.id as string

const { $api } = useNuxtApp()

const {
  data: product,
  pending,
  error,
} = await useAsyncData<Product>(`product-${productId}`, () =>
  $api.products.getProductById(productId)
)

const handleUpdate = async (formData: Product) => {
  isSaving.value = true

  try {
    const response = await $api.products.updateProduct(productId, formData)

    console.log('Producto actualizado:', response)

    toast.add({
      title: '¡Actualizado!',
      description: 'Los cambios se han guardado correctamente.',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })

    navigateTo('/products')
  } catch (err) {
    console.error(err)
    toast.add({
      title: 'Error',
      description: 'No se pudo actualizar el producto.',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-2xl font-bold font-display text-secondary">
        Editar Producto
      </h1>
      <p class="text-sm text-tertiary font-secondary">
        Modifica los detalles del producto #{{ productId }}
      </p>
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
      title="Error de carga"
      description="No se pudo encontrar el producto solicitado."
    />

    <div v-else-if="pending" class="flex justify-center p-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary"
      />
    </div>

    <UCard v-else :ui="{ body: 'bg-secondary' }">
      <ProductsProductForm
        :initial-data="product || undefined"
        :is-loading="isSaving"
        @submit="handleUpdate"
      />
    </UCard>
  </div>
</template>
