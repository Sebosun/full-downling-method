<script setup lang="ts">
import type { AnswerResponse } from "@/types/ExerciseTypes";
import { useExerciseStore } from "~/store/exercisesStore";

const inputRef = ref<HTMLInputElement>();
const input = ref<string>("");

const store = useExerciseStore()
const { currentExercise, correct, wrong, perfect, questioAnswer } = storeToRefs(store)
const showAnswer = ref<boolean>(false);
const warningAnimation = ref<boolean>(false)
const correctAnimation = ref<boolean>(false)
const specialLatinLetters = ["ā", "ō", "ī", "ē", "ū"] as const;
const previousKeys = ref<string[]>([]);

const API_LINK = "http://localhost:3000";
const resetState = () => {
  questioAnswer.value = ''
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

async function submit(): Promise<void> {
  if (!currentExercise.value) return
  if (!input.value) {
    playWarningAnim()
  }

  const response = await $fetch<AnswerResponse>(API_LINK + "/exercise/answer", {
    method: "POST",
    body: {
      id: currentExercise.value.id,
      answer: input.value,
    }
  });

  if (response.correct) {
    if (!showAnswer.value) {
      perfect.value++

    }
    showAnswer.value = false
    correct.value++
    resetState()
    playCorrectAnimation()
    await store.getRandomExercise()
  } else {
    playWarningAnim()
    wrong.value++
  }
}


onMounted(async () => {
  if (store.currentExercise) return
  store.getRandomExercise()
  store.getExercises();
});

const onInput = (newInput: string) => {
  input.value = newInput.trimEnd();
};

const preventSpace = (event: KeyboardEvent) => {
  const forbiddenKeys = [" ", ","];
  const isForbiddenKey = forbiddenKeys.includes(event.key);
  if (isForbiddenKey) {
    event.preventDefault();
  }
};


const keyup = async (event: KeyboardEvent) => {
  // removing first element so we dont
  // store 45901923401923091203 number of itemms for no reason
  if (previousKeys.value.length > 50) {
    previousKeys.value.shift();
  }
  const len = previousKeys.value.length;
  const commandBefore = previousKeys.value[len - 1];

  if (commandBefore === " " && commandBefore === event.key) {
    await store.fetchCorrectAnswer()
    showAnswer.value = true;
    previousKeys.value.pop();
    return;
  }

  previousKeys.value.push(event.key);

  // if we type really fast this can fail to enter
  // character at the end
  // change to a function that finds the last occurance of character and replaces that 
  if (commandBefore === ",") {
    const indexOfLastChar = input.value.length - 1;
    const lastChar = input.value[indexOfLastChar];
    const isLastCharSameA = event.key === "a" && lastChar === "a";
    const isLastCharSameO = event.key === "o" && lastChar === "o";
    const isLastCharSameI = event.key === "i" && lastChar === "i";
    const isLastCharSameE = event.key === "e" && lastChar === "e";
    const isLastCharSameU = event.key === "u" && lastChar === "u";
    const isLastCharSame =
      isLastCharSameA ||
      isLastCharSameO ||
      isLastCharSameI ||
      isLastCharSameE ||
      isLastCharSameU
      ;

    let newInputStrip = input.value;
    if (isLastCharSame) {
      newInputStrip = input.value.substring(0, indexOfLastChar);
    }


    if (event.key === "a") {
      input.value = newInputStrip + specialLatinLetters[0];
    }

    if (event.key === "o") {
      input.value = newInputStrip + specialLatinLetters[1];
    }

    if (event.key === "i") {
      input.value = newInputStrip + specialLatinLetters[2];
    }

    if (event.key === "e") {
      input.value = newInputStrip + specialLatinLetters[3];
    }

    if (event.key === "u") {
      input.value = newInputStrip + specialLatinLetters[4];
    }
  }
};
</script>

<template>
  <div class="game flex gap-10 justify-center" @keyup="keyup">
    <BaseCard class="p-20 col-[2_/_span_2]" :class="{ shake: warningAnimation }">
      <div class="text-center">
        <h1 class="mb-4">{{ currentExercise?.question }}</h1>
        <p class="my-4" v-if="showAnswer">
          {{ questioAnswer }}
        </p>
        <form class="grid gap-4 mb-4" @submit.prevent="submit">
          <div class="flex mx-auto gap-4">
            <BaseButton perma-shadow class="min-w-20" type="button" v-for="letter in specialLatinLetters" :key="letter"
              @click="input += letter">
              {{ letter }}
            </BaseButton>
          </div>
          <BaseInput ref="inputRef" @keydown="preventSpace" class="mx-auto max-w-[450px]" :input="input"
            @update:input="onInput" placeholder="enter text here" />
          <BaseButton :class="{ 'correct-glow': correctAnimation }" class="mx-auto w-[450px]">
            Check
          </BaseButton>
        </form>
        <div>
          <div class="text-lg mb-4">
            Use
            <BaseKey letter="," /> +
            <BaseKey letter="a" />
            <BaseKey letter="i" />
            <BaseKey letter="o" />
            <BaseKey letter="u" />
            to automatically enter a character
          </div>
          <p class="text-lg">
            Press
            <BaseKey letter="space" /> twice to show the
            answer
          </p>
        </div>
      </div>
    </BaseCard>
    <BaseCard class="mx-auto gap-1 max-h-44">
      <div class="grid grid-cols-2">
        <div>Correct</div>
        <BaseKey type="gumroadish" class="ml-auto" :letter="String(correct)" />
      </div>

      <div class="grid grid-cols-2">
        Wrong
        <BaseKey type="gumroadish" class="ml-auto" :letter="String(wrong)" />
      </div>
      <div class="grid grid-cols-2">
        Perfect
        <BaseKey type="gumroadish" class="ml-auto" :letter="String(perfect)" />
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.game {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
</style>
