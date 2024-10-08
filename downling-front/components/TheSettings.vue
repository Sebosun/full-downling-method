<script setup lang="ts">
import { useExerciseStore } from "~/store/exercisesStore";
import { debounce } from '~/helpers/debounce'

const selectedExs = ref<number[]>([])
const store = useExerciseStore()
const { allExercises } = storeToRefs(store)

const doSomething = () => {
  console.log(new Date().toLocaleString())
}
const debounceSomething = debounce(doSomething)

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

</script>
<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <div v-for="(value, key) of allExercises" :key="key">
        <h1 class="mb-4 capitalize">{{ key }}</h1>
        <div v-for="exercise in value">
          <BaseCollapse :title="exercise.name" class="mb-4 min-w-[600px]">
            <div class="grid grid-cols-2">
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
