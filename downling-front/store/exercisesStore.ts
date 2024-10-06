import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Exercise, ExerciseQuestion } from '~/types/ExerciseTypes';

const API_LINK = "http://localhost:3000";
export const useExerciseStore = defineStore('exercisesStore', () => {
  const correct = ref(0)
  const wrong = ref(0)
  const perfect = ref(0)
  const currentExercise = ref<ExerciseQuestion | null>(null);
  const showAnswer = ref<boolean>(false);
  const questioAnswer = ref('');
  const allExercises = ref<Exercise[] | null>(null);

  const getRandomExercise = async (): Promise<void> => {
    try {
      currentExercise.value = await $fetch<ExerciseQuestion>(API_LINK + "/exercise/random", {
        method: "GET",
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
      allExercises.value = await $fetch<Exercise[]>(API_LINK + "/exercise/all", {
        method: "GET",
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
    allExercises
  }
})
