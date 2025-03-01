<script setup lang="ts">
const store = useUserStore()

onBeforeMount(() => {
  store.getLocalStorageToken()
  store.initUserSettings()
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
