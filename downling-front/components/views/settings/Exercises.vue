<script setup lang="ts">
import { useExerciseStore } from '~/store/exercisesStore'
import { debounce } from '~/helpers/debounce'
import type { NounExerciseByGroup } from '~/types/ExerciseTypes'
import { LocalStorageKeys } from '~/types/LocalStorageKeys'

const store = useExerciseStore()
const { allExercises, selectedExs } = storeToRefs(store)

const saveExericses = async () => {
  localStorage.setItem(LocalStorageKeys.CHOSEN_EXERCISES, JSON.stringify(selectedExs.value))

  const allExIds = [] as number[]

  for (const item in allExercises.value) {
    // typescript not understanding that `item` will be a keyof typeof allExercises.value -.-
    // and i cant be bothered with casting
    allExercises.value[item as keyof typeof allExercises.value].forEach((ex) => {
      ex.singular.forEach(item => allExIds.push(item.id))
      ex.plural.forEach(item => allExIds.push(item.id))
    })
  }
  const body = allExIds.map((id) => {
    return {
      selected: selectedExs.value.includes(id),
      exercise_id: id,
    }
  })
  store.saveSelectedExercises({ exercises: body })
}

const debounceSave = debounce(saveExericses)

const hasItem = (id: number): boolean => {
  return Boolean(findByIndex(id) >= 0)
}

const isGroupSelected = (exercise: NounExerciseByGroup) => {
  let allChecked = true

  exercise.plural.forEach((ex) => {
    const result = hasItem(ex.id)
    if (!result) {
      allChecked = false
    }
  })

  if (!allChecked) return false

  exercise.singular.forEach((ex) => {
    const result = hasItem(ex.id)
    if (!result) {
      allChecked = false
    }
  })

  return allChecked
}

const findByIndex = (id: number): number => {
  return selectedExs.value.findIndex(selectedId => selectedId === id)
}

const toggleCheckbox = (id: number) => {
  const itemIdx = findByIndex(id)
  if (itemIdx >= 0) {
    selectedExs.value.splice(itemIdx, 1)
    return
  }
  selectedExs.value.push(id)

  debounceSave()
}

const countGroupSelected = (exercise: NounExerciseByGroup): number => {
  let count = 0

  exercise.plural.forEach((ex) => {
    if (hasItem(ex.id)) {
      count++
    }
  })

  exercise.singular.forEach((ex) => {
    if (hasItem(ex.id)) {
      count++
    }
  })

  return count
}

const groupTitle = (exercise: NounExerciseByGroup): string => {
  return `${exercise.name} (${countGroupSelected(exercise)}/${exercise.singular.length + exercise.plural.length})`
}

const toggleGroupSelection = (exercise: NounExerciseByGroup): void => {
  if (isGroupSelected(exercise)) {
    exercise.plural.forEach((item) => {
      toggleCheckbox(item.id)
    })

    exercise.singular.forEach((item) => {
      toggleCheckbox(item.id)
    })
    debounceSave()
    return
  }

  exercise.singular.forEach((item) => {
    if (!hasItem(item.id)) {
      toggleCheckbox(item.id)
    }
  })

  exercise.plural.forEach((item) => {
    if (!hasItem(item.id)) {
      toggleCheckbox(item.id)
    }
  })
}
</script>

<template>
  <div
    v-for="(value, key) of allExercises"
    :key="key"
  >
    <h1 class="mb-4 capitalize">
      {{ key }}
    </h1>

    <div
      v-for="exercise in value"
      :key="exercise.name"
    >
      <BaseCollapse
        :title="groupTitle(exercise)"
        class="mb-4 min-w-[600px]"
      >
        <div class="col-span-2 flex gap-4 items-center">
          <BaseCheckbox
            :checked="isGroupSelected(exercise)"
            @update:checked="toggleGroupSelection(exercise)"
          >
            <div> Check all </div>
          </BaseCheckbox>
        </div>

        <div class="grid grid-cols-2">
          <div>
            Sing.
            <div
              v-for="ex in exercise.singular"
              :key="ex.id"
              class=""
            >
              <BaseCheckbox
                :checked="hasItem(ex.id)"
                @update:checked="toggleCheckbox(ex.id)"
              >
                <div>
                  {{ ex.answer }}
                </div>
              </BaseCheckbox>
            </div>
          </div>
          <div>
            Pl.
            <div
              v-for="ex in exercise.plural"
              :key="ex.id"
              class=""
            >
              <BaseCheckbox
                :checked="hasItem(ex.id)"
                @update:checked="toggleCheckbox(ex.id)"
              >
                <div>
                  {{ ex.answer }}
                </div>
              </BaseCheckbox>
            </div>
          </div>
        </div>
      </BaseCollapse>
    </div>
  </div>
</template>
