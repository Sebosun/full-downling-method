<script setup lang="ts">
import { $api } from '~/composables/api'
import { LocalStorageKeys } from '~/types/LocalStorageKeys'
import type { HeatmapDataPoint } from '~/components/base/BaseHeatmap.vue'

const store = useUserStore()
const { user, settings, isLoggedIn } = storeToRefs(store)
const stats = ref<HeatmapDataPoint[]>()

const updateSettings = () => {
  if (!isLoggedIn.value) return

  try {
    $api('/user/settings', {
      method: 'PATCH',
      body: {
        easyMode: Boolean(settings.value.easy_mode),
        altExerciseLabel: Boolean(settings.value.alt_exercise_label),
      },
    })
  }
  catch (e) {
    console.error(e)
  }
}

const updateLocalStorage = () => {
  localStorage.setItem(LocalStorageKeys.SETTINGS, JSON.stringify(settings.value))
}

const onEasyModeUpdate = () => {
  user.value.settings.easy_mode = !user.value.settings.easy_mode
  updateLocalStorage()
  updateSettings()
}

const onLabelUpdate = () => {
  user.value.settings.alt_exercise_label = !user.value.settings.alt_exercise_label
  updateLocalStorage()
  updateSettings()
}

const easyModeValue = computed(() => settings.value.easy_mode)
const altExerciseLabel = computed(() => settings.value.alt_exercise_label)

onMounted(async () => {
  if (!isLoggedIn.value) return
  try {
    const result = await $api<HeatmapDataPoint[]>('/user/stats', {
      method: 'GET',
    })
    stats.value = result
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="game flex gap-10 justify-center w-full">
    <BaseCard
      color="black"
      class="xl:p-20 p-4 align-center flex flex-col gap-4 max-w-screen-sm xl:max-w-full"
    >
      <BaseHeatmap
        v-if="stats"
        :data="stats"
      />

      <div class="flex justify-between mb-8 w-full">
        <span> Enable easy mode </span>
        <BaseSwitch
          :model-value="easyModeValue"
          @update:model-value="onEasyModeUpdate"
        />
      </div>

      <div>
        <div class="flex justify-between w-full">
          <span> Alternative exercise label display </span>
          <BaseSwitch
            :model-value="altExerciseLabel"
            @update:model-value="onLabelUpdate"
          />
        </div>
      </div>

      <div class="grid xl:grid-cols-2 gap-4 mt-28">
        <ViewsSettingsExercises />
      </div>
    </BaseCard>
  </div>
</template>
