import { useUserStore } from "~/store/userStore"

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useUserStore()

  if (!isLoggedIn && to.path !== "/") {
    return navigateTo('/')
  }

  if (to.path === "/" && isLoggedIn) {
    return '/exercises'
  }
})
