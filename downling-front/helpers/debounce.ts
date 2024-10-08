export const debounce = (fn: () => any, waitTime: number = 1000): () => void => {
  let timeoutId: ReturnType<typeof setTimeout>

  const timeoutFunction = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(), waitTime)
  }

  return timeoutFunction
}
