export interface Exercise {
  id: number
  question: string
  answer: string
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
  id: number;
  question: string;
}

export interface AllExercises {
  first: ExerciseByGroup[]
  second: ExerciseByGroup[]
  third: ExerciseByGroup[]
  fourth: ExerciseByGroup[]
  fifth: ExerciseByGroup[]
}

export interface ExerciseByGroup {
  name: string
  gender: string
  part_of_speech: string
  singular: Exercise[]
  plural: Exercise[]
}

