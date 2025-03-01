export const sanitizeLatin = (answer: string): string => {
  return answer
    .replace(/ā/g, 'a')
    .replace(/ō/g, 'o')
    .replace(/ī/g, 'i')
    .replace(/ē/g, 'e')
    .replace(/ū/g, 'u')
}
