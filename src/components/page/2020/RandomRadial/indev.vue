<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import RandomRadial from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  lineNumber: {
    type: Number,
    default: 5
  }
})
const canvasRef: Ref = ref();
const canvas = new RandomRadial(props.width, props.height, props.lineNumber);
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
  () => props.lineNumber,
  (newVal) => {
    canvas.setLineNumber(newVal);
  }
);
</script>
<style scoped>
canvas {
  background: linear-gradient(141deg, #0fb8ad 0%, #76f1ff 51%, #2cb5e8 75%);
}
</style>
