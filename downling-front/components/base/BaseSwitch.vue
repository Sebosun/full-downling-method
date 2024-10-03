<script setup lang="ts">
const checked = defineModel<boolean>("checked");
</script>

<template>
    <button
        class="bg-brand relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        type="button"
        role="switch"
        @click="checked = !checked"
    >
        <span
            class="rounded-full w-[34px] h-[34px] my-auto bg-white transform duration-200"
            :class="{
                'translate-x-full': checked,
                'translate-x-0': !checked,
            }"
        />
    </button>
</template>
