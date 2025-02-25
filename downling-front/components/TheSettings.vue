<script setup lang="ts">
import { $api } from '~/composables/api'

const store = useUserStore()
const { user } = storeToRefs(store)

const onEasyModeUpdate = () => {
  user.value.settings.easy_mode = !user.value.settings.easy_mode
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
  <div class="game flex gap-10 justify-center max-w-2xl">
    <BaseCard class="p-20">
      <div class="flex justify-between mb-8">
        <span> Enable easy mode </span>
        <BaseSwitch
          :model-value="modelValue"
          @update:model-value="onEasyModeUpdate"
        />
      </div>
      <ViewsSettingsExercises />
    </BaseCard>
  </div>
</template>
