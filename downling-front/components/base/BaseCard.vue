<script setup lang="ts">
withDefaults(
    defineProps<{
        color?: "black" | "brand" | "red";
    }>(),
    {
        color: "brand",
    },
);
</script>
<template>
    <div
        class="gumroadish-card border-black dark:border-white p-2 rounded-xs border"
        :class="{
            'gumroadish-card--black': color === 'black',
            'gumroadish-card--brand': color === 'brand',
            'gumroadish-card--red': color === 'red',
        }"
    >
        <slot />
    </div>
</template>

<style scoped>
.gumroadish-card {
    transition: all;
    transition-duration: 0.2s;
    /* transform: translate(-0.25rem, -0.25rem); */
    box-shadow: 0.45rem 0.45rem 0rem var(--color-brand);

    .light-mode &--black {
        box-shadow: 0.25rem 0.25rem 0rem black;
    }

    .dark-mode &--black {
        box-shadow: 0.25rem 0.25rem 0rem white;
    }

    &--brand {
        box-shadow: 0.45rem 0.45rem 0rem var(--color-brand);
    }

    &--red {
        box-shadow: 0.25rem 0.25rem 0rem #ce141e;
    }
}
</style>
