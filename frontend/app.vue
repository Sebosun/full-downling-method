<script setup lang="ts">
provideHeadlessUseId(() => useId())
const dupa = ref('sranie')
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
