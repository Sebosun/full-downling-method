<script setup lang="ts">

withDefaults(defineProps<{
  color?: 'black' | 'brand' | 'red'
}>(), {
  color: 'brand'
})

</script>
<template>
  <div class="gumroadish-card border-black dark:border-white p-2 rounded-xs border" :class="{
    'gumroadish-card--black': color === 'black',
    'gumroadish-card--brand': color === 'brand',
    'gumroadish-card--red': color === 'red'
  }">
    <slot />
  </div>
</template>

<style scoped>
.gumroadish-card {
  &:hover {
    transition: all;
    transition-duration: 0.2s;
    /* transform: translate(-0.25rem, -0.25rem); */
    box-shadow: .25rem .25rem 0rem #f85552;
  }

  .light-mode &--black:hover {
    box-shadow: .25rem .25rem 0rem black;
  }

  .dark-mode &--black:hover {
    box-shadow: .25rem .25rem 0rem white;
  }

  &--brand:hover {
    box-shadow: .25rem .25rem 0rem #f85552;
  }

  &--red:hover {
    box-shadow: .25rem .25rem 0rem #ce141e;
  }
}
</style>
