<template>
    <canvas ref="canvasRef"></canvas>
  </template>
  <script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import RotateConstructionAnimation from '.';
  
  const props = defineProps({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    sideNumber: {
      type: Number,
      default: 5
    }
  })
  
  const canvasRef = ref();
  const canvas = new RotateConstructionAnimation(props.width, props.height, props.sideNumber);
  
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
    () => props.sideNumber,
    () => {
      canvas.setSideNumber(props.sideNumber);
    }
  );
  </script>
  