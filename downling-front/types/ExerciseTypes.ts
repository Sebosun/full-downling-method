export interface Exercise {
  id: number;
  question: string;
  base_word: string
  type: string
  gender: string
  created_at: Date;
  updated_at: Date;
}

export interface AnswerResponse {
  correct: boolean
}

export interface ExerciseQuestion {
  id: number;
  question: string;
}
