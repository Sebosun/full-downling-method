import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { decodeJWT } from '@/helpers/decodeJWT'

// User settings should work with users that are not logged in
export interface BaseSettings {
  exercises: number[]
  settings: {
    easy_mode: boolean
  }
}

export interface LoggedInSettings extends BaseSettings {
  user?: {
    id: number
    username: string
    created_at: string
    updated_at: string
  }
}

type Settings = BaseSettings | LoggedInSettings

export const useUserStore = defineStore('userStore', () => {
  const exerciseStore = useExerciseStore()
  const { selectedExs } = storeToRefs(exerciseStore)

  const token = ref<string>('')
  const isLoggedIn = computed(() => !!token.value)
  const user = ref<Settings>({
    exercises: [],
    settings: {
      easy_mode: false,
    },
  })

  const hasEasyModeEnabled = computed(() => {
    return user.value.settings.easy_mode
  })

  const fetchExercisesSettings = async () => {
    try {
      const response = await $api<Settings>('/user', {
        method: 'GET',
      })
      selectedExs.value = response.exercises
      user.value = response
    }
    catch (e) {
      console.error(e)
    }
  }

  const hasLoadedSettings = computed(() => {
    return user.value !== null
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
    user,
    isLoggedIn,
    getLocalStorageToken,
    fetchExercisesSettings,
    hasEasyModeEnabled,
    hasLoadedSettings,
    saveToken,
    logout,
  }
})
