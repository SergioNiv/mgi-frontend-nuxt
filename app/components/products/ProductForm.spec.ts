import { describe, it, expect } from 'vitest'
import { validateProductForm } from '~/utils/validations'
import type { Product } from '~~/types' // Importamos tu tipo

describe('ProductForm - Logic Validation', () => {
  it('debería retornar error si los campos obligatorios están vacíos', () => {
    const state = {
      title: '',
      price: 0,
      category: '',
      description: '',
    } as Product

    const errors = validateProductForm(state)

    expect(errors).toContainEqual(expect.objectContaining({ name: 'title' }))
    expect(errors).toContainEqual(expect.objectContaining({ name: 'price' }))
  })

  it('debería pasar la validación con datos correctos', () => {
    const state = {
      title: 'Zapatillas Trekking',
      price: 150,
      category: 'shoes',
      description: 'Zapatillas de alta resistencia',
    } as Product

    const errors = validateProductForm(state)

    expect(errors.length).toBe(0)
  })
})
