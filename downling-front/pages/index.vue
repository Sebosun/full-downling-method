<script setup lang="ts">
import TheExercise from '~/components/TheExercise.vue'
import TheSettings from '~/components/TheSettings.vue'

const exerciseStore = useExerciseStore()

const tabs = [
  {
    key: 'default',
    label: 'Main',
    component: TheExercise,
  },
  {
    key: 'settings',
    label: 'Settings',
    component: TheSettings,
  },
]

onMounted(async () => {
  if (exerciseStore.currentExercise) return
  exerciseStore.getRandomExercise()
  exerciseStore.getExercises()
})
</script>

<template>
  <div class="mx-auto">
    <BaseTabs
      class="mx-auto"
      :tabs="tabs"
    />
  </div>
</template>
