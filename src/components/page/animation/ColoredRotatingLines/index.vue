<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import ColoredRotatingLines from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
const canvasRef = ref();
const coloredRotatingLines = new ColoredRotatingLines(props.width, props.height);

onMounted(() => {
  coloredRotatingLines.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    coloredRotatingLines.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    coloredRotatingLines.setRect(props.width, props.height);
  }
);
</script>