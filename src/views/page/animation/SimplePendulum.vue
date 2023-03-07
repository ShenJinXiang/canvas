<template>
  <simple-pendulum :width="width" :height="height - 40"></simple-pendulum>
</template>
<script lang="ts" setup>
import SimplePendulum from '@/components/page/animation/SimplePendulum/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>