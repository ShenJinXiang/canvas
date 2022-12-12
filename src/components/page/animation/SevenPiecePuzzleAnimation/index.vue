<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import SevenPiecePuzzleAnimationVue from '.';

const canvasRef: Ref = ref();

const canvas = new SevenPiecePuzzleAnimationVue(window.innerWidth, window.innerHeight - 40);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>
