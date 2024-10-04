<script setup lang="ts">
defineProps<{
    letter: string;
}>();
</script>

<template>
    <span
        class="bg-gray-900 text-zinc-200 max-h-fit px-2 py-1 font-mono border border-zinc-500 rounded-lg"
    >
        {{ letter }}
    </span>
</template>
