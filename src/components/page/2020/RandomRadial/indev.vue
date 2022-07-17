<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import RandomRadial from '.';

const canvasRef: Ref = ref();
const canvas = new RandomRadial(window.innerWidth, window.innerHeight - 40, 5);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>
<style scoped>
canvas {
  background: linear-gradient(141deg, #0fb8ad 0%, #76f1ff 51%, #2cb5e8 75%);
}
</style>
