<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import LaserEffect from '.';

const canvasRef: Ref = ref();
const canvas = new LaserEffect(window.innerWidth, window.innerHeight - 40);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>
