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
  <div class="grid grid-cols-2 gap-2">
    <div>Correct</div>
    <BaseKey
      type="gumroadish"
      class="ml-auto min-w-20 text-end"
      :letter="String(correct)"
    />
  </div>

  <div class="grid grid-cols-2 gap-2">
    <div>
      Wrong
    </div>
    <BaseKey
      type="gumroadish"
      class="ml-auto min-w-20 text-end"
      :letter="String(wrong)"
    />
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div>
      Perfect
    </div>
    <BaseKey
      type="gumroadish"
      class="ml-auto min-w-20 text-end"
      :letter="String(perfect)"
    />
  </div>
</template>
