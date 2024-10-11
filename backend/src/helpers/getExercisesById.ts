import { getSelectedExercises } from "@/repositories/SelectedExercisesRepository";

export async function getSelectedExercisesNumbers(user_id: number) {
  const exercises = await getSelectedExercises(user_id)

  const exerciseIdNumbers = [] as number[]

  for (let index = 0; index < exercises.length; index++) {
    exerciseIdNumbers.push(exercises[index].exercise_id)
  }
  return exerciseIdNumbers
}
