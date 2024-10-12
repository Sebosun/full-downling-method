import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
  id: number
  username: string
  created_at: string
  updated_at: string
}

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>('')

  const isLoggedIn = computed(() => !!token.value)

  return {
    token,
    isLoggedIn
  }
})
