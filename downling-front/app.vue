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
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>

<style>
:root {
  --color-brand: #f85552;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(10px);
}
</style>
