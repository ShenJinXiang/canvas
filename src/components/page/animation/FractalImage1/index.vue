<template>
    <div>
      <canvas ref="canvasRef"></canvas>
    </div>
  </template>
  <script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
import FractalImage from '.';

const props = defineProps({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    sideNum: {
        type: Number,
        required: true
    }
})

const canvasRef = ref();
const canvas = new FractalImage(props.width, props.height, props.sideNum);

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
  () => props.sideNum,
  () => {
    canvas.setSideNum(props.sideNum);
  }
);
  </script>