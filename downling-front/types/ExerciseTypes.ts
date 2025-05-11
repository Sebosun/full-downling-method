export interface Exercise {
  id: number
  question: string
  answer: string
  case: string
  created_at: string
  updated_at: string
  base_word: string
  gender: string
  declension: string
  number: string
}

export interface AnswerResponse {
  correct: boolean
}

export interface ExerciseQuestion {
  id: number
  question: string
  case: string
  number: string
  base_word: string
}

export interface NounExercises {
  first: NounExerciseByGroup[]
  second: NounExerciseByGroup[]
  third: NounExerciseByGroup[]
  fourth: NounExerciseByGroup[]
  fifth: NounExerciseByGroup[]
}

export interface NounExerciseByGroup {
  name: string
  gender: string
  part_of_speech: string
  singular: Exercise[]
  plural: Exercise[]
}
