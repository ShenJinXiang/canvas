<template>
  <gluttonous-snake :width="width" :height="height - 40"></gluttonous-snake>
</template>
<script lang="ts" setup>
import GluttonousSnake from '@/components/page/game/GluttonousSnake/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>