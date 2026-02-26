export default defineNuxtRouteMiddleware((to, _from) => {
  const token = useCookie('auth_token')
  const isPublicRoute = to.path === '/login'

  if (!token.value && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (token.value && isPublicRoute) {
    return navigateTo('/products')
  }
})
