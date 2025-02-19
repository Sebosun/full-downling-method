<script setup lang="ts">
const store = useUserStore()
const { hasLoadedSettings } = storeToRefs(store)

onBeforeMount(() => {
  store.getLocalStorageToken()
  if (!hasLoadedSettings.value && store.isLoggedIn) {
    store.fetchExercisesSettings()
  }
})
</script>

<template>
  <div class="min-h-screen dark:bg-slate-950 dark:text-zinc-200">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --color-brand: #f85552;
}
</style>
