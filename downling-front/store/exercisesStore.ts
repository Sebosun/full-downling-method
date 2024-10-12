import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AllExercises, Exercise, ExerciseQuestion } from '~/types/ExerciseTypes';

const API_LINK = "http://localhost:3000";
interface SaveExercises {
  exercises: {
    selected: boolean
    exercise_id: number
  }[]
}

export const useExerciseStore = defineStore('exercisesStore', () => {
  const correct = ref(0)
  const wrong = ref(0)
  const perfect = ref(0)
  const currentExercise = ref<ExerciseQuestion | null>(null);
  const showAnswer = ref<boolean>(false);
  const questioAnswer = ref('');
  const allExercises = ref<AllExercises | null>(null);

  const user = useUserStore()
  const { token } = storeToRefs(user)

  const getRandomExercise = async (): Promise<void> => {
    try {
      currentExercise.value = await $fetch<ExerciseQuestion>(API_LINK + "/exercise/random/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
    } catch (e) {
      console.error(e)
    }
  }

  const fetchCorrectAnswer = async () => {
    if (!currentExercise?.value) return

    try {
      const response = await $fetch<Exercise>(API_LINK + `/exercise/${currentExercise.value?.id}`, {
        method: "GET",
      });
      showAnswer.value = true
      questioAnswer.value = response.answer
    } catch (e) {
      console.error(e)
    }
  }

  async function getExercises(): Promise<void> {
    try {
      allExercises.value = await $fetch<AllExercises>(API_LINK + "/exercise/all", {
        method: "GET",
      });
    } catch (e) {
      console.error(e)
    }
  }


  async function saveSelectedExercises(body: SaveExercises): Promise<void> {
    try {
      await $fetch<AllExercises>(API_LINK + "/user/settings", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: body
      });
    } catch (e) {
      console.error(e)
    }
  }

  return {
    currentExercise,
    getRandomExercise,
    getExercises,
    correct,
    wrong,
    perfect,
    questioAnswer,
    showAnswer,
    fetchCorrectAnswer,
    allExercises,
    saveSelectedExercises
  }
})
