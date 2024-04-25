<template>
  <div>
    <background :width="width" :height="height - 40"></background>
  </div>
</template>
<script lang="ts" setup>
import Background from '@/components/page/stillness/Background3/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
