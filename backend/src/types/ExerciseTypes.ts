export interface ExerciseFill {
  question: string,
  answer: string
  base_word: string
  number: NumberKeys
  declension: DeclensionKeys
  gender: string
}

export const cases = ['singular', 'plural'] as const
export const declension = ['first', 'second', 'third', 'fourth', 'fifth'] as const

export type NumberKeys = typeof cases[number]
export type DeclensionKeys = typeof declension[number]

export type ExercisesByGrammaticalNumber = {
  [key in NumberKeys]: ExerciseFill[]
}

export type ConjugationWords = {
  [key: string]: ExercisesByGrammaticalNumber
}

export type AllExercisesResponse = {
  [key in DeclensionKeys]: ConjugationWords
}
/* { */
/*   first: { */
/*     rosa: { */
/*       singular: */
/*       plural: */
/*     } */
/*     dupa:  */
/*   } */
/* } */
/**/
