<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import Starry from '.';

const canvasRef: Ref = ref();
const canvas = new Starry(window.innerWidth, window.innerHeight - 40);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>
