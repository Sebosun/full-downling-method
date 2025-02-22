<script setup lang="ts">
const store = useUserStore()

onBeforeMount(() => {
  store.getLocalStorageToken()
  if (store.isLoggedIn) {
    store.fetchExercisesSettings()
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --color-brand: #f85552;
}
</style>
