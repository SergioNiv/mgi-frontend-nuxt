import type { FormError } from '@nuxt/ui'
import type { Product } from '~~/types'

export const validateLoginForm = (state: {
  username?: string
  password?: string
}): FormError[] => {
  const errors: FormError[] = []

  if (!state.username) {
    errors.push({ name: 'username', message: 'El usuario es obligatorio' })
  }

  if (!state.password) {
    errors.push({ name: 'password', message: 'La contraseña es obligatoria' })
  }

  return errors
}

export const validateProductForm = (state: Product): FormError[] => {
  const errors: FormError[] = []

  if (!state.title) {
    errors.push({ name: 'title', message: 'El nombre es obligatorio' })
  }

  if (!state.category) {
    errors.push({ name: 'category', message: 'La categoría es obligatoria' })
  }

  if (Number(state.price) <= 0) {
    errors.push({ name: 'price', message: 'El precio debe ser mayor a 0' })
  }

  if (Number(state.stock) < 0) {
    errors.push({ name: 'stock', message: 'El stock no puede ser negativo' })
  }

  if (!state.description) {
    errors.push({
      name: 'description',
      message: 'La descripción es obligatoria',
    })
  }

  return errors
}
