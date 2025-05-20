import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import type { NounExercises, Exercise, ExerciseQuestion } from '~/types/ExerciseTypes'
import { $api } from '~/composables/api'
import { useUserStore } from '~/store/userStore'

interface ExerciseSetting {
  selected: boolean
  exercise_id: number
}

interface SaveExercises {
  exercises: ExerciseSetting[]
}

export const useExerciseStore = defineStore('exercisesStore', () => {
  const correct = ref(0)
  const wrong = ref(0)
  const perfect = ref(0)
  const attempts = ref(0)
  const currentExercise = ref<ExerciseQuestion | null>(null)
  const showAnswer = ref<boolean>(false)
  const questionAnswer = ref('')
  const allExercises = ref<NounExercises | null>(null)
  const selectedExs = ref<number[]>([])
  const router = useRouter()

  const authFetchRandomEx = async (): Promise<void> => {
    try {
      currentExercise.value = await $api<ExerciseQuestion>('/exercise/random/user', {
        method: 'GET',
      })
    }
    catch (e) {
      if (e instanceof FetchError) {
        // likely could use some keys instead of string comps
        if (e.data?.message === 'User has no settings set') {
          router.push('/settings')
        }
        return
      }
      console.error(e)
    }
  }
  const fetchRandomEx = async (): Promise<void> => {
    if (!selectedExs.value.length) {
      console.error('Fetch error!: No exercises selected')
      return
    }

    try {
      const randomExerciseId = selectedExs.value[Math.floor(Math.random() * selectedExs.value.length)]
      currentExercise.value = await $api<ExerciseQuestion>(`/exercise/${randomExerciseId}/question`, {
        method: 'GET',
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  const getRandomExercise = async (): Promise<void> => {
    const userStore = useUserStore()
    if (userStore.isLoggedIn) {
      await authFetchRandomEx()
      return
    }

    fetchRandomEx()
  }

  const fetchCorrectAnswer = async () => {
    if (!currentExercise?.value) return

    try {
      const response = await $api<Exercise>(`/exercise/${currentExercise.value?.id}`, {
        method: 'GET',
      })
      showAnswer.value = true
      questionAnswer.value = response.answer
    }
    catch (e) {
      console.error(e)
    }
  }

  const getExercises = async (): Promise<void> => {
    // if we already have the exercises, don't fetch them again
    if (allExercises.value) return
    try {
      allExercises.value = await $api<NounExercises>('/exercise/all', {
        method: 'GET',
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  const saveSelectedExercises = async (body: SaveExercises): Promise<void> => {
    try {
      await $api<NounExercises>('/user/exercises', {
        method: 'PATCH',
        body: body,
      })
      getRandomExercise()
    }
    catch (e) {
      if (e instanceof FetchError)
        console.error(e.data)
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
    attempts,
    questionAnswer,
    showAnswer,
    fetchCorrectAnswer,
    allExercises,
    saveSelectedExercises,
  }
})
