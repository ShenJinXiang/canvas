<template>
  <div>
    <geometric-particle :width="width" :height="height - 40"></geometric-particle>
  </div>
</template>
<script lang="ts" setup>
import GeometricParticle from '@/components/page/background/GeometricParticle/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>