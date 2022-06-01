<template>
  <canvas ref="canvasRef" />
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import DesultoryBall from '.';
const canvasRef: Ref = ref();
const canvas = new DesultoryBall(window.innerWidth, window.innerHeight - 40);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>