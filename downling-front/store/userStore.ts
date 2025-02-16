import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { decodeJWT } from '@/helpers/decodeJWT'

export interface Settings {
  selected: number[]
}

export const useUserStore = defineStore('userStore', () => {
  const runtimeConfig = useRuntimeConfig()
  const API_LINK = runtimeConfig.public.apiBase

  const exerciseStore = useExerciseStore()
  const { selectedExs } = storeToRefs(exerciseStore)
  const token = ref<string>('')
  const isLoggedIn = computed(() => !!token.value)
  const settings = ref<Settings | null>(null)

  const fetchSettings = async () => {
    try {
      const response = await $api<Settings>(API_LINK + '/user/exercises', {
        method: 'GET',
      })
      selectedExs.value = response.selected
      settings.value = response
    }
    catch (e) {
      console.error(e)
    }
  }

  const hasLoadedSettings = computed(() => {
    return settings.value !== null
  })

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
    fetchSettings,
    hasLoadedSettings,
    saveToken,
    logout,
  }
})
