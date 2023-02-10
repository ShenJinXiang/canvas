<template>
  <div>
    <colored-rotating-lines :width="width" :height="height - 40"></colored-rotating-lines>
  </div>
</template>
<script lang="ts" setup>
import ColoredRotatingLines from '@/components/page/animation/ColoredRotatingLines/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>