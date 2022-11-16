<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import LetterTransform from '.';

const canvasRef: Ref = ref()
const canvas = new LetterTransform(window.innerWidth, window.innerHeight);
onMounted(() => {
  // canvas.initCanvas(canvasRef.value).run();
  canvas.initCanvas(canvasRef.value).draw();
});
</script>