<template>
  <color-fireworks :width="width" :height="height - 40"></color-fireworks>
</template>
<script lang="ts" setup>
import ColorFireworks from '@/components/page/animation/ColorFireworks/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>