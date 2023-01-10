<template>
  <div>
    <canvas ref="canvasRef" @click="click" @mousemove="move"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { onMounted, Ref, ref } from 'vue';
import { HuaRongRoad } from '.';

const width = 100;
const canvasRef: Ref = ref();
const canvas = new HuaRongRoad(width);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});

const { elementX: canvasPointX, elementY: canvasPointY } = useMouseInElement(canvasRef);

const click = () => {
  canvas.click(canvasPointX.value, canvasPointY.value);
}
const move = () => {
  canvas.move(canvasPointX.value, canvasPointY.value);
}
</script>