<template>
  <div>
    <wooden-man-animation :width="width" :height = "height - 40" ></wooden-man-animation>
  </div>
</template>
<script lang="ts" setup>
import WoodenManAnimation from '@/components/page/animation/WoodenManAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';
const {width, height } = useWindowSize();
</script>