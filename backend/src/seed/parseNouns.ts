import dupa from './noun_conjugations.json'

export function parseNouns() {
  const keys = ['first', 'second', 'third', 'fourth', 'fifth'] as const
  const acc = [] as { question: string, answer: string }[]

  keys.forEach(key => {
    const nouns = dupa.nouns[key]
    nouns.forEach(noun => {
      const word = noun.word
      acc.push({
        question: `Conjugation for ${word} in nominative`,
        answer: noun.conjugations.plural.nominative
      })

      acc.push({
        question: `Conjugation for ${word} in dative`,
        answer: noun.conjugations.plural.dative
      }
      )

      acc.push({
        question: `Conjugation for ${word} in ablative`,
        answer: noun.conjugations.plural.ablative
      }
      )

      acc.push({
        question: `Conjugation for ${word} in accusative`,
        answer: noun.conjugations.plural.accusative
      }
      )

      acc.push({
        question: `Conjugation for ${word} in genetive`,
        answer: noun.conjugations.plural.genetive
      }
      )
    })
  })
  return acc


}
