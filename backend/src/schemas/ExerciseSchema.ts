import { z } from "zod";

export const ExerciseAnswerSchema = z.object({
  id: z.number(),
  answer: z.string().min(2)
})
