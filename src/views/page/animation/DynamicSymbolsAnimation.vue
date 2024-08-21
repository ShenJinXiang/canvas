<template>
  <div>
      <dynamic-symbols-animation :width="width" :height="height - 40"></dynamic-symbols-animation>
  </div>
</template>
<script lang="ts" setup>
import DynamicSymbolsAnimation from '@/components/page/animation/DynamicSymbolsAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
