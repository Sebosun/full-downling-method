<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const open = ref(false)
</script>

<template>
  <button @click="open = true">
    Open Modal
  </button>

  <Teleport to="body">
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
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 10;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.heatmap {
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(auto-fit, minmax(16px, 1fr));
}
</style>
