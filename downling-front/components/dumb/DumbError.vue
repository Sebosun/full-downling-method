<script setup lang="ts">
withDefaults(defineProps<{ tag?: string }>(), {
  tag: 'div'
})
</script>

<template>
  <div class="text-sm text-red-500">
    <slot />
  </div>
</template>
