<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import PenExercisePaper from '.';

const props = defineProps({
  gridWidth: {
    type: Number,
    default: 80
  },
  row: {
    type: Number,
    default: 14
  },
  col: {
    type: Number,
    default: 11
  }
})
const canvasRef: Ref = ref();
const canvas = new PenExercisePaper(props.gridWidth, props.row, props.col);

onMounted(() => {
  canvas.initCanvas(canvasRef.value);
});
</script>