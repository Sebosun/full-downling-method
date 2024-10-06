<script setup lang="ts">
withDefaults(
  defineProps<{
    letter: string;
    type?: "gumroadish" | "default";
  }>(),
  {
    type: "default",
  },
);
</script>

<template>
  <span :class="{
    'bg-gray-900 text-zinc-200 max-h-fit px-2 py-1 font-mono border border-zinc-500 rounded-lg max-w-fit':
      type === 'default',
    'border-solid border border-black dark:border-zinc-200 px-2 py-1 max-h-content':
      type === 'gumroadish',
  }">
    {{ letter }}
  </span>
</template>
