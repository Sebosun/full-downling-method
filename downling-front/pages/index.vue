<script setup lang="ts">
import type { Exercise } from '@/types/ExerciseTypes'
const input = ref<string>('')
const currentExercise = ref<Exercise | null>(null)
const allExercises = ref<Exercise[] | null>(null)

const API_LINK = "http://localhost:3000"
async function submit(): Promise<void> {
  console.log('nothing')
}

async function getExercises(): Promise<void> {
  allExercises.value = await $fetch<Exercise[]>(API_LINK + "/exercise/all", {
    method: 'GET',
  })
  currentExercise.value = allExercises.value[21]
}

onMounted(() => {
  getExercises()
})
</script>

<template>
  <div>
    <BaseCard class="p-20">
      <div>
        <h1 class="text-center mb-8">{{ currentExercise?.question }}</h1>
        <form class="grid gap-4" @submit.prevent="submit">
          <BaseInput class="mx-auto max-w-[450px]" v-model:input="input" placeholder="enter text here" />
          <BaseButton class="mx-auto w-[450px] ">
            Do something
          </BaseButton>
        </form>

      </div>
    </BaseCard>
  </div>
</template>
