<template>
  <canvas ref="canvasRef" />
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import RunnerBall from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
const canvasRef: Ref = ref();
const canvas = new RunnerBall(props.width, props.height);
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
</script>