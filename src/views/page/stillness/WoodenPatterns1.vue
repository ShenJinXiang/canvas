<template>
  <wooden-patterns :width="width" :height="height - 40"></wooden-patterns>
</template>
<script lang="ts" setup>
import WoodenPatterns from '@/components/page/stillness/WoodenPatterns1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>