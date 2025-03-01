<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const open = ref(false)

const daysInYear = (year: number) => {
  const isDivisibleBy4 = year % 4 === 0
  const yearIsNotDivisibleBy100 = year % 100 > 0
  const yearIsDivisibleBy400 = year % 400 === 0

  return isDivisibleBy4 && (yearIsNotDivisibleBy100 || yearIsDivisibleBy400) ? 366 : 365
}
</script>

<template>
  <button @click="open = true">
    Open Modal
  </button>

  <Teleport to="#__nuxt">
    <div
      v-if="open"
      class="modal max-w-6xl min-h-52 max-h-[600px] w-full bg-slate-200 dark:bg-slate-800 dark:text-zinc-200 pb-20 transition-colors duration-1000 shadow-xl rounded-sm p-4 overflow-auto"
    >
      <BaseButton
        class="fixed top-[8px] right-[8px]"
        @click="open = false"
      >
        <XMarkIcon class="w-4 h-4" />
      </BaseButton>
      <div class="flex flex-col flex-wrap max-h-28 mt-12">
        <div
          v-for="j in daysInYear(2022)"
          :key="j"
        >
          <div
            class="rounded-sm h-4 w-4 text-xs dark:text-zinc-100 text-center"
            :class="[
              Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-zinc-800',
            ]"
          >
            {{ j }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 50;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.heatmap {
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(auto-fit, minmax(16px, 1fr));
  grid-template-rows: masonry;
}
</style>
