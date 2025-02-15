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

  return $fetch<T>(url, {
    ...options,
    headers: {
      Authorization: userStore.token ? `Bearer ${userStore.token}` : '',
      ...options?.headers,
    },
  })
}
