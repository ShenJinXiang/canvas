<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ColorParticle from '.';

const canvasRef: Ref = ref();
const width = window.innerWidth;
const height = window.innerHeight - 40;
const canvas = new ColorParticle(width, height);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>
