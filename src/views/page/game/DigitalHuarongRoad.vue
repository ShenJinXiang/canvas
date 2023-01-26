<template>
  <digital-huarong-road :width="width" :height="height - 40"></digital-huarong-road>
</template>
<script lang="ts" setup>
import DigitalHuarongRoad from '@/components/page/game/DigitalHuarongRoad/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
console.log(width, height);
</script>