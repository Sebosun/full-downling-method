<script setup lang="ts">
import { useExerciseStore } from "~/store/exercisesStore";

const store = useExerciseStore()
const { allExercises } = storeToRefs(store)
</script>
<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <pre>
        {{ allExercises }}
      </pre>
    </BaseCard>
  </div>
</template>
