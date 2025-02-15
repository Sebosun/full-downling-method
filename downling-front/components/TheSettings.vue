<script setup lang="ts">
import { useExerciseStore } from '~/store/exercisesStore'

const store = useExerciseStore()

onMounted(() => {
  store.fetchSettings()
})
</script>

<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <ViewsSettingsExercises />
    </BaseCard>
  </div>
</template>
