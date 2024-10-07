<script setup lang="ts">
import { useExerciseStore } from "~/store/exercisesStore";

const store = useExerciseStore()
const { allExercises } = storeToRefs(store)
</script>
<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <div v-for="(value, key) of allExercises" :key="key">
        <h1 class="mb-4 capitalize">{{ key }}</h1>
        <div v-for="exercise in value">
          <BaseCollapse :title="exercise.name" class="mb-4 min-w-[600px]">
            <div v-for="ex in exercise.singular">
              {{ ex.answer }}
            </div>
            <div v-for="ex in exercise.plural">
              {{ ex.answer }}
            </div>
          </BaseCollapse>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
