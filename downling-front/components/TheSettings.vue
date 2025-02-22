<script setup lang="ts">
const store = useUserStore()
const { user } = storeToRefs(store)
const { $api } = useNuxtApp()

const onEasyModeUpdate = () => {
  console.log('Easy mode update')
}
</script>

<template>
  <div class="game flex gap-10 justify-center">
    <BaseCard class="p-20">
      <div class="flex justify-between mb-8">
        <span> Enable easy mode </span>
        <BaseSwitch
          v-model="user.settings.easyMode"
          @update:checked="onEasyModeUpdate"
        />
      </div>
      <ViewsSettingsExercises />
    </BaseCard>
  </div>
</template>
