<template>
  <canvas ref="canvasRef" />
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import DesultoryBall from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  ballNumber: {
    type: Number,
    default: 70
  }
});
const canvasRef: Ref = ref();
const canvas = new DesultoryBall(props.width, props.height, props.ballNumber);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});


watch(
  () => props.width,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.ballNumber,
  (newVal) => {
    canvas.setBallNumber(newVal);
  }
);
</script>