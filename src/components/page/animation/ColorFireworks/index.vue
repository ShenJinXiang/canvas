<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import ColorFireworks from '.';
const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});

const canvasRef = ref();
const colorFireworks = new ColorFireworks(props.width, props.height);

onMounted(() => {
  colorFireworks.initCanvas(canvasRef.value).run();
});
watch(
  () => props.width,
  () => {
    colorFireworks.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    colorFireworks.setRect(props.width, props.height);
  }
);
</script>
