<script setup lang="ts">
defineProps<
  {
    correct: number
    wrong: number
    perfect: number
  }
>()
</script>

<template>
  <div class="grid grid-cols-2">
    <div>Correct</div>
    <BaseKey
      type="gumroadish"
      class="ml-auto"
      :letter="String(correct)"
    />
  </div>

  <div class="grid grid-cols-2">
    Wrong
    <BaseKey
      type="gumroadish"
      class="ml-auto"
      :letter="String(wrong)"
    />
  </div>
  <div class="grid grid-cols-2">
    Perfect
    <BaseKey
      type="gumroadish"
      class="ml-auto"
      :letter="String(perfect)"
    />
  </div>
</template>
