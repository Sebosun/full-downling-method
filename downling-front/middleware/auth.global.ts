import { useUserStore } from '~/store/userStore'

// TODO: There has to be a better way of doing this
const noAuthRoutes = [] as string[]
export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore()
  const { isLoggedIn } = storeToRefs(useUserStore())

  if (!isLoggedIn.value) {
    store.getLocalStorageToken()
  }

  if (!isLoggedIn.value && noAuthRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
