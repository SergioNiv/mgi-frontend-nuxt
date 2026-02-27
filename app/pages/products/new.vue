<script setup lang="ts">
import type { Product } from '~~/types'

const toast = useToast()
const isSaving = ref(false)

const handleCreate = async (formData: Product) => {
  isSaving.value = true

  try {
    const response = await $fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      body: formData,
    })

    console.log('Producto creado:', response)

    toast.add({
      title: '¡Éxito!',
      description: 'El producto ha sido creado correctamente.',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })

    navigateTo('/products')
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'Hubo un problema al crear el producto.',
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
        Crear Nuevo Producto
      </h1>
      <p class="text-sm text-tertiary font-secondary">
        Completa los datos para agregar un producto al catálogo.
      </p>
    </div>

    <UCard :ui="{ body: 'bg-secondary' }">
      <ProductsProductForm :is-loading="isSaving" @submit="handleCreate" />
    </UCard>
  </div>
</template>
