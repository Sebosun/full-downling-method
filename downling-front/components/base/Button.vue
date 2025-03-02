<script setup lang="ts">
defineProps<{
  permaShadow?: boolean
  route?: string
}>()
</script>

<template>
  <RouterLink
    v-if="route"
    class="ui-button box-shadow-hover px-4 py-3 border border-solid border-black dark:border-white rounded-xs tracking-wide flex items-center justify-center text-center"
    :class="{ 'ui-button-shadow': permaShadow }"
    :to="route"
  >
    <slot />
  </RouterLink>

  <button
    v-else
    class="ui-button box-shadow-hover px-4 py-3 border border-solid border-black dark:border-white rounded-xs tracking-wide flex items-center justify-center text-center"
    :class="{ 'ui-button-shadow': permaShadow }"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  &:hover {
    transition: all;
    transition-duration: 0.2s;
    transform: translate(-0.25rem, -0.25rem);
    box-shadow: 0.25rem 0.25rem 0rem var(--color-brand);
  }
}

.ui-button-shadow {
  box-shadow: 0.25rem 0.25rem 0rem var(--color-brand);
}
</style>
