<template>
  <div>
    <visual-error-image :width="width" :height="height - 40"></visual-error-image>
  </div>
</template>
<script lang="ts" setup>
import VisualErrorImage from '@/components/page/stillness/VisualErrorImage1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
