<template>
  <div>
    <canvas ref="canvasRef" 
      @click="canvasClick"
      @mousemove="canvasMouseMove"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ChineseGo from '.';

const canvasRef: Ref = ref();
const chineseGo = new ChineseGo(45);

const canvasClick = (event: MouseEvent) => {
  if (canvasRef.value) {
    chineseGo.mouseClick(event);
  }
};
const canvasMouseMove = (event: MouseEvent) => {
  if (canvasRef.value) {
    chineseGo.mouseMove(event);
  }
};
onMounted(() => {
  chineseGo.initCanvas(canvasRef.value).draw();
});
</script>
