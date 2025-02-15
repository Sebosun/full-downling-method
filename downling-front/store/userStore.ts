import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { decodeJWT } from '@/helpers/decodeJWT'

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>('')

  const isLoggedIn = computed(() => !!token.value)

  const getLocalStorageToken = () => {
    const localStorageToken = localStorage.getItem('token')
    if (!localStorageToken) return

    const decoded = decodeJWT(localStorageToken)
    if (!decoded) return
    const expirationDate = new Date(Number(decoded?.exp) * 1000)
    const curDate = new Date()

    if (curDate > expirationDate) {
      return
    }

    token.value = localStorageToken
  }

  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    navigateTo('/')
  }

  const saveToken = (tkn: string) => {
    localStorage.setItem('token', tkn)
    token.value = tkn
  }

  return {
    token,
    isLoggedIn,
    getLocalStorageToken,
    saveToken,
    logout,
  }
})
