<script setup lang="ts">

const input = defineModel('input')

defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <input
    class="bg-inherit border-black px-4 py-2 border dark:border-white rounded-xs focus-within:ring focus-within:ring-[#f85552] focus-within:rounded-sm outline-none transition-all"
    type="text" :placeholder="placeholder" v-model="input" />
</template>
