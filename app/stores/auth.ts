import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '~~/types'
import type { FetchError } from 'ofetch'

interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

interface ApiErrorResponse {
  message?: string
}
export const useAuthStore = defineStore(
  'auth',
  () => {
    const tokenCookie = useCookie<string | null>('auth_token', {
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    const token = ref<string | null>(tokenCookie.value || null)
    const user = ref<User | null>(null)

    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const router = useRouter()
    const toast = useToast()

    const login = async (credentials: LoginCredentials) => {
      isLoading.value = true
      error.value = null

      try {
        const response = await $fetch<User>(
          'https://dummyjson.com/auth/login',
          {
            method: 'POST',
            body: credentials,
          }
        )

        if (response && response.accessToken) {
          token.value = response.accessToken
          user.value = response
          tokenCookie.value = response.accessToken

          toast.add({
            title: '¡Autenticación exitosa!',
            description: `Bienvenido de nuevo, ${response.firstName}`,
            color: 'success',
          })

          await router.push('/products')
        }
      } catch (err: unknown) {
        const e = err as FetchError<ApiErrorResponse>

        error.value = e.data?.message || 'Error al iniciar sesión'

        toast.add({
          title: 'Error de acceso',
          description: error.value || 'Revisa tus credenciales',
          color: 'error',
        })
      } finally {
        isLoading.value = false
      }
    }

    const logout = () => {
      token.value = null
      user.value = null
      tokenCookie.value = null

      router.push('/login')
    }

    return {
      token,
      user,
      isLoading,
      error,
      login,
      logout,
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      key: 'auth_user',
      pick: ['user'],
    },
  }
)
