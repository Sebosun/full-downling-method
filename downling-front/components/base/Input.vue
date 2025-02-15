<script setup lang="ts">
const input = defineModel<string>('input')
withDefaults(defineProps<{
  placeholder: string
  name: string
  type?: string
  label?: string
}>(), {
  type: 'text',
  label: '',
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="name">
      {{ label }}
    </label>

    <input
      v-model="input"
      :name="name"
      class="rounded-xs border border-black bg-inherit px-4 py-2 outline-none transition-all focus-within:rounded-sm focus-within:ring focus-within:ring-[#f85552] dark:border-white"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>
