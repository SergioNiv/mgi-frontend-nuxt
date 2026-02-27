import { describe, it, expect } from 'vitest'
import { validateLoginForm } from '~/utils/validations'

describe('LoginForm - Logic Validation', () => {
  it('debería retornar error si el usuario o contraseña están vacíos', () => {
    const state = {
      username: '',
      password: '',
    }

    const errors = validateLoginForm(state)

    expect(errors).toContainEqual(expect.objectContaining({ name: 'username' }))
    expect(errors).toContainEqual(expect.objectContaining({ name: 'password' }))
  })

  it('debería retornar error solo en el campo faltante', () => {
    const state = {
      username: 'emilys',
      password: '',
    }

    const errors = validateLoginForm(state)

    expect(errors).toContainEqual(expect.objectContaining({ name: 'password' }))
    expect(errors).not.toContainEqual(expect.objectContaining({ name: 'username' }))
  })

  it('debería pasar la validación con credenciales completas', () => {
    const state = {
      username: 'emilys',
      password: 'emilyspass',
    }

    const errors = validateLoginForm(state)

    expect(errors.length).toBe(0)
  })
})