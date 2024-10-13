import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AllExercises, Exercise, ExerciseQuestion } from '~/types/ExerciseTypes';

interface ExerciseSetting {
  selected: boolean
  exercise_id: number
}
interface SaveExercises {
  exercises: ExerciseSetting[]
}

export const useExerciseStore = defineStore('exercisesStore', () => {
  const runtimeConfig = useRuntimeConfig()
  const API_LINK = runtimeConfig.public.apiBase;

  const correct = ref(0)
  const wrong = ref(0)
  const perfect = ref(0)
  const currentExercise = ref<ExerciseQuestion | null>(null);
  const showAnswer = ref<boolean>(false);
  const questionAnswer = ref('');
  const allExercises = ref<AllExercises | null>(null);
  const selectedExs = ref<number[]>([])

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
      questionAnswer.value = response.answer
    } catch (e) {
      console.error(e)
    }
  }

  const getExercises = async (): Promise<void> => {
    try {
      allExercises.value = await $fetch<AllExercises>(API_LINK + "/exercise/all", {
        method: "GET",
      });
    } catch (e) {
      console.error(e)
    }
  }

  const saveSelectedExercises = async (body: SaveExercises): Promise<void> => {
    try {
      await $fetch<AllExercises>(API_LINK + "/user/settings", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: body
      });
      getRandomExercise()
    } catch (e) {
      console.error(e)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await $fetch<ExerciseSetting[]>(API_LINK + "/user/settings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`
        },
      });
      selectedExs.value = response.filter(item => item.selected).map(item => item.exercise_id)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    currentExercise,
    getRandomExercise,
    selectedExs,
    getExercises,
    correct,
    wrong,
    perfect,
    questionAnswer,
    showAnswer,
    fetchCorrectAnswer,
    allExercises,
    saveSelectedExercises,
    fetchSettings,
  }
})
