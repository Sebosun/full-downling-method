<script setup lang="ts">
const color = useColorMode()
const isDark = ref<boolean>(color.preference === 'dark')
const changeColorMode = (isDark: boolean) => {
  if (isDark) {
    color.preference = 'dark'
    return
  }
  color.preference = 'light'
}

const store = useUserStore()
const { isLoggedIn } = storeToRefs(store)
</script>

<template>
  <div class="min-h-screen dark:bg-slate-950 dark:text-zinc-200 pb-20 transition-colors duration-1000">
    <!-- very scuffed worakaround but hey it works -->
    <div class="p-[1px]" />
    <header>
      <div class="my-4 p-4 mx-auto max-w-8xl flex items-center justify-between gap-3 h-[4rem]">
        <ul class="flex gap-8 ml-auto items-center">
          <BaseButton
            v-if="isLoggedIn"
            @click="store.logout"
          >
            logout
          </BaseButton>
          <BaseSwitch
            v-model="isDark"
            @update:model-value="changeColorMode"
          />
        </ul>
      </div>
    </header>
    <main class="full-remaining-height mx-auto max-w-8xl text-4xl flex">
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
