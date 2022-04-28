<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import EightDiagrams from '.';
const canvasRef: Ref = ref();
const width = window.innerWidth;
const height = window.innerHeight - 40;
const radius = Math.min(width, height) * 0.8;
const canvas = new EightDiagrams(width, height, radius);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>