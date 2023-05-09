<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue";
import VisualErrorImage from ".";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  }
});
const canvasRef: Ref = ref();
const canvas = new VisualErrorImage(props.width, props.height);
watch(
  () => props.width,
  (newVal) => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  (newVal) => {
    canvas.setRect(props.width, props.height);
  }
);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).draw();
});
</script>