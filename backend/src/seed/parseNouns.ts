import noun_conjugations from './noun_conjugations.json'

export function parseNouns() {
  const keys = ['first', 'second', 'third', 'fourth', 'fifth'] as const
  const acc = [] as { question: string, answer: string }[]

  keys.forEach(key => {
    const nouns = noun_conjugations.nouns[key]
    const cases = ['singular', 'plural'] as const
    nouns.forEach(noun => {
      cases.forEach(item => {
        const word = noun.word
        acc.push({
          question: `${item} nominative for ${word}`,
          answer: noun.conjugations[item].nominative
        })

        acc.push({
          question: `${item} genetive for ${word}`,
          answer: noun.conjugations[item].genetive
        })

        acc.push({
          question: `${item} dative for ${word}`,
          answer: noun.conjugations[item].dative
        })

        acc.push({
          question: `${item} accusative for ${word}`,
          answer: noun.conjugations[item].accusative
        })

        acc.push({
          question: `${item} ablative for ${word}`,
          answer: noun.conjugations[item].ablative
        })
      })
    })
  })
  return acc
}
