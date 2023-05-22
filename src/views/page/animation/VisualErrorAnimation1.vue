<template>
  <div>
    <visual-error-animation :width="width" :height="height - 40"></visual-error-animation>
  </div>
</template>
<script lang="ts" setup>
import VisualErrorAnimation from '@/components/page/animation/VisualErrorAnimation1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
