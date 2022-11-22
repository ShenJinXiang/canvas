<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ColorTurntable from '.';
const canvasRef: Ref = ref()
const canvas = new ColorTurntable(window.innerWidth, window.innerHeight - 40);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>
