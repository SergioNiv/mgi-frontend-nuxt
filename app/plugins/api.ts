import ProductRepository from '~/repositories/ProductRepository'
import AuthRepository from '~/repositories/AuthRepository'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl as string,

    onRequest({ options }) {
      const authStore = useAuthStore()

      if (authStore.token) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${authStore.token}`)
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        console.warn(
          'Sesión expirada o no autorizada. Redirigiendo al login...'
        )
      }
    },
  })

  const modules = {
    products: new ProductRepository(apiFetcher),
    auth: new AuthRepository(apiFetcher),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
