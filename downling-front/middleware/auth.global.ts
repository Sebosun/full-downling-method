import { useUserStore } from "~/store/userStore"

export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore()
  const { isLoggedIn } = storeToRefs(useUserStore())

  if (!isLoggedIn.value) {
    store.getLocalStorageToken()
  }

  if (!isLoggedIn.value && to.path !== "/") {
    return navigateTo('/')
  }

  if (to.path === "/" && isLoggedIn.value) {
    return '/exercises'
  }
})
