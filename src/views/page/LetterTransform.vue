<template>
  <div>
    <letter-transform :width="width" :height="height - 40"></letter-transform>
  </div>
</template>
<script lang="ts" setup>
import LetterTransform from '@/components/page/2020/LetterTransform/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();

</script>
