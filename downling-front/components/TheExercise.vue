<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'
import type { AnswerResponse } from '@/types/ExerciseTypes'
import { $api } from '~/composables/api'
import { useExerciseStore } from '~/store/exercisesStore'
import { sanitizeLatin } from '~/helpers/sanitizeLatin'

const inputRef = ref<HTMLInputElement>()
const input = ref<string>('')

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const store = useExerciseStore()
const { hasEasyModeEnabled } = storeToRefs(userStore)
const { currentExercise, correct, wrong, perfect, questionAnswer } = storeToRefs(store)
const showAnswer = ref<boolean>(false)
const warningAnimation = ref<boolean>(false)
const correctAnimation = ref<boolean>(false)
const specialLatinLetters = ['ā', 'ō', 'ī', 'ē', 'ū'] as const
const previousKeys = ref<string[]>([])

const resetState = () => {
  questionAnswer.value = ''
  showAnswer.value = false
  input.value = ''
}

const playWarningAnim = () => {
  warningAnimation.value = true
  setTimeout(() => {
    warningAnimation.value = false
  }, 900)
}

const playCorrectAnimation = () => {
  correctAnimation.value = true
  setTimeout(() => {
    correctAnimation.value = false
  }, 900)
}

const handleAfterAnswer = async (wasCorrect: boolean) => {
  if (!wasCorrect) {
    playWarningAnim()
    wrong.value++
    return
  }

  // TODO: this isn't correct
  // we need to check attempts for given answer
  if (!showAnswer.value) perfect.value++
  showAnswer.value = false
  correct.value++
  resetState()
  playCorrectAnimation()
  await store.getRandomExercise()
}

const getAnswerLoggedIn = async () => {
  if (!currentExercise.value) return
  const response = await $api<AnswerResponse>('/exercise/answer', {
    method: 'POST',
    body: {
      id: currentExercise.value.id,
      answer: input.value,
    },
  })
  handleAfterAnswer(response.correct)
}

const getAnswerUnauthorized = async () => {
  if (!currentExercise.value) return
  const response = await $api<AnswerResponse>('/exercise/answer', {
    method: 'POST',
    body: {
      id: currentExercise.value.id,
      answer: input.value,
      easyMode: hasEasyModeEnabled.value,
    },
  })

  handleAfterAnswer(response.correct)
}

async function submit(): Promise<void> {
  if (!input.value) {
    playWarningAnim()
    return
  }

  if (isLoggedIn.value) {
    await getAnswerLoggedIn()
    return
  }

  await getAnswerUnauthorized()
}

const onInput = (newInput: string) => {
  input.value = newInput.trimEnd()
}

const preventSpace = (event: KeyboardEvent) => {
  const forbiddenKeys = [' ', ',']
  const isForbiddenKey = forbiddenKeys.includes(event.key)
  if (isForbiddenKey) {
    event.preventDefault()
  }
}

const keyup = async (event: KeyboardEvent) => {
  // removing first element so we dont
  // store 45901923401923091203 number of itemms for no reason
  if (previousKeys.value.length > 50) {
    previousKeys.value.shift()
  }
  const len = previousKeys.value.length
  const lastLetter = previousKeys.value[len - 1]

  if (lastLetter === ' ' && lastLetter === event.key) {
    try {
      await store.fetchCorrectAnswer()
      showAnswer.value = true
      previousKeys.value.pop()
    }
    catch (error) {
      /* TOOD: some modals */
      console.error(error)
    }
    return
  }

  previousKeys.value.push(event.key)

  // if we type really fast this can fail to enter
  // character at the end
  // change to a function that finds the last occurance of character and replaces that
  if (lastLetter === ',') {
    const indexOfLastChar = input.value.lastIndexOf(event.key)

    if (event.key === 'a') {
      input.value = input.value.substring(0, indexOfLastChar) + specialLatinLetters[0] + input.value.substring(indexOfLastChar + 1)
    }
    else if (event.key === 'o') {
      input.value = input.value.substring(0, indexOfLastChar) + specialLatinLetters[1] + input.value.substring(indexOfLastChar + 1)
    }
    else if (event.key === 'i') {
      input.value = input.value.substring(0, indexOfLastChar) + specialLatinLetters[2] + input.value.substring(indexOfLastChar + 1)
    }
    else if (event.key === 'e') {
      input.value = input.value.substring(0, indexOfLastChar) + specialLatinLetters[3] + input.value.substring(indexOfLastChar + 1)
    }
    else if (event.key === 'u') {
      input.value = input.value.substring(0, indexOfLastChar) + specialLatinLetters[4] + input.value.substring(indexOfLastChar + 1)
    }
  }
}

const questionAnswerParsed = computed(() => {
  return hasEasyModeEnabled.value
    ? sanitizeLatin(questionAnswer.value ?? '')
    : questionAnswer.value
})
</script>

<template>
  <div class="grid gap-4 ml-2 mr-2 xl:max-w-2xl">
    <BaseCard
      color="black"
      class="p-4 xl:p-20 min-w-full"
      :class="{ 'shake': warningAnimation, 'pb-28': showAnswer }"
      @keyup="keyup"
    >
      <div
        class="mb-4 mx-auto text-center rounded-md flex justify-center relative"
        :class="{ 'correct-glow': correctAnimation }"
      >
        <span>
          {{ currentExercise?.question }}
        </span>

        <Transition
          name="answer"
          mode="out-in"
        >
          <span
            v-if="showAnswer"
            class="absolute top-10 xl:top-12 border-b-brand border-b-2 "
          >
            {{ questionAnswerParsed }}
          </span>
        </Transition>
      </div>

      <div class="flex flex-col items-center mx-4 text-center relative">
        <div
          class="neighbor"
          :class="{ animate: showAnswer }"
        >
          <form
            class="justify-center grid gap-4 mb-4 transition-all duration-300"
            @submit.prevent="submit"
          >
            <div
              v-show="!hasEasyModeEnabled"
              class="flex mx-auto gap-2 xl:gap-4 w-full justify-center"
            >
              <BaseButton
                v-for="letter in specialLatinLetters"
                :key="letter"
                class="xl:min-w-20"
                type="button"
                @click="input += letter"
              >
                {{ letter }}
              </BaseButton>
            </div>
            <div class="flex flex-col items-center px-2 gap-4">
              <BaseInput
                ref="inputRef"
                name="answer"
                class="w-full xl:mx-auto xl:max-w-[450px]"
                :input="input"
                placeholder="enter text here"
                autofocus
                @keydown="preventSpace"
                @update:input="onInput"
              />
              <BaseButton
                :class="{ 'correct-glow': correctAnimation }"
                class="mx-2 w-full xl:w-[450px]"
              >
                Check
              </BaseButton>
            </div>
          </form>
          <div class="text-sm md:text-lg hidden md:block">
            <div
              v-show="!hasEasyModeEnabled"
              class=" mb-4"
            >
              <span>
                Use
              </span>
              <BaseKey letter="," /> +
              <BaseKey letter="a" />
              <BaseKey letter="i" />
              <BaseKey letter="o" />
              <BaseKey letter="u" />
              <span>
                to automatically enter a character
              </span>
            </div>
            <p>
              Press
              <BaseKey letter="space" /> twice to show the
              answer
            </p>
          </div>
        </div>
      </div>
    </BaseCard>
    <BaseCard
      class="min-w-full w-full"
      color="black"
    >
      <ViewsExerciseStats
        :correct="correct"
        :wrong="wrong"
        :perfect="perfect"
      />
    </BaseCard>
    <div
      v-show="hasEasyModeEnabled"
      class="mt-4 flex justify-between items-center"
    >
      <span class="line-clamp-8">
        Easy mode
      </span>
      <CheckIcon class="w-[24px] h-[24px] text-black font-bold dark:text-brand" />
    </div>
  </div>
</template>

<style scoped>
.game {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.correct-glow {
  animation: glow 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: background;
}

@keyframes glow {
  0% {
    background-color: rgba(81, 233, 0, 0.2);
  }

  50% {
    background-color: rgba(81, 233, 0, 0.6);
  }

  90% {
    background-color: rgba(81, 233, 0, 0.2);
  }

  90% {
    background-color: initial;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.answer-enter-active {
  transition: opacity 0.5s ease;
  transition: all 0.3s ease-out;
}

.answer-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  position: absolute;
}

.answer-enter-from,
.answer-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.neighbor {
  transition: transform 0.8s ease;
  /* Define the transition */
  transform: translateY(0);
  /* Define the initial state */
}

.neighbor.animate {
  transform: translateY(50px);
  /* Or any other transform */
}
</style>
