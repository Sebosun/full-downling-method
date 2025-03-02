<script setup lang="ts">
const store = useUserStore()

onBeforeMount(() => {
  console.log(store.isLoggedIn)
  if (store.isLoggedIn) {
    console.log('islogged in')
    navigateTo('/')
  }
})
</script>

<template>
  <BaseCard
    color="black"
    class="p-10"
  >
    <h1 class="text-center my-4">
      Login
    </h1>
    <TheLoginForm />
  </BaseCard>
</template>
