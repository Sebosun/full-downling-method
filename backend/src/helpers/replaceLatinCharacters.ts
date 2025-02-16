const specialLatinLetters = ['ā', 'ō', 'ī', 'ē', 'ū'] as const
const replacements = ['a', 'o', 'i', 'e', 'u'] as const

/**
 * Replaces special latin characters with their equivalents
 * @param {string} sentence
 * @returns {string}
 */
export function replaceLatinCharacters(sentence: string): string {
    specialLatinLetters.forEach((item, idx) => {
        sentence = sentence.replaceAll(item, replacements[idx])
    })
    return sentence
}
