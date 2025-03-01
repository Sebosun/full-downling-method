<script setup lang="ts">
const store = useUserStore()
const exerciseStore = useExerciseStore()

onMounted(async () => {
  store.getLocalStorageToken()
  await store.initUserSettings()

  exerciseStore.getRandomExercise()
  exerciseStore.getExercises()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --color-brand: #f85552;
}
</style>
