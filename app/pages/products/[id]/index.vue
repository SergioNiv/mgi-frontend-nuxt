<script setup lang="ts">
import type { Product } from '~~/types'

const route = useRoute()
const mainImage = ref('')

const { data: product, status } = await useFetch<Product>(
  `https://dummyjson.com/products/${route.params.id}`,
  {
    key: `product-${route.params.id}`,
  }
)

if (!product.value) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}

useSeoMeta({
  title: () =>
    product.value
      ? `${product.value.title} | MGi Store`
      : 'Cargando producto...',
  ogTitle: () => product.value?.title,
  description: () => product.value?.description,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.thumbnail,
  twitterCard: 'summary_large_image',
})

const getStatusColor = (status: string) => {
  if (status === 'In Stock') return 'text-success'
  if (status === 'Low Stock') return 'text-warning'
  return 'text-error'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div>
      <UButton
        to="/products"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="secondary"
        class="-ms-2.5"
      >
        Volver al listado
      </UButton>
    </div>

    <CommonAppLoader
      v-if="status === 'pending'"
      message="Obteniendo detalles del producto..."
    />

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <div
          class="aspect-square bg-secondary rounded-xl overflow-hidden border border-white-off/10"
        >
          <NuxtImg
            :src="mainImage || product.thumbnail"
            class="w-full h-full object-contain p-4"
            :alt="product.title"
          />
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            class="w-20 h-20 shrink-0 border-2 rounded-lg overflow-hidden bg-secondary"
            :class="mainImage === img ? 'border-primary' : 'border-transparent'"
            @click="mainImage = img"
          >
            <NuxtImg :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <UBadge variant="subtle" color="primary" class="capitalize">
              {{ product.category }}
            </UBadge>
            <span class="text-xs text-tertiary">SKU: {{ product.sku }}</span>
          </div>
          <h1 class="text-4xl font-bold font-display uppercase tracking-tight">
            {{ product.title }}
          </h1>
          <p class="text-tertiary text-lg mt-2 font-secondary leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <div class="flex items-end gap-4">
          <span class="text-3xl font-bold text-primary"
            >${{ product.price }}</span
          >
          <span
            v-if="product.discountPercentage"
            class="text-sm text-success font-medium mb-1"
          >
            {{ product.discountPercentage }}% OFF
          </span>
        </div>

        <UCard :ui="{ body: 'p-4 bg-secondary/50' }">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="block text-xs text-tertiary uppercase font-bold"
                >Estado</span
              >
              <span
                :class="getStatusColor(product.availabilityStatus)"
                class="font-medium"
              >
                {{ product.availabilityStatus }}
              </span>
            </div>
            <div>
              <span class="block text-xs text-tertiary uppercase font-bold"
                >Stock</span
              >
              <span class="text-white-off font-medium"
                >{{ product.stock }} unidades</span
              >
            </div>
          </div>
        </UCard>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-white-off/10 pt-6"
        >
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-truck" class="text-primary w-5 h-5" />
            <span class="text-tertiary">{{ product.shippingInformation }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-shield-check"
              class="text-primary w-5 h-5"
            />
            <span class="text-tertiary">{{ product.warrantyInformation }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-arrow-path-rounded-square"
              class="text-primary w-5 h-5"
            />
            <span class="text-tertiary">{{ product.returnPolicy }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-tag" class="text-primary w-5 h-5" />
            <span class="text-tertiary">Marca: {{ product.brand }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="product?.reviews?.length"
      class="mt-12 border-t border-white-off/10 pt-8"
    >
      <h3 class="text-xl font-bold mb-6">Opiniones de clientes</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard
          v-for="(review, index) in product.reviews"
          :key="index"
          :ui="{ body: 'p-4 bg-secondary' }"
        >
          <div class="flex items-center gap-1 mb-2">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons-star"
              :class="
                i <= review.rating ? 'text-yellow-400' : 'text-tertiary/30'
              "
              class="w-4 h-4 shadow-sm"
            />
          </div>
          <p class="text-sm text-white-off italic mb-3">
            "{{ review.comment }}"
          </p>
          <div class="text-xs text-tertiary">
            <span class="font-bold text-white-off">{{
              review.reviewerName
            }}</span>
            <span class="block">{{ formatDate(review.date) }}</span>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
