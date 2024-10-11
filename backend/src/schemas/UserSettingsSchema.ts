import { z } from "zod";

export const SelectedExercisesSchema = z.object({
  exercises: z.array(z.object({
    exercise_id: z.number(),
    selected: z.boolean(),
  }))
})
