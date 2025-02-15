<script setup lang="ts">
defineProps<{
  title: string
}>()
const isVisible = ref<boolean>(false)

const toggle = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="max-w-96">
    <div
      role="button"
      class="flex justify-between bg-gray-100 dark:bg-gray-900 py-3 px-6 rounded-sm"
      @click="toggle"
    >
      <h4> {{ title }} </h4>
      <div v-show="!isVisible">
        +
      </div>
      <div v-show="isVisible">
        -
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-show="isVisible"
        class="max-w-full py-3 px-6"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
