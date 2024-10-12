import { getSelectedExercises } from "@/repositories/SelectedExercisesRepository";

export async function getSelectedExercisesNumbers(user_id: number) {
  return await getSelectedExercises(user_id)
}
