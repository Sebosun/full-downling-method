import { useUserStore } from "~/store/userStore"

const nonAuthRoutes = ['/', '/register']
export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore()
  const { isLoggedIn } = storeToRefs(useUserStore())

  if (!isLoggedIn.value) {
    store.getLocalStorageToken()
  }

  if (!isLoggedIn.value && !nonAuthRoutes.includes(to.path)) {
    return navigateTo('/')
  }

  if (to.path === "/" && isLoggedIn.value) {
    return '/exercises'
  }
})
