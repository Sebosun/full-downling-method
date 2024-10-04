<script setup lang="ts">
import type { Exercise } from "@/types/ExerciseTypes";
const inputRef = ref<HTMLInputElement>();
const input = ref<string>("");
const currentExercise = ref<Exercise | null>(null);
const allExercises = ref<Exercise[] | null>(null);
const showAnswer = ref<boolean>(false);

const specialLatinLetters = ["ā", "ō", "ī", "ē"] as const;
const previousKeys = ref<string[]>([]);

const API_LINK = "http://localhost:3000";
async function submit(): Promise<void> {
    showAnswer.value = false;
}

async function getExercises(): Promise<void> {
    allExercises.value = await $fetch<Exercise[]>(API_LINK + "/exercise/all", {
        method: "GET",
    });
    currentExercise.value = allExercises.value[21];
}

onMounted(() => {
    getExercises();
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

const keyup = (event: KeyboardEvent) => {
    // removing first element so we dont
    // store 45901923401923091203 number of itemms for no reason
    if (previousKeys.value.length > 50) {
        previousKeys.value.shift();
    }
    const len = previousKeys.value.length;
    const commandBefore = previousKeys.value[len - 1];

    if (commandBefore === " " && commandBefore === event.key) {
        showAnswer.value = true;
        previousKeys.value.pop();
        return;
    }

    previousKeys.value.push(event.key);

    if (commandBefore === ",") {
        const indexOfLastChar = input.value.length - 1;
        const lastChar = input.value[indexOfLastChar];
        const isLastCharSameA = event.key === "a" && lastChar === "a";
        const isLastCharSameO = event.key === "o" && lastChar === "o";
        const isLastCharSameI = event.key === "i" && lastChar === "i";
        const isLastCharSameE = event.key === "e" && lastChar === "e";
        const isLastCharSame =
            isLastCharSameA ||
            isLastCharSameO ||
            isLastCharSameI ||
            isLastCharSameE;

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
    }
};
</script>

<template>
    <div class="game flex gap-10 justify-center" @keyup="keyup">
        <BaseCard class="p-20 col-[2_/_span_2]">
            <div class="text-center">
                <h1 class="mb-4">{{ currentExercise?.question }}</h1>
                <p class="my-4" v-if="showAnswer">
                    {{ currentExercise?.answer }}
                </p>
                <form class="grid gap-4 mb-4" @submit.prevent="submit">
                    <div class="flex mx-auto gap-4">
                        <BaseButton
                            perma-shadow
                            class="min-w-20"
                            type="button"
                            v-for="letter in specialLatinLetters"
                            :key="letter"
                            @click="input += letter"
                        >
                            {{ letter }}
                        </BaseButton>
                    </div>
                    <BaseInput
                        ref="inputRef"
                        @keydown="preventSpace"
                        class="mx-auto max-w-[450px]"
                        :input="input"
                        @update:input="onInput"
                        placeholder="enter text here"
                    />
                    <BaseButton class="mx-auto w-[450px]">
                        Do something
                    </BaseButton>
                </form>
                <div>
                    <div class="text-lg mb-4">
                        Use <BaseKey letter="," /> +
                        <BaseKey letter="a" />
                        <BaseKey letter="i" />
                        <BaseKey letter="o" />
                        <BaseKey letter="u" />
                        to automatically enter a character
                    </div>
                    <p class="text-lg">
                        Press <BaseKey letter="space" /> twice to show the
                        answer
                    </p>
                </div>
            </div>
        </BaseCard>
        <BaseCard class="mx-auto gap-1 max-h-44">
            <div class="grid grid-cols-2">
                <div>Correct</div>
                <BaseKey type="gumroadish" class="ml-auto" letter="20" />
            </div>

            <div class="grid grid-cols-2">
                Wrong
                <BaseKey type="gumroadish" class="ml-auto" letter="20" />
            </div>
            <div class="grid grid-cols-2">
                Perfect
                <BaseKey type="gumroadish" class="ml-auto" letter="20" />
            </div>
        </BaseCard>
    </div>
</template>

<style scoped>
.game {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
