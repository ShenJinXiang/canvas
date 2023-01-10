<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import { HuaRongRoad } from '.';

const width = 100;
const canvasRef: Ref = ref();
const canvas = new HuaRongRoad(width);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>