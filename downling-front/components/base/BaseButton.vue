<script setup lang="ts">
defineProps<{
  permaShadow?: boolean
}>()
</script>
<template>
  <button
    class="ui-button box-shadow-hover px-4 py-3 border border-solid border-black dark:border-white rounded-xs tracking-wide flex items-center justify-center text-center"
    :class="{ 'ui-button-shadow': permaShadow }">
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  &:hover {
    transition: all;
    transition-duration: 0.2s;
    transform: translate(-0.25rem, -0.25rem);
    box-shadow: .25rem .25rem 0rem #f85552;
  }
}

.ui-button-shadow {
  box-shadow: .25rem .25rem 0rem #f85552;
}
</style>
