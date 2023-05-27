<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue";
import PenExercisePaper from ".";

const props = defineProps({
  gridWidth: {
    type: Number,
    default: 80,
  },
  row: {
    type: Number,
    default: 14,
  },
  col: {
    type: Number,
    default: 11,
  },
  lineColor: {
    type: String,
    default: "#f00",
  },
  gridStyle: {
    type: String,
    default: "mi",
  },
});
const canvasRef: Ref = ref();
const canvas = new PenExercisePaper(
  props.gridWidth,
  props.row,
  props.col,
  props.lineColor,
  props.gridStyle
);
watch(
  () => props.gridWidth,
  (newVal) => {
    canvas.setGridWidth(newVal);
  }
);
watch(
  () => props.row,
  (newVal) => {
    canvas.setRow(newVal);
  }
);
watch(
  () => props.col,
  (newVal) => {
    canvas.setCol(newVal);
  }
);
watch(
  () => props.gridStyle,
  (newVal) => {
    canvas.setGridStyle(newVal);
  }
);
watch(
  () => props.lineColor,
  (newVal) => {
    canvas.setLineStyle(newVal);
  }
);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>