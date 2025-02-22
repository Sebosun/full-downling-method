import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const $api = async <
  DefaultT = unknown,
  DefaultR extends NitroFetchRequest = NitroFetchRequest,
  T = DefaultT,
  R extends NitroFetchRequest = DefaultR,
  O extends NitroFetchOptions<R> = NitroFetchOptions<R>,
>(
  url: R,
  options?: O,
) => {
  const userStore = useUserStore()
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiBase

  return $fetch<T>(url, {
    ...options,
    baseURL: baseURL,
    headers: {
      Authorization: userStore.token ? `Bearer ${userStore.token}` : '',
      ...options?.headers,
    },
  })
}
