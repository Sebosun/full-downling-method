import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AllExercises, Exercise, ExerciseQuestion } from '~/types/ExerciseTypes';
import { $api } from '~/composables/api';

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

  const getRandomExercise = async (): Promise<void> => {
    try {
      currentExercise.value = await $api<ExerciseQuestion>(API_LINK + "/exercise/random/user", {
        method: "GET",
      });
    } catch (e) {
      console.error(e)
    }
  }

  const fetchCorrectAnswer = async () => {
    if (!currentExercise?.value) return

    try {
      const response = await $api<Exercise>(API_LINK + `/exercise/${currentExercise.value?.id}`, {
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
      allExercises.value = await $api<AllExercises>(API_LINK + "/exercise/all", {
        method: "GET",
      });
    } catch (e) {
      console.error(e)
    }
  }

  const saveSelectedExercises = async (body: SaveExercises): Promise<void> => {
    try {
      await $api<AllExercises>(API_LINK + "/user/settings", {
        method: "PATCH",
        body: body
      });
      getRandomExercise()
    } catch (e) {
      console.error(e)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await $api<ExerciseSetting[]>(API_LINK + "/user/settings", {
        method: "GET",
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
