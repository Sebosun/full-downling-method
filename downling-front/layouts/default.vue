<script setup lang="ts">
const color = useColorMode();
const isDark = ref<boolean>(color.preference === "dark");
const changeColorMode = (isDark: boolean) => {
  if (isDark) {
    color.preference = "dark";
    return;
  }
  color.preference = "light";
};
</script>

<template>
  <div class="min-h-screen dark:bg-slate-950 dark:text-zinc-200">
    <!-- very scuffed worakaround but hey it works -->
    <div class="p-[1px]" />
    <header
      class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 lg:mb-0 lg:border-0">
      <div
        class="gumroadish border-2 my-4 border-black p-4 mx-auto max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
        <div>Menu</div>
        <ul class="flex gap-8">
          <BaseSwitch v-model:checked="isDark" @update:checked="changeColorMode" />
        </ul>
      </div>
    </header>
    <main class="full-remaining-height mx-auto max-w-7xl text-4xl flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.full-remaining-height {
  height: calc(100vh - 20rem);
}

.gumroadish {
  transition: all;
  transition-duration: 0.2s;
  /* transform: translate(-0.25rem, -0.25rem); */
  box-shadow: -0.45rem -0.45rem 0rem var(--color-brand);
}
</style>
