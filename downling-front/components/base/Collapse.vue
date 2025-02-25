<script setup lang="ts">
defineProps<{
  title: string
}>()
const isVisible = ref<boolean>(false)

const toggle = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="max-w-96">
    <div
      role="button"
      class="flex justify-between bg-gray-100 dark:bg-gray-900 py-3 px-6 rounded-sm"
      @click="toggle"
    >
      <h4> {{ title }} </h4>
      <div v-show="!isVisible">
        +
      </div>
      <div v-show="isVisible">
        -
      </div>
    </div>
    <div
      class="max-w-full  collapsible"
      :class="{ expanded: isVisible }"
    >
      <div class="p-4 my-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapsible {
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: 0;
}
.collapsible.expanded {
  max-height: 1000px;
}
</style>
