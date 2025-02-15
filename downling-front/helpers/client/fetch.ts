import type { LoginForm } from '@/types/UserTypes'

const runtimeConfig = useRuntimeConfig()
const API_LINK = runtimeConfig.public.apiBase

export const login = async (form: LoginForm) =>
  $fetch<{ token: string }>(API_LINK + '/login', {
    method: 'POST',
    body: form,
  })

export const register = async (form: LoginForm) =>
  $fetch<{ token: string }>(API_LINK + '/register', {
    method: 'POST',
    body: form,
  })
