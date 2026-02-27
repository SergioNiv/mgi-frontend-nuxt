import type { Product } from '~~/types'

interface TableRow {
  original: Product
}

export const useProductActions = (products: Ref<Product[]>) => {
  const toast = useToast()

  const isDeleteModalOpen = ref(false)
  const productToDelete = ref<Product | null>(null)
  const isDeleting = ref(false)

  const promptDelete = (row: TableRow) => {
    productToDelete.value = row.original
    isDeleteModalOpen.value = true
  }

  const executeDelete = async () => {
    if (!productToDelete.value) return

    isDeleting.value = true

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productToDelete.value.id}`,
        {
          method: 'DELETE',
        }
      )

      if (response.status === 200) {
        products.value = products.value.filter(
          (product) => product.id !== productToDelete.value?.id
        )
        toast.add({
          title: 'Producto eliminado',
          description: `Se eliminó "${productToDelete.value.title}" correctamente.`,
          color: 'success',
          icon: 'i-heroicons-check-circle',
        })
      } else {
        toast.add({
          title: 'Error',
          description: 'No se pudo eliminar el producto.',
          color: 'error',
          icon: 'i-heroicons-x-circle',
        })
      }
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast.add({
        title: 'Error',
        description: 'No se pudo eliminar el producto.',
        color: 'error',
        icon: 'i-heroicons-x-circle',
      })
    } finally {
      isDeleting.value = false
      isDeleteModalOpen.value = false
      productToDelete.value = null
    }
  }

  const viewDetails = (row: TableRow) => {
    navigateTo(`/products/${row.original.id}`)
  }

  const editProduct = (row: TableRow) => {
    navigateTo(`/products/${row.original.id}/edit`)
  }

  return {
    isDeleteModalOpen,
    productToDelete,
    isDeleting,
    promptDelete,
    executeDelete,
    viewDetails,
    editProduct,
  }
}
