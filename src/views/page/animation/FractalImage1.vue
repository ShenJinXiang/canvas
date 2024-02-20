<template>
    <div>
        FractalImage1
        <fractal-image></fractal-image>
    </div>
  </template>
  <script lang="ts" setup>
  import { useWindowSize } from '@vueuse/core';
  import FractalImage from '@/components/page/animation/FractalImage1/index.vue';
  
  const { width, height } = useWindowSize();
  </script>