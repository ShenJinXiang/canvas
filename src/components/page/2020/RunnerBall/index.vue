<template>
  <canvas ref="canvasRef" />
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
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
  canvas.initCanvas(canvasRef.value).draw();
});
</script>