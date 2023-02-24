<template>
  <div>
    <rotate-construction-animation1 :width="width" :height="height - 40"></rotate-construction-animation1>
  </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation1 from '@/components/page/animation/RotateConstructionAnimation1/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();

</script>
