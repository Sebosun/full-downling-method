<script setup lang="ts">
const isOpen = defineModel<boolean>('isOpen')

defineProps<{
  title: string
}>()

const onMouseEnter = () => {
  isOpen.value = true
}
</script>

<template>
  <div
    class="relative hover:cursor-pointer"
    @mouseenter="onMouseEnter"
    @mouseleave="isOpen = false"
  >
    <slot />

    <span
      v-show="isOpen"
      class="tooltip p-2 z-20 text-xs text-white bg-black rounded-sm min-h-fit text-center transition min-w-fit text-nowrap overflow-visible"
    >
      {{ title }}
    </span>
  </div>
</template>

<style scoped>
.tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
