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
  <div class="min-h-screen dark:bg-slate-950 dark:text-zinc-200 pb-20">
    <!-- very scuffed worakaround but hey it works -->
    <div class="p-[1px]" />
    <header>
      <div class="my-4 p-4 mx-auto max-w-8xl flex items-center justify-between gap-3 h-[4rem]">
        <ul class="flex gap-8 ml-auto">
          <BaseSwitch v-model:checked="isDark" @update:checked="changeColorMode" />
        </ul>
      </div>
    </header>
    <main class="full-remaining-height mx-auto max-w-8xl text-4xl flex">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.full-remaining-height {
  min-height: calc(100vh - 20rem);
}
</style>
