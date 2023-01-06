<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import { HuaRongRoad } from '.';

const width = 400;
const canvasRef: Ref = ref();
const canvas = new HuaRongRoad(width);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>