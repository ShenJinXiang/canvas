<template>
  <div>
    <cardioid-animation :width="width" :height="height"></cardioid-animation>
  </div>
</template>
<script lang="ts" setup>
import CardioidAnimation from '@/components/page/animation/CardioidAnimation1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>