export interface Exercise {
  id: number;
  question: string;
  answer: string;
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
