<template>
  <div>
    <color-board :width="width" :height="height - 40"></color-board>
  </div>
</template>
<script lang="ts" setup>
import ColorBoard from '@/components/page/stillness/ColorBoard/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
