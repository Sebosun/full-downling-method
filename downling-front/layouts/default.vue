<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen dark:bg-slate-950 dark:text-zinc-200 pb-20 transition-colors duration-1000">
    <!-- very scuffed worakaround but hey it works -->
    <div class="p-[1px]" />
    <TheHeader />
    <main class="full-remaining-height mx-auto max-w-8xl text-2xl xl:text-4xl flex">
      <div class="mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.full-remaining-height {
  min-height: calc(100vh - 20rem);
}
</style>
