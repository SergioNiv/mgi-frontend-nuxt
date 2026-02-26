import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '~~/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const total = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const toast = useToast()

  const fetchProducts = async (page = 1, limit = 10, searchQuery = '') => {
    isLoading.value = true
    error.value = null
    const skip = (page - 1) * limit

    try {
      const endpoint = searchQuery 
        ? 'https://dummyjson.com/products/search' 
        : 'https://dummyjson.com/products'
      const token = useCookie('auth_token').value

      const response = await $fetch<{ products: Product[], total: number }>(endpoint, {
        method: 'GET',
        query: {
          skip,
          limit,
          q: searchQuery || undefined
        },
        headers: token ? {
          Authorization: `Bearer ${token}`
        } : {}
      })

      products.value = response.products
      total.value = response.total

    } catch (err: unknown) {
      error.value = 'No se pudieron cargar los productos'
      toast.add({
        title: 'Error de conexión',
        description: error.value,
        color: 'error'
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    total,
    isLoading,
    error,
    fetchProducts
  }
})