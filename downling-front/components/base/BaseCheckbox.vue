<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

const checked = defineModel<boolean>("checked");
</script>

<template>
  <div role="checkbox" class="bg-white w-[24px] h-[24px] rounded-sm" :class="{
    'bg-brand': checked
  }" @click="checked = !checked">
    <span v-show="checked">
      <CheckIcon class="w-[24px] h-[24px] text-black" />
    </span>
  </div>
</template>
