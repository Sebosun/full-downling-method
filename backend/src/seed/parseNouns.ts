import noun_conjugations from './noun_conjugations.json'
import type { ExerciseFill } from '@/types/ExerciseTypes'
import { determiners, declension } from '@/types/ExerciseTypes'

export function parseNouns() {
    const acc = [] as ExerciseFill[]

    declension.forEach((declension) => {
        const nouns = noun_conjugations.nouns[declension]
        nouns.forEach((noun) => {
            determiners.forEach(number => {
                const word = noun.word
                acc.push({
                    question: `${number} nominative for ${word}`,
                    case: 'nominative',
                    base_word: noun.word,
                    gender: noun.gender,
                    number: number,
                    declension: declension,
                    answer: noun.conjugations[number].nominative
                })

                acc.push({
                    question: `${number} genetive for ${word}`,
                    case: 'genetive',
                    base_word: noun.word,
                    gender: noun.gender,
                    declension: declension,
                    number: number,
                    answer: noun.conjugations[number].genetive
                })

                acc.push({
                    question: `${number} dative for ${word}`,
                    case: 'dative',
                    base_word: noun.word,
                    gender: noun.gender,
                    declension: declension,
                    number: number,
                    answer: noun.conjugations[number].dative
                })

                acc.push({
                    question: `${number} accusative for ${word}`,
                    case: 'accusative',
                    base_word: noun.word,
                    gender: noun.gender,
                    declension: declension,
                    number: number,
                    answer: noun.conjugations[number].accusative
                })

                acc.push({
                    question: `${number} ablative for ${word}`,
                    case: 'ablative',
                    base_word: noun.word,
                    gender: noun.gender,
                    declension: declension,
                    number: number,
                    answer: noun.conjugations[number].ablative
                })
            })
        })
    })
    return acc
}
