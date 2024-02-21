<template>
    <div>
        <fractal-image :width="windowWidth" :height="windowHeight - 40"></fractal-image>
    </div>
  </template>
  <script lang="ts" setup>
  import { useWindowSize } from '@vueuse/core';
  import FractalImage from '@/components/page/animation/FractalImage1/index.vue';
  
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  </script>