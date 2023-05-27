<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { onMounted, ref, Ref } from 'vue';
import ChineseChess from '.';

const { width, height } = useWindowSize();

const canvasRef: Ref = ref();

const canvas = new ChineseChess(width.value, height.value - 40);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>