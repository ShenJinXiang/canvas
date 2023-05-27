<template>
  <div>
    <rotate-construction-animation :width="width" :height="height - 40"></rotate-construction-animation>
  </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation4/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
