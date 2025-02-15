<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

const checked = defineModel<boolean>('checked')
</script>

<template>
  <div
    role="checkbox"
    class="flex gap-4 text-md items-center cursor-pointer"
    @click="checked = !checked"
  >
    <div class="dark:bg-white border border-black w-[24px] h-[24px] rounded-sm">
      <span v-show="checked">
        <CheckIcon
          class="w-[24px] h-[24px] text-black font-bold"
          :class="{ 'bg-brand dark:bg-brand': checked }"
        />
      </span>
    </div>
    <slot />
  </div>
</template>
