<template>
  <new-year-countdown :width="width" :height="height - 40"></new-year-countdown>
</template>
<script lang="ts" setup>

import NewYearCountdown from '@/components/page/background/NewYearCountdown/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>