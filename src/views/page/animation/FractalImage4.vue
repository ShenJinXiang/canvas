<template>
    <fractal-image :width="windowWidth" :height="windowHeight - 40"></fractal-image>
  </template>
  <script lang="ts" setup>
    import FractalImage from '@/components/page/animation/FractalImage4/index.vue';
  import { useWindowSize } from '@vueuse/core';
  
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  </script>