<script setup lang="ts">
import { useExerciseStore } from "~/store/exercisesStore";
import { debounce } from '~/helpers/debounce'
import type { ExerciseByGroup } from "~/types/ExerciseTypes";

const selectedExs = ref<number[]>([])
const store = useExerciseStore()
const { allExercises } = storeToRefs(store)

const saveToLocalStorage = () => {
  localStorage.setItem('chosenExercises', JSON.stringify(selectedExs.value))
}

const debounceSomething = debounce(saveToLocalStorage)

const findByIndex = (id: number): number => {
  return selectedExs.value.findIndex(selectedId => selectedId === id)
}

const hasItem = (id: number): boolean => {
  return Boolean(findByIndex(id) >= 0)
}

const onCheckClick = (id: number) => {
  const itemIdx = findByIndex(id)
  if (itemIdx >= 0) {
    selectedExs.value.splice(itemIdx, 1)
    return
  }
  selectedExs.value.push(id)

  debounceSomething()
}

const hasAllChecked = (exercise: ExerciseByGroup) => {
  let allChecked = true

  exercise.plural.forEach(ex => {
    const result = hasItem(ex.id)
    if (!result) {
      allChecked = false
    }
  })

  if (!allChecked) return false

  exercise.singular.forEach(ex => {
    const result = hasItem(ex.id)
    if (!result) {
      allChecked = false
    }
  })

  return allChecked
}

const checkAllGroup = (exercise: ExerciseByGroup) => {
  if (hasAllChecked(exercise)) {
    exercise.plural.forEach(item => {
      onCheckClick(item.id)
    })

    exercise.singular.forEach(item => {
      onCheckClick(item.id)
    })
    return
  }

  exercise.plural.forEach(item => {
    const itemIdx = findByIndex(item.id)
    if (itemIdx === -1) {
      selectedExs.value.push(item.id)
    }
  })

  exercise.singular.forEach(item => {
    const itemIdx = findByIndex(item.id)
    if (itemIdx === -1) {
      selectedExs.value.push(item.id)
    }
  })
}

</script>
<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <div v-for="(value, key) of allExercises" :key="key">
        <h1 class="mb-4 capitalize">{{ key }}</h1>
        <div v-for="exercise in value">
          <BaseCollapse :title="exercise.name" class="mb-4 min-w-[600px]">
            <div class="grid grid-cols-2 items-center">
              <div class="col-span-2 flex gap-4 items-center">
                <BaseCheckbox :checked="hasAllChecked(exercise)" @update:checked="checkAllGroup(exercise)" />
                <div> Check all </div>
              </div>

              <div class="flex gap-4 items-center" v-for="ex in exercise.singular">
                <BaseCheckbox :checked="hasItem(ex.id)" @update:checked="onCheckClick(ex.id)" />
                <div>
                  {{ ex.answer }}
                </div>
              </div>
              <div class="flex gap-4 items-center" v-for="ex in exercise.plural">
                <BaseCheckbox :checked="hasItem(ex.id)" @update:checked="onCheckClick(ex.id)" />
                <div>
                  {{ ex.answer }}
                </div>
              </div>
            </div>
          </BaseCollapse>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
