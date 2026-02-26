<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '~/stores/products'
import type { TableColumn } from '@nuxt/ui'
import type { Product } from '~~/types'
import { resolveComponent } from 'vue'

const productsStore = useProductsStore()
const { products, total, isLoading } = storeToRefs(productsStore)

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      class: {
        th: 'hidden md:table-cell',
        td: 'hidden md:table-cell',
      },
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(resolveComponent('UButton'), {
        color: 'neutral',
        variant: 'ghost',
        label: 'Producto',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    meta: {
      class: {
        th: 'hidden xs:table-cell',
        td: 'hidden xs:table-cell',
      },
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(resolveComponent('UButton'), {
        color: 'neutral',
        variant: 'ghost',
        label: 'Precio',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
    meta: {
      class: {
        th: 'hidden md:table-cell',
        td: 'hidden md:table-cell',
      },
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(resolveComponent('UButton'), {
        color: 'neutral',
        variant: 'ghost',
        label: 'Stock',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
    meta: {
      class: {
        th: 'hidden lg:table-cell',
        td: 'hidden lg:table-cell',
      },
    },
  },
  {
    accessorKey: 'availabilityStatus',
    header: 'Estado',
    meta: {
      class: {
        th: 'hidden lg:table-cell',
        td: 'hidden lg:table-cell',
      },
    },
  },
  { accessorKey: 'actions', header: 'Ver' },
]

const loadData = async () => {
  await productsStore.fetchProducts(
    currentPage.value,
    itemsPerPage,
    searchQuery.value
  )
}

let timeout: ReturnType<typeof setTimeout>

const onSearch = () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    currentPage.value = 1
    loadData()
  }, 500)
}

watch(currentPage, () => {
  console.log('Cambiando página', currentPage.value)
  loadData()
})

onMounted(() => {
  loadData()
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock': return 'success'
    case 'Low Stock': return 'warning'
    case 'Out of Stock': return 'error'
    default: return 'neutral'
  }
}

const viewDetails = (row: any) => {
  navigateTo(`/products/${row.original.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold font-display text-secondary">
          Gestión de Productos
        </h1>
        <p class="text-sm text-tertiary font-secondary">
          Visualiza y filtra el catálogo de DummyJSON
        </p>
      </div>

      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Buscar productos..."
        @update:model-value="onSearch"
        class="w-full md:max-w-100"
        :ui="{ base: 'bg-secondary py-3' }"
      />
    </div>

    <UCard :ui="{ body: 'p-0 bg-secondary', footer: 'bg-secondary' }">
      <UTable
        :ui="{ root: 'bg-secondary' }"
        :data="products"
        :columns="columns"
        :loading="isLoading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path',
          label: 'Cargando productos...',
        }"
      >
        <template #title-cell="{ row }">
          <div class="flex items-center gap-2">
            <NuxtImg
              :src="row.original.thumbnail"
              alt="Avatar"
              class="rounded-full w-10 h-10"
            />
            <span class="font-medium text-white-off truncate w-full">
              {{ row.original.title }}
            </span>
          </div>
        </template>

        <template #price-cell="{ row }">
          <span class="font-medium text-white-off">
            ${{ row.original.price.toFixed(2) }}
          </span>
        </template>

        <template #category-cell="{ row }">
          <UBadge variant="subtle" color="primary" class="capitalize">
            {{ row.original.category }}
          </UBadge>
        </template>

        <template #availabilityStatus-cell="{ row }">
          <UBadge
            :color="getStatusColor(row.getValue('availabilityStatus'))"
            variant="subtle"
            class="capitalize"
          >
            {{ row.getValue('availabilityStatus') }}
          </UBadge>
        </template>

        <template #actions-cell="{ row }">
          <UButton
            icon="i-heroicons-eye"
            size="xs"
            variant="ghost"
            color="neutral"
            @click="viewDetails(row)"
          />
        </template>
      </UTable>

      <template #footer>
        <div
          class="flex justify-between items-center px-4 py-2 md:flex-row flex-col gap-2"
        >
          <span class="text-xs text-tertiary">
            Mostrando {{ products.length }} de {{ total }} resultados
          </span>
          <UPagination
            v-model:page="currentPage"
            :total="total"
            :page-count="itemsPerPage"
            :disabled="isLoading"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
