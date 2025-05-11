<script setup lang="ts">
import { Cog8ToothIcon, ArrowLeftStartOnRectangleIcon, ArrowRightCircleIcon, BookOpenIcon } from '@heroicons/vue/24/solid'

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
  <header>
    <div class="my-4 p-4 mx-auto max-w-8xl flex items-center justify-between gap-3 h-[4rem]">
      <ul class="flex gap-4 ml-auto items-center mr-4">
        <BaseSwitch
          v-model="isDark"
          @update:model-value="changeColorMode"
        />

        <BaseButton
          route="/"
          title="Exercises"
          @click.prevent
        >
          <BookOpenIcon class="w-6 h-6" />
        </BaseButton>

        <BaseButton
          :route="'/settings'"
          title="Settings"
        >
          <Cog8ToothIcon class="w-6 h-6" />
        </BaseButton>

        <BaseButton
          v-if="!isLoggedIn"
          :route="'/login'"
          title="Login"
        >
          <ArrowRightCircleIcon class="w-6 h-6" />
        </BaseButton>

        <template v-if="isLoggedIn">
          <BaseButton
            v-if="isLoggedIn"
            title="Logout"
            @click="store.logout"
          >
            <ArrowLeftStartOnRectangleIcon class="w-6 h-6" />
          </BaseButton>
        </template>
      </ul>
    </div>
  </header>
</template>
