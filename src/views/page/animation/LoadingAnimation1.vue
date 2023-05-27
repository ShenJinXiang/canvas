<template>
  <div>
    <loading-animation :width="width" :height="height - 40"></loading-animation>
  </div>
</template>
<script lang="ts" setup>
import LoadingAnimation from '@/components/page/animation/LoadingAnimation1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
console.log(width, height);
</script>