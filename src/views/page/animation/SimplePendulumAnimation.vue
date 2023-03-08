<template>
  <simple-pendulum-animation :width="width" :height="height - 40"></simple-pendulum-animation>
</template>
<script lang="ts" setup>
import SimplePendulumAnimation from '@/components/page/animation/SimplePendulumAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>