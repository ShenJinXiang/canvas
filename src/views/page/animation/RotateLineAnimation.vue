<template>
  <rotate-line-animation :width="width" :height="height - 40"></rotate-line-animation>
</template>
<script lang="ts" setup>
import RotateLineAnimation from '@/components/page/animation/RotateLineAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
