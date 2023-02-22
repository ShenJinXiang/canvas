<template>
  <div>
    <test :width="width" :height="height - 40"></test>
  </div>
</template>
<script lang="ts" setup>
import Test from '@/components/page/test/index.vue';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize();
</script>