<script setup lang="ts">
import { $api } from '~/composables/api'
import { LocalStorageKeys } from '~/types/LocalStorageKeys'

const store = useUserStore()
const { user } = storeToRefs(store)

// TODO: move this into user store
const onEasyModeUpdate = () => {
  user.value.settings.easy_mode = !user.value.settings.easy_mode
  localStorage.setItem(LocalStorageKeys.SETTINGS, JSON.stringify(user.value.settings))
  try {
    $api('/user/settings', {
      method: 'PATCH',
      body: {
        easyMode: Boolean(user.value.settings.easy_mode),
      },
    })
  }
  catch (e) {
    console.error(e)
  }
}

const modelValue = computed(() => {
  return user.value.settings.easy_mode
})
</script>

<template>
  <div class="game flex gap-10 justify-center w-full">
    <BaseCard
      color="black"
      class="xl:p-20 p-4 align-center flex flex-col gap-10 max-w-screen-sm xl:max-w-full"
    >
      <BaseHeatmap />
      <div class="flex justify-between mb-8 w-full">
        <span> Enable easy mode </span>
        <BaseSwitch
          :model-value="modelValue"
          @update:model-value="onEasyModeUpdate"
        />
      </div>
      <div class="grid xl:grid-cols-2 gap-4">
        <ViewsSettingsExercises />
      </div>
    </BaseCard>
  </div>
</template>
