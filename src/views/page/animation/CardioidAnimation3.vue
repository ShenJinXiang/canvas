<template>
  <cardioid-animation :width="width" :height="height - 40"></cardioid-animation>
</template>
<script lang='ts' setup>
import CardioidAnimation from '@/components/page/animation/CardioidAnimation3/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>